'use strict';

app.factory('authService', [
    '$http',
    '$q',
    '$rootScope',
    '$location',
    'localStorageService',
    'ngAuthSettings',
    'blockUI',
    'memberShipService',
    function ($http, $q, $rootScope, $location, localStorageService, ngAuthSettings, blockUI, memberShipService) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var authenticationUri = ngAuthSettings.authenticationUri;
        var misProfileUri = ngAuthSettings.misProfileUri;
        //var clientID = ngAuthSettings.clientID;
        //var apID = ngAuthSettings.apID;
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,

            // 以下5項由authentication的token取得
            accessToken: "",
            refreshToken: "",
            tokenType: null,
            expires: null,
            expiresIn: null,

            // 以下1項由TWM SSO取得
            userToken: "",

            comID: "",
            comName: "",
            hrDeptID: "",
            fullDeptName: "",
            deptName: "",
            hrDept0000ID: "",
            dept0000Name: "",
            hrDept000ID: "",
            dept000Name: "",
            hrDept00ID: "",
            dept00Name: "",
            uid: "",
            empID: "",
            userID: "",
            userName: "",
            titleID: "",
            titleName: "",
            buildingID: "",
            buildingName: "",
            officeID: "",
            officeName: "",
            phoneNo: "",
            email: "",
            mobile: "",
            ext: "",
            menu: []
        };

        var _login = function (userDataObj, remember) {

            var loginRes = false;
            //var data = "";
            //if (ajaxData.AuthenticationType == "NTLM") {
            //    var empID = CryptoJS.AES.encrypt(ajaxData.EmpID, CryptoJS.enc.Utf8.parse(clientKey), {
            //        mode: CryptoJS.mode.ECB,
            //        padding: CryptoJS.pad.Pkcs7
            //    });

            //    var uid = CryptoJS.AES.encrypt(ajaxData.UserKey, CryptoJS.enc.Utf8.parse(clientKey), {
            //        mode: CryptoJS.mode.ECB,
            //        padding: CryptoJS.pad.Pkcs7
            //    });

            //    data = "grant_type=password&username=" + encodeURIComponent(uid) + "&password=" + encodeURIComponent(empID) + "&client_id=" + clientID;
            //} else {
            //    data = "grant_type=password&username=" + ajaxData.UserKey + "&client_id=" + clientID;
            //}

            //var authorizationData = {};
            //authorizationData.userToken = ajaxData.UserToken;
            //console.log("authService.login userToken = " + ajaxData.UserToken);
            //$.ajax({
            //    contentType: "application/x-www-form-urlencoded",
            //    url: authenticationUri + './token',
            //    type: "post",
            //    async: false,
            //    data: data,
            //    beforeSend: function () {

            //    },
            //    complete: function () {

            //    },
            //    success: function (data) {
            //        //console.log("authService.login token success");
            //        authorizationData.accessToken = data.access_token;
            //        authorizationData.refreshToken = data.refresh_token;
            //        authorizationData.tokenType = data.token_type;
            //        authorizationData.expires = data[".expires"];
            //        authorizationData.expiresIn = data.expires_in;
            //        //console.log(data);
            //        //console.log("authService.login token accessToken = " + data.access_token);
            //        //console.log("authService.login token refreshToken = " + data.refresh_token);
            //        //console.log("authService.login token tokenType = " + data.token_type);
            //        //console.log("authService.login token expires = " + data[".expires"]);
            //        //console.log("authService.login token expires1 = " + new Date(data[".expires"]).getTime());
            //        //console.log("authService.login token expiresIn = " + data.expires_in);
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        console.error($.parseJSON(xhr.responseText).ExMsg);
            //    }
            //});

            //$.ajax({
            //    contentType: "application/json;charset=utf-8",
            //    url: authenticationUri + './api/User',
            //    headers: {
            //        'Authorization': 'Bearer ' + authorizationData.accessToken,
            //    },
            //    type: "get",
            //    async: false,
            //    beforeSend: function () {

            //    },
            //    complete: function () {

            //    },
            //    success: function (data) {
            //        //console.log("authService.login User success");
            //        var user = data.User;
            //        authorizationData.comID = user.ComID;
            //        authorizationData.comName = user.ComName;
            //        authorizationData.comNameAttr = user.ComNameAttr;
            //        authorizationData.hrDeptID = user.HRDeptID;
            //        authorizationData.deptName = user.DeptName;
            //        authorizationData.fullDeptName = user.FullDeptName;
            //        authorizationData.hrDept0000ID = user.HRDept0000ID;
            //        authorizationData.dept0000Name = user.Dept0000Name;
            //        authorizationData.hrDept000ID = user.HRDept000ID;
            //        authorizationData.dept000Name = user.Dept000Name;
            //        authorizationData.hrDept00ID = user.HRDept00ID;
            //        authorizationData.dept00Name = user.Dept00Name;
            //        authorizationData.uid = user.UID;
            //        authorizationData.empID = user.EmpID;
            //        authorizationData.userID = user.UserID;
            //        authorizationData.userName = user.UserName;
            //        authorizationData.titleID = user.TitleID;
            //        authorizationData.titleName = user.TitleName;
            //        authorizationData.buildingID = user.BuildingID;
            //        authorizationData.buildingName = user.BuildingName;
            //        authorizationData.officeID = user.OfficeID;
            //        authorizationData.officeName = user.OfficeName;
            //        authorizationData.phoneNo = user.PhoneNo;
            //        authorizationData.email = user.Email;
            //        authorizationData.mobile = user.Mobile;
            //        authorizationData.ext = user.Ext;
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        console.error($.parseJSON(xhr.responseText).ExMsg);
            //    }
            //});

            //var ajaxData = {};
            //ajaxData["LoginUID"] = authorizationData.uid;
            //ajaxData["APID"] = apID;
            //ajaxData["UID"] = authorizationData.uid;
            //$.ajax({
            //    contentType: "application/json;charset=utf-8",
            //    url: misProfileUri + './api/Menu/FindUserMenu',
            //    headers: {
            //        'Authorization': 'Bearer ' + authorizationData.accessToken,
            //    },
            //    type: "post",
            //    dataType: "json",
            //    async: false,
            //    data: JSON.stringify(ajaxData),
            //    beforeSend: function () {

            //    },
            //    complete: function () {

            //    },
            //    success: function (data) {
            //        authorizationData.menu = data.Menu;
            //    },
            //    error: function (xhr, ajaxOptions, thrownError) {
            //        console.error($.parseJSON(xhr.responseText).ExMsg)
            //        throw $.parseJSON(xhr.responseText).ExMsg;
            //    }
            //});

            //localStorageService.authorizationData = authorizationData;
            //_authentication.isAuth = true;
            //_authentication.comID = authorizationData.comID;
            //_authentication.comName = authorizationData.comName;
            //_authentication.hrDeptID = authorizationData.hrDeptID;
            //_authentication.deptName = authorizationData.deptName;
            //_authentication.fullDeptName = authorizationData.fullDeptName;
            //_authentication.hrDept0000ID = authorizationData.hrDept0000ID;
            //_authentication.dept0000Name = authorizationData.dept0000Name;
            //_authentication.hrDept000ID = authorizationData.hrDept000ID;
            //_authentication.dept000Name = authorizationData.dept000Name;
            //_authentication.hrDept00ID = authorizationData.hrDept00ID;
            //_authentication.dept00Name = authorizationData.dept00Name;
            //_authentication.uid = authorizationData.uid;
            //_authentication.empID = authorizationData.empID;
            //_authentication.userID = authorizationData.userID;
            //_authentication.userName = authorizationData.userName;
            //_authentication.titleID = authorizationData.titleID;
            //_authentication.titleName = authorizationData.titleName;
            //_authentication.buildingID = authorizationData.buildingID;
            //_authentication.buildingName = authorizationData.buildingName;
            //_authentication.officeID = authorizationData.officeID;
            //_authentication.officeName = authorizationData.officeName;
            //_authentication.phoneNo = authorizationData.phoneNo;
            //_authentication.email = authorizationData.email;
            //_authentication.mobile = authorizationData.mobile;
            //_authentication.ext = authorizationData.ext;
            //_authentication.menu = authorizationData.menu;


            var ajaxData = {};
            $.extend(ajaxData, userDataObj);
            if(ajaxData.UserName && ajaxData.UserName.toLowerCase() !== 'admin') {
                // 非master網站 除了admin 之外都要加上前綴
                ajaxData.UserName = ngAuthSettings.platformCode + '_' + ajaxData.UserName
            }

            memberShipService.login(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.authToken = response.data.AuthToken;
                        //ngAuthSettings.modalMsg.title = "Login";
                        //ngAuthSettings.modalMsg.msg = 'Welcome';
                        //ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        //ngAuthSettings.modalMsg.linkTo = "home";
                        ngAuthSettings.headers = {
                            headers: { 'UserName': response.data.UserName }
                        };

                        // Put cookie
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);

                        localStorageService.set('UserToken', response.data.UserName);
                        localStorageService.set('UserInfo', response.data.Rows);
                        localStorageService.set("CompanyID", response.data.Rows.CompanyID);
                        localStorageService.set('UserName', response.data.UserName);
                        localStorageService.set('PlatformSettings', response.data.PlatformSettings);
                        localStorageService.set('MemberFunction', response.data.MemberFunction);

                        $location.path('home');
                        
                        $rootScope.$broadcast('changeMemberInfo');
                        // 更新權限看得到的頁面
                        $rootScope.$broadcast('setMenuPermission');
                        // 填完訊息後顯示訊息框
                        //$rootScope.$broadcast('changeModalMsg', false);
                        //_fillAuthData();
                        $rootScope.$broadcast('getPlatform');
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Login";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg', false);

                        //清除remember
                        localStorageService.remove("UserName");
                        localStorageService.remove("Password");
                        localStorageService.remove("Remember");
                    }

                    blockUI.stop();
                },
                function error(response) {
                    blockUI.stop();
                }
            );

            loginRes = true;

            return loginRes;
        };

        var _refreshToken = function () {
            //console.log("authService refreshToken start");

            var refreshRes = false;
            var authorizationData = localStorageService.authorizationData;
            var data = "grant_type=refresh_token&refresh_token=" + authorizationData.refreshToken + "&client_id=" + clientID;

            $.ajax({
                contentType: "application/x-www-form-urlencoded",
                url: authenticationUri + './token',
                type: "post",
                async: false,
                data: data,
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {
                    //console.log("authService refreshToken success");
                    authorizationData.accessToken = data.access_token;
                    authorizationData.refreshToken = data.refresh_token;
                    authorizationData.tokenType = data.token_type;
                    authorizationData.expires = data[".expires"];
                    authorizationData.expiresIn = data.expires_in;
                    localStorageService.authorizationData = authorizationData;
                    refreshRes = true;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //console.log("authService refreshToken error");
                    console.error($.parseJSON(xhr.responseText).ExMsg);
                }
            });

            return refreshRes;
        };

        var _logOut = function (ajaxData) {
            //localStorageService.$reset();

            //_authentication.isAuth = false;
            //_authentication.accessToken = "";
            //_authentication.refreshToken = "";
            //_authentication.tokenType = null;
            //_authentication.expires = null;
            //_authentication.expiresIn = null;
            //_authentication.userToken = "";
            //_authentication.comID = "";
            //_authentication.comName = "";
            //_authentication.hrDeptID = "";
            //_authentication.fullDeptName = "";
            //_authentication.deptName = "";
            //_authentication.hrDept0000ID = "";
            //_authentication.dept0000Name = "";
            //_authentication.hrDept000ID = "";
            //_authentication.dept000Name = "";
            //_authentication.hrDept00ID = "";
            //_authentication.dept00Name = "";
            //_authentication.uid = "";
            //_authentication.empID = "";
            //_authentication.userID = "";
            //_authentication.userName = "";
            //_authentication.titleID = "";
            //_authentication.titleName = "";
            //_authentication.buildingID = "";
            //_authentication.buildingName = "";
            //_authentication.officeID = "";
            //_authentication.officeName = "";
            //_authentication.phoneNo = "";
            //_authentication.email = "";
            //_authentication.mobile = "";
            //_authentication.ext = "";
            //_authentication.menu = [];
            memberShipService.logout(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.authToken = response.data.AuthToken;
                        ngAuthSettings.modalMsg.title = "Logout";
                        ngAuthSettings.modalMsg.msg = "Logout success!";
                        ngAuthSettings.modalMsg.linkTo = 'login';
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        // clear cookie
                        localStorageService.remove('UserToken');
                        localStorageService.remove('UserInfo');
                        localStorageService.remove('UserName');
                        localStorageService.remove('PlatformSettings');
                        localStorageService.remove('MemberFunction');
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Logout";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                    }

                    // 填完訊息後顯示訊息框
                    $rootScope.$broadcast('changeModalMsg', false);
                    blockUI.stop();
                }
            );

        };

        var _fillAuthData = function () {
            var authData = localStorageService.authorizationData;

            if (authData) {
                _authentication.isAuth = true;
                _authentication.comID = authData.comID;
                _authentication.comName = authData.comName;
                _authentication.hrDeptID = authData.hrDeptID;
                _authentication.deptName = authData.deptName;
                _authentication.fullDeptName = authData.fullDeptName;
                _authentication.hrDept0000ID = authData.hrDept0000ID;
                _authentication.dept0000Name = authData.dept0000Name;
                _authentication.hrDept000ID = authData.hrDept000ID;
                _authentication.dept000Name = authData.dept000Name;
                _authentication.hrDept00ID = authData.hrDept00ID;
                _authentication.dept00Name = authData.dept00Name;
                _authentication.uid = authData.uid;
                _authentication.empID = authData.empID;
                _authentication.userID = authData.userID;
                _authentication.userName = authData.userName;
                _authentication.titleID = authData.titleID;
                _authentication.titleName = authData.titleName;
                _authentication.buildingID = authData.buildingID;
                _authentication.buildingName = authData.buildingName;
                _authentication.officeID = authData.officeID;
                _authentication.officeName = authData.officeName;
                _authentication.phoneNo = authData.phoneNo;
                _authentication.email = authData.email;
                _authentication.mobile = authData.mobile;
                _authentication.ext = authData.ext;
                _authentication.menu = authData.menu;
            }

            _getUserMenu();
        };

        var _getUserMenu = function () {
            var menu = [];
            //memberShipService.findSiteMap({}).then(
            //    function success(response) {
            //        if (response.data.APIRes.ResCode == '000') {
            //            angular.forEach(response.data.Rows, function (item) {
            //                if (item.SubNodes.length == 0) {
            //                    if (item.SiteMap.FunctionName.indexOf("A05") >= 0 || item.SiteMap.FunctionName.indexOf("A02") >= 0) {
            //                        menu.push(
            //                            { 'Text': item.SiteMap.FunctionName, 'URL': item.SiteMap.FunctionURL, 'DropDownList': false, 'IsShowMenu': false, 'Temp': [] }
            //                        );
            //                    }
            //                    else {
            //                        menu.push(
            //                            { 'Text': item.SiteMap.FunctionName, 'URL': item.SiteMap.FunctionURL, 'DropDownList': false, 'IsShowMenu': true, 'Temp': [] }
            //                        );
            //                    }
            //                }
            //                else {
            //                    var thisFunction = {
            //                        'Text': item.SiteMap.FunctionName, 'URL': item.SiteMap.FunctionURL, 'DropDownList': true, 'Temp': []
            //                    };
            //                    for (var x = 0; x < item.SubNodes.length; x++) {
            //                        thisFunction.Temp.push({ 'Text': item.SubNodes[x].SiteMap.FunctionName, 'URL': item.SubNodes[x].SiteMap.FunctionURL, 'DropDownList': false });
            //                    }
            //                    if (item.SubNodes.length <= 20) {
            //                        thisFunction["myStyle"] = { width: '350px' };
            //                    }

            //                    menu.push(thisFunction);
            //                }
            //            });
            //        }
            //    },
            //    function error(response) {

            //    }
            //);

            _authentication.menu = menu;
        };

        var _getToken = function () {
            //console.log("authService.getToken start");
            var authData = localStorageService.authorizationData;
            var deferred = $q.defer();

            if (authData) {
                //It should be moved here - a new defer should be created for each invocation of getToken();
                var isExpired = true;
                var unix = Math.round(+new Date());

                //console.log("authService.getToken expires = " + authData.expires);
                //console.log("authService.getToken expires = " + new Date(authData.expires).getTime());
                //console.log("authService.getToken unix = " + unix);

                if (unix < new Date(authData.expires).getTime()) {
                    //console.log("authService.getToken is not Expired");
                    deferred.resolve(authData.accessToken);
                } else {
                    //console.log("authService.getToken is Expired");
                    if (_refreshToken()) {
                        authData = localStorageService.authorizationData;
                        deferred.resolve(authData.accessToken);
                    } else {
                        //console.log("authService.getToken refreshToken error");
                        deferred.reject('authService.getToken refreshToken error');
                    }
                }

                deferred.resolve(authData.accessToken);
            } else {
                deferred.reject('authService.getToken authData not exist!');
            }

            return deferred.promise;
        }

        var _changeSimulationIdentity = function (ajaxData) {
            //_refreshToken();
            var changeSimulationIdentityRes = false;
            var authorizationData = localStorageService.authorizationData;

            $.ajax({
                contentType: "application/json;charset=utf-8",
                url: authenticationUri + './api/User/GetUser',
                headers: {
                    'Authorization': 'Bearer ' + authorizationData.accessToken,
                },
                type: "post",
                async: false,
                data: JSON.stringify(ajaxData),
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {
                    //console.log("authService.login User success");
                    var user = data.User;
                    authorizationData.comID = user.ComID;
                    authorizationData.comName = user.ComName;
                    authorizationData.hrDeptID = user.HRDeptID;
                    authorizationData.deptName = user.DeptName;
                    authorizationData.fullDeptName = user.FullDeptName;
                    authorizationData.hrDept0000ID = user.HRDept0000ID;
                    authorizationData.dept0000Name = user.Dept0000Name;
                    authorizationData.hrDept000ID = user.HRDept000ID;
                    authorizationData.dept000Name = user.Dept000Name;
                    authorizationData.hrDept00ID = user.HRDept00ID;
                    authorizationData.dept00Name = user.Dept00Name;
                    authorizationData.uid = user.UID;
                    authorizationData.empID = user.EmpID;
                    authorizationData.userID = user.UserID;
                    authorizationData.userName = user.UserName;
                    authorizationData.titleID = user.TitleID;
                    authorizationData.titleName = user.TitleName;
                    authorizationData.buildingID = user.BuildingID;
                    authorizationData.buildingName = user.BuildingName;
                    authorizationData.officeID = user.OfficeID;
                    authorizationData.officeName = user.OfficeName;
                    authorizationData.phoneNo = user.PhoneNo;
                    authorizationData.email = user.Email;
                    authorizationData.mobile = user.Mobile;
                    authorizationData.ext = user.Ext;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error($.parseJSON(xhr.responseText).ExMsg);
                }
            });

            $.ajax({
                contentType: "application/json;charset=utf-8",
                url: misProfileUri + './api/Menu/FindUserMenu',
                headers: {
                    'Authorization': 'Bearer ' + authorizationData.accessToken,
                },
                type: "post",
                dataType: "json",
                async: false,
                data: JSON.stringify(ajaxData),
                beforeSend: function () {

                },
                complete: function () {

                },
                success: function (data) {
                    //console.log("authService.login FindUserMenu success");
                    authorizationData.menu = data.Menu;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.error($.parseJSON(xhr.responseText).ExMsg)
                    throw $.parseJSON(xhr.responseText).ExMsg;
                }
            });

            localStorageService.authorizationData = authorizationData;
            _authentication.isAuth = true;
            _authentication.comID = authorizationData.comID;
            _authentication.comName = authorizationData.comName;
            _authentication.hrDeptID = authorizationData.hrDeptID;
            _authentication.deptName = authorizationData.deptName;
            _authentication.fullDeptName = authorizationData.fullDeptName;
            _authentication.hrDept0000ID = authorizationData.hrDept0000ID;
            _authentication.dept0000Name = authorizationData.dept0000Name;
            _authentication.hrDept000ID = authorizationData.hrDept000ID;
            _authentication.dept000Name = authorizationData.dept000Name;
            _authentication.hrDept00ID = authorizationData.hrDept00ID;
            _authentication.dept00Name = authorizationData.dept00Name;
            _authentication.uid = authorizationData.uid;
            _authentication.empID = authorizationData.empID;
            _authentication.userID = authorizationData.userID;
            _authentication.userName = authorizationData.userName;
            _authentication.titleID = authorizationData.titleID;
            _authentication.titleName = authorizationData.titleName;
            _authentication.buildingID = authorizationData.buildingID;
            _authentication.buildingName = authorizationData.buildingName;
            _authentication.officeID = authorizationData.officeID;
            _authentication.officeName = authorizationData.officeName;
            _authentication.phoneNo = authorizationData.phoneNo;
            _authentication.email = authorizationData.email;
            _authentication.mobile = authorizationData.mobile;
            _authentication.ext = authorizationData.ext;
            _authentication.menu = authorizationData.menu;
            changeSimulationIdentityRes = true;

            return changeSimulationIdentityRes;
        };

        authServiceFactory.authentication = _authentication;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.getUserMenu = _getUserMenu;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.refreshToken = _refreshToken;
        authServiceFactory.getToken = _getToken;
        authServiceFactory.changeSimulationIdentity = _changeSimulationIdentity;

        return authServiceFactory;
    }]);