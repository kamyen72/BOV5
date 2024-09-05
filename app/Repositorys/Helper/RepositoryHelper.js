'use strict';
app.factory('RepositoryHelper', ['$http', '$rootScope', '$location', 'ngAuthSettings', 'localStorageService', 'blockUI',
    function ($http, $rootScope, $location, ngAuthSettings, localStorageService, blockUI) {
        var factory = {};

        function LoginFail(APIRes) {
            localStorageService.remove('UserToken');
            localStorageService.remove('UserName');
            localStorageService.remove('UserInfo');
            localStorageService.remove('PlatformSettings');

            //ngAuthSettings.isLogin.Text = 'Login';
            //ngAuthSettings.isLogin.Status = false;
            //ngAuthSettings.headers = {};
            //ngAuthSettings.UserInfo = {};
            //$rootScope.$broadcast('changeMemberInfo');

            ngAuthSettings.modalMsg.title = "error " + APIRes.Title;
            ngAuthSettings.modalMsg.msg = APIRes.ResMessage;
            ngAuthSettings.modalMsg.type = APIRes.ResCode;
            ngAuthSettings.modalMsg.linkTo = 'login';

            $location.path('login');
            //$rootScope.$broadcast('changeModalMsg');
        }

        var _post = function (ajaxData) {
            return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
                function success(response, status, headers) {
                    if (!response || !response.status) {
                        return {};
                    }
                    if (response.data.APIRes.ResCode === '200') {
                        let apiRes = {
                            Title: response.data.APIRes.FnName,
                            ResMessage: response.data.APIRes.ResMessage,
                            ResCode: response.data.APIRes.ResMessage
                        };

                        // 20210803 老闆說遇到沒權限時不用登出，所以沒權限代碼為203
                        if (localStorageService.get('UserToken')) {
                            LoginFail(apiRes);
                            blockUI.stop();
                        }
                        //return response;
                    }
                    // 20210803 完全沒讀寫權限 自動跳轉到home頁
                    if (response.data.APIRes.ResCode === '203') {
                        ngAuthSettings.modalMsg.title = response.data.APIRes.Title;
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $location.path('home');
                        $rootScope.$broadcast('changeMemberInfo');
                    }
                    return response;
                }, function error(data, status, headers) {
                    return data;
                });
        };

        factory.post = _post;

        return factory;
    }]);