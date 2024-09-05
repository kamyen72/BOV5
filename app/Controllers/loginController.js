'use strict';
app.controller('loginController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'memberShipService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
        memberShipService) {

        $scope.dataSource = {
            pageStatus: 'loginView',
            Language: [
                { text: '中文', values: 'zh-TW' },
                { text: 'English', values: 'En' }
            ],
            userDataObj: {
                UserName: '',
                Pwd: ''
            },
            forgetPwdObj: {
                UserName: '',
                Email: ''
            },
            isShowPwd: false,
            isShowForget: false,
            validObj: {},
            selPlatformCode: '',
            platformList: ngAuthSettings.platformList
        };

        $scope.init = function () {
            ngAuthSettings.topBarShow = false;
            ngAuthSettings.menuShow = false;
            ngAuthSettings.pagitationShow = false;
            
            if (localStorageService.get("Remember")) {
                $scope.dataSource.userDataObj.UserName = localStorageService.get("UserName");
                $scope.dataSource.userDataObj.Pwd = localStorageService.get("Password");
                $scope.dataSource.Remember = localStorageService.get("Remember");
            }
            if (localStorageService.get("ApiType")) {
                ngAuthSettings.apiType = localStorageService.get("ApiType");
                $scope.dataSource.apiType = ngAuthSettings.apiType;
            }
            
            $scope.dataSource.selPlatformCode = localStorageService.get("PlatformCode");
            ngAuthSettings.platformCode = $scope.dataSource.selPlatformCode;

            $scope.genValidatorCode();
            blockUI.stop();
        };

        $timeout($scope.init, 100);

        // 更新platformList
        $rootScope.$on('updatePlatformList', function () {
            $scope.dataSource.platformList = ngAuthSettings.platformList;
        });

        $scope.genValidatorCode = function () {
            memberShipService.genValidatorCode().then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.validObj = response.data.Rows;
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "forget Password";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $rootScope.$broadcast('changeModalMsg', false);
                    }
                },
                function error(response) {

                }
            );
        };

        $scope.showEyeEvent = function () {
            $scope.dataSource.isShowPwd = !$scope.dataSource.isShowPwd;
            if (!$scope.dataSource.isShowPwd) {
                $('#pwdShow').removeClass('active');
                $('#pwd').prop('type', 'password');
            }
            else {
                $('#pwdShow').addClass('active');
                $('#pwd').prop('type', 'text');
            }
        };

        $scope.showForgetEvent = function () {
            $scope.dataSource.isShowForget = !$scope.dataSource.isShowForget;
        };

        $scope.login = function (form) {
            blockUI.start();
            if ($rootScope.valid(form)) {
                blockUI.stop();
                return;
            }
            $scope.dataSource.userDataObj.PlateForm = 'BackDesk';
            $scope.dataSource.userDataObj.InputCode = $scope.dataSource.validObj.InputCode;
            $scope.dataSource.userDataObj.ValidatorCode = $scope.dataSource.validObj.ValidatorCode;
            
            ngAuthSettings.platformCode = $scope.dataSource.selPlatformCode;

            if ($scope.dataSource.Remember) {
                localStorageService.set("UserName", $scope.dataSource.userDataObj.UserName);
                localStorageService.set("Password", $scope.dataSource.userDataObj.Pwd);
                localStorageService.set("Remember", true);
            } else {
                localStorageService.remove("UserName");
                localStorageService.remove("Password");
                localStorageService.remove("Remember");
            }
            authService.login($scope.dataSource.userDataObj, $scope.dataSource.Remember);
        };

        $scope.forget = function (form) {
            if ($rootScope.valid(form)) return;

            memberShipService.forgetPwd($scope.dataSource.forgetPwdObj).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.authToken = response.data.AuthToken;
                        ngAuthSettings.modalMsg.title = "forget Password";
                        ngAuthSettings.modalMsg.msg = 'New password has been sent to your mail.';

                        // Put cookie
                        //localStorageService.set('UserToken', response.data.AuthToken);
                        //localStorageService.set('userInfo', response.data.Rows);

                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        //authService.fillAuthData();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "forget Password";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                    }

                    $rootScope.$broadcast('changeModalMsg', false);
                },
                function error(response) {

                }
            );
        };

        $scope.changeApiCode = function () {
            localStorageService.set("PlatformCode", $scope.dataSource.selPlatformCode);
            ngAuthSettings.platformCode = $scope.dataSource.selPlatformCode;
        };

        $scope.showLogin = function () {
            $scope.dataSource.pageStatus = 'loginView';
        };

        $scope.showRegister = function () {
            $scope.dataSource.pageStatus = 'registerView';
        };

    }]);