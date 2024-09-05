app.directive("myValidator", ['$parse', '$q', function ($parse, $q) {
    function _regular() {
        var self = this;

        self.isEmptyValue = function (data) {
            if (data === null || $.trim(data) === '') return true;
            return false;
        };

        self.isEMAIL = function (data) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(data);
        };

        self.isUSERNAME = function (data) {
            var userNamePattern = /^[a-zA-Z0-9]{6,12}$/;
            return userNamePattern.test(data);
        };

        self.isPASSWORD = function (data) {
            if (data === null || $.trim(data) === '') return true;
            var passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$~!@#$%^&*()_+])[A-Za-z\d$~!@#$%^&*()_+]{8,}$/
            return passwordReg.test(data);
        };

        self.isDOUBLE = function (data) {
            //var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
            var reg = new RegExp("^[0-9]+([\.][0-9]+)?$");
            return reg.test(data);
        };

        self.isMOBILE = function (data) {
            var reg = new RegExp(/^(09([0-9]){8})$/);
            return reg.test(data);
        };

        self.isTEL = function (data) {
            var reg = new RegExp(/^(\+[0-9]|[0-9]|[0-9]-[0-9])*$/);// /^(([0-9]){2,3}\-[0-9]{5,8})$/
            return reg.test(data);
        };

        self.isURL = function (data) {
            var reg = new RegExp(/(http|https):\/\/www.(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
            return reg.test(data);
        };

        self.isNUMERIC = function (data) {
            var reg = /^[0-9]{1,}$/;
            return reg.test(data);
        };

        self.isPERCENT = function (data) {
            var reg = /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%/;
            return reg.test(data);
        };

        self.isDROPDOWN = function (data) {
            return data !== -1;
        };

        //**************************************
        // 台灣身份證檢查簡短版 for Javascript
        //**************************************
        self.isTWID = function (id) {
            //建立字母分數陣列(A~Z)
            var city = new Array(
                1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
                20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30
            );
            id = id.toUpperCase();
            // 使用「正規表達式」檢驗格式
            if (id.search(/^[A-Z](1|2)\d{8}$/i) === -1) {
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
                return ((total % 10 === 0));
            }
        };
    }

    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, Ctrl) {
            var regular = new _regular(),
                validType = attrs.myValidator;
            Ctrl.$validators.myValidator = function (value) {
                return regular[`is${validType.toUpperCase()}`](value);
            };
        }
    };
}]);

app.directive("allowNumbersOnly", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            element.bind("keydown", function (event) {
                //console.log(event.keyCode);
                if (event.keyCode === 8 || event.keyCode === 9) {
                    return true;
                } else if (!(event.keyCode > 47 && event.keyCode < 58) &&
                    !(event.keyCode > 95 && event.keyCode < 106) ||
                    event.shiftKey) {
                    event.preventDefault();
                    return false;
                }
            });
        }
    };
});