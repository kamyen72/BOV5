//<reference path="../jquery/jquery-1.10.1.min.js" />
//<reference path="../knockout/knockout.mapping-latest.js" />
//<reference path="regular.js" />
function regular() {
	var self = this;
    self.isEmptyValue = function (data) {
        if (data == null || $.trim(data) == '') return true;
        return false;
    };

    self.isEmail = function (data) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(data);
    };

    self.isPassword = function (data) {
        if (data)
            var reg = /^\w{6,12}$/;
        return reg.test(data);
    };

    self.isDouble = function (data) {
        //var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
        var reg = new RegExp("^[0-9]+([\.][0-9]+)?$");
        return reg.test(data);
    };

    self.isMobile = function (data) {
        var reg = new RegExp(/^(09([0-9]){8})$/);
        return reg.test(data);
    };

    self.isTel = function (data) {
        var reg = new RegExp(/^(([0-9]){2,3}\-[0-9]{5,8})$/);
        return reg.test(data);
    };

    self.isUrl = function (s) {
        //var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        var regexp = /http:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (s.match(regexp)) return true;
        else return false;
    };

    self.isNumeric = function (data) {
        var reg = /^[0-9]{1,}$/;
        return reg.test(data);
    };

	//**************************************
	// 台灣身份證檢查簡短版 for Javascript
	//**************************************
    self.checkTwID = function (id) {
        //建立字母分數陣列(A~Z)
        var city = new Array(
            1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
            20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30
        );
        id = id.toUpperCase();
        // 使用「正規表達式」檢驗格式
        if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
            //alert('基本格式錯誤');
            return false;
        } else {
            //將字串分割為陣列(IE必需這麼做才不會出錯)
            id = id.split('');
            //計算總分
            var total = city[id[0].charCodeAt(0) - 65];
            for (var i = 1; i <= 8; i++) {
                total += eval(id[i]) * (9 - i);
            }
            //補上檢查碼(最後一碼)
            total += eval(id[9]);
            //檢查比對碼(餘數應為0);
            return ((total % 10 == 0));
        }
    };
}

function verifyModel() {
	var self = this;
	//資料送出前確認必填欄位
    self.confirmBeforeSend = function () {
        var result = verification(self.verifyObjects);
        if (!result.success) {
            alert(result.message);
            return false;
        }
        return true;
    };

    var setForcusError = function (tagName) {
        $(' [key=' + tagName + ']').addClass('focusError')[0].focus();
        var s = setTimeout(function () {
            $('*').removeClass('focusError');
        }, 3000);
    };

	var findPropertyName = function (obj) {
		var properties = ko.mapping.toJS(self);
		try {
			$.each(properties, function (key, value) {
				if (eval('self.' + key) === obj)
					throw key;
			});
		} catch (ex) {
			return ex;
		}
		return null;
    };

    var verification = function (objects) {
        //required
        var regulars = new regular();
        var findPropertyName = function (obj) {
            var properties = ko.mapping.toJS(self);
            try {
                $.each(properties, function (key, value) {
                    if (eval('self.' + key) === obj)
                        throw key;
                });
            } catch (ex) {
                return ex;
            }
            return null;
        };
        if (objects.required != null) {
            try {

                $.each(objects.required, function (index, object) {
                    if (regulars.isEmptyValue(object())) {
                        setForcusError(findPropertyName(object));
                        throw { success: false, message: "'" + self.chtNames[findPropertyName(object)] + "' 為必填項, 請再次確認!" };
                    }
                });
            } catch (ex) {
                return ex;
            }
        }
        //email
        if (objects.email != null) {
            try {
                $.each(objects.email, function (index, object) {
                    if (!regulars.isEmail(object())) {
                        setForcusError(findPropertyName(object));
                        throw { success: false, message: self.chtNames[findPropertyName(object)] + " 格式錯誤, 請再次確認!" };
                    }
                });
            } catch (ex) {
                return ex;
            }
        }
        //numeric
        if (objects.numeric != null) {
            try {
                $.each(objects.numeric, function (index, object) {
                    if (!regulars.isNumeric(object())) {
                        setForcusError(findPropertyName(object));
                        throw { success: false, message: "'" + self.chtNames[findPropertyName(object)] + "' 須為數字格式, 請再次確認!" };
                    }
                });
            } catch (ex) {
                return ex;
            }
        }
        //url
        if (objects.url != null) {
            try {
                $.each(objects.url, function (index, object) {
                    if (!regulars.isUrl(object())) {
                        setForcusError(findPropertyName(object));
                        throw { success: false, message: "'" + self.chtNames[findPropertyName(object)] + "' 須為網址格式, 請再次確認!\n\n(Ex: http://www.google.com.tw)" };
                    }
                });
            } catch (ex) {
                return ex;
            }
        }
        //password
        if (objects.passowrd != null) {
            try {
                $.each(objects.passowrd, function (index, object) {
                    if (!regulars.isPassword(object())) {
                        setForcusError(findPropertyName(object));
                        throw { success: false, message: "'" + self.chtNames[findPropertyName(object)] + "' 須為6-12碼字元, 請再次確認!" };
                    }
                });
            } catch (ex) {
                return ex;
            }

        }
        return { success: true, message: null };
    };
}
