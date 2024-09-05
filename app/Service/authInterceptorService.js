'use strict';
app.factory('authInterceptorService', [
    '$q',
    '$injector',
    '$location',
    'ngAuthSettings',
    '$rootScope',
    'localStorageService',
    function ($q, $injector, $location, ngAuthSettings, $rootScope, localStorageService) {
        var inFlightRequest = null;

        var authInterceptorServiceFactory = {};

        var _isLogin = function (event) {
            if ($location.path() === '/login') {
                ngAuthSettings.topBarShow = false;
                ngAuthSettings.menuShow = false;
                $rootScope.$broadcast('changeMenuShow');
                return;
            }

            //Server執行時以下要mark
            ngAuthSettings.headers = ngAuthSettings.headers || {};

            // 是否登入
            //if (localStorageService.get('UserToken') === '' || localStorageService.get('UserToken') === undefined) {
            // 是否登入
            if (!localStorageService.get('UserName')) {
                ngAuthSettings.topBarShow = false;
                ngAuthSettings.menuShow = false;
                $rootScope.$broadcast('changeMenuShow');

                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = 'Please login!';
                ngAuthSettings.modalMsg.linkTo = 'login';
                $rootScope.$broadcast('changeModalMsg', false);
                event.preventDefault();
                return;
            }

            if (typeof BrowserDetect.browser === "undefined") {
                BrowserDetect.init();
            }
            
            ngAuthSettings.headers = {
                'UserToken': localStorageService.get('UserToken'),
                'UserName': localStorageService.get('UserName'),
                'AuthToken': localStorageService.get('AuthToken'),
                'CompanyID': localStorageService.get("CompanyID"),
                'UserAgent': BrowserDetect.browser + '#' + BrowserDetect.version + '#' + BrowserDetect.UserAgent + '#' + BrowserDetect.OS
            };

            ngAuthSettings.topBarShow = true;
            ngAuthSettings.menuShow = true;
            ngAuthSettings.modalMsg = {};
            // 填完訊息後顯示訊息框
            $rootScope.$broadcast('changeMenuShow');
        };

        var _request = function (config) {
            //Server執行時以下要mark

            if (typeof BrowserDetect.browser === "undefined") {
                BrowserDetect.init();
            }
            config.headers = config.headers || {};

            //var authData = localStorageService.authorizationData;
            //if (authData) {
            //    config.headers.Authorization = 'Bearer ' + authData.accessToken;
            //    config.headers.UserToken = authData.userToken;
            //}

            var userToken = localStorageService.get('UserToken');
            var userName = localStorageService.get('UserName');
            var companyID = localStorageService.get('CompanyID');
            config.headers.UserToken = userToken === undefined ? '' : userToken;
            config.headers.UserName = userName === undefined ? '' : userName;
            config.headers.CompanyID = companyID === undefined ? '' : companyID;
            config.headers.UserAgent = BrowserDetect.browser + '#' + BrowserDetect.version + '#' + BrowserDetect.UserAgent + '#' + BrowserDetect.OS;

            return config;

            // 本機執行時以下要mark
            //var deferred = $q.defer();
            //if ((config.url.indexOf('api') !== -1)) {
            //    // If any API resource call, get the token firstly
            //    //console.log("authInterceptorServiceFactory.request config.url = " + config.url);
            //    var authService = $injector.get('authService');
            //    authService.getToken().then(function (token) {
            //        //console.log("authInterceptorServiceFactory.request token = " + token);
            //        if (token != undefined && token != null && token != '') {
            //            config.headers.Authorization = 'Bearer ' + token;
            //            deferred.resolve(config);
            //        } else {
            //            deferred.reject('authInterceptorService.request token not exist!');
            //        }
            //    });
            //} else {
            //    deferred.resolve(config);
            //}
            //return deferred.promise;
        };

        var _responseError = function (rejection) {
			/* 
			 * 401 當前請求需要用戶驗證：
			 * 當前請求需要用戶驗證。該響應必須包含一個適用於被請求資源的 WWW-Authenticate 信息頭用以詢問用戶信息。客戶端可以重複提交一個包含恰當的 Authorization 頭信息的請求。如果當前請求已經包含了 Authorization 證書，那麼401響應代表著服務器驗證已經拒絕了那些證書。如果401響應包含了與前一個響應相同的身份驗證詢問，且瀏覽器已經至少嘗試了一次驗證，那麼瀏覽器應當向用戶展示響應中包含的實體信息，因為這個實體信息中可能包含了相關診斷信息。參見RFC 2617。
			 * 419 認證超時：
			 * 並不是HTTP標註的一部分，419認證超時表示以前的有效證明已經失效了。同時也被用於401未認證的替代選擇為了從其它被拒絕訪問的已認證客戶端中指定服務器的資源。
			 */
            //console.log("authInterceptorService.responseError rejection.status = " + rejection.status);
            if (rejection.status === 401 || rejection.status === 419) {
                var authService = $injector.get('authService');
                var authData = localStorageService.authorizationData;

                //console.log("authInterceptorService.responseError 1");
                if (authData) {
                    //if (authData.useRefreshTokens) {
                    //    $location.path('/refresh');
                    //    return $q.reject(rejection);
                    //}


                    var $http = $injector.get('$http');

                    // first create new session server-side
                    var defer = $q.defer();
                    var promiseSession = defer.promise;

                    if (authService.refreshToken()) {
                        //console.log("authInterceptorService.responseError refreshToken success");
                        defer.resolve();

                        // and chain request
                        var promiseUpdate = promiseSession.then(function () {
                            //console.log("authInterceptorService.responseError resend http");
                            authService.getToken().then(function (token) {
                                //console.log("authInterceptorService.responseError token = " + token);
                                rejection.config.headers.Authorization = 'Bearer ' + token;
                            });
                            return $http(rejection.config);
                        });
                        return promiseUpdate;
                    } else {
                        //console.log("authInterceptorService.responseError refreshToken error");
                        deferred.reject('authInterceptorService.responseError refreshToken error');
                    }
                }

                // 20210803 老闆說遇到沒權限時不用登出
                // authService.logOut();
                // localStorageService.ssoStartPage = $location.path();
                // //location.href = "./SSO.aspx";
                // $location.path('/reLogin');
            }

            //return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;
        authInterceptorServiceFactory.isLogin = _isLogin;

        return authInterceptorServiceFactory;
    }]);