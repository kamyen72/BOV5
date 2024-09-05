'use strict';
app.controller('indexController',
    [
        '$scope',
        '$rootScope',
        '$location',
        '$translate',
        'localStorageService',
        '$timeout',
        '$http',
        '$q',
        'authService',
        '$route',
        'ngAuthSettings',
        'platformService',
        function ($scope, $rootScope, $location, $translate, localStorageService, $timeout,
            $http, $q, authService, $route, ngAuthSettings, platformService) {

            // 登入驗證
            $scope.authentication = authService.authentication;
            $scope.ngAuthSettings = ngAuthSettings;
            $scope.location = $location;

            $scope.dataSource = {
                menuList: [
                    {
                        Text: "Member",
                        URL: 'javascript:void(0)',
                        DropDownList: true,
                        Items: [
                            { Text: "MemberManage", URL: "#!/memberManage", DropDownList: false },
                            { Text: "SubAdminManage", URL: "#!/subAdminManage", DropDownList: false },
                        ]
                    },
                    {
                        Text: "Report",
                        URL: 'javascript:void(0)',
                        DropDownList: true,
                        Items: [
                            { Text: "WinLostReport", URL: "#!/betReport", DropDownList: false },
                            { Text: "OutstandingReport", URL: "#!/outstandingReport", DropDownList: false, Enable: true }
                        ]
                    },
                ],
                menuShow: false,
                topBarShow: false,
                selectMenu: {},
                modalMsg: {},
                subMenuIndex: -1,
                siteMapPath: '',
                memberInfo: {},
                languageRead: 'en'
            };

            $scope.init = function () {
                // $scope.getPlatform();
                $rootScope.memberInfo = localStorageService.get('UserInfo');
                $scope.dataSource.memberInfo = $rootScope.memberInfo;
                if (localStorageService.get('LanguageRead')) {
                    $scope.dataSource.languageRead = localStorageService.get('LanguageRead');
                    $translate.use($scope.dataSource.languageRead);
                } else {
                    localStorageService.set('LanguageRead', $scope.dataSource.languageRead);
                }
                if ($rootScope.isLogin) $location.path('memberManage');
                //ngAuthSettings.headers = {
                //    headers: { 'UserName': localStorageService.get('UserName') === undefined ? '' : localStorageService.get('UserName') }
                //};
                $rootScope.$broadcast('setMenuPermission');
            };

            $timeout($scope.init, 100);

            // Logout
            $scope.logout = function () {
                var ajaxData = { 'UserName': localStorageService.get('UserName') };
                authService.logOut(ajaxData);
            };

			$scope.getPlatform = function () {
                var companyId = localStorageService.get("CompanyID");
				return platformService.get({ ID: companyId }).then(
					function success(response) {
						if (response && response.data.APIRes.ResCode === '000') {
                            localStorageService.set('PlatformSetting', response.data.Rows.QryData);
						}
					},
					function error(response) {
					}
				);
			};

            // 訊息框內容更換
            $rootScope.$on('getPlatform', function () {
                $scope.getPlatform();
            });

			$scope.findPlatform = function () {
				return platformService.find({ TypeCode: 'API' }).then(
					function success(response) {
						if (response && response.data.APIRes.ResCode === '000') {
							if (response.data.Rows.ListData && response.data.Rows.ListData.length > 0) {
                                let ListData = response.data.Rows.ListData || [];
                                let checkUrl = window.location.origin;
                                // 用當前網域判斷要呈現哪些平台

                                let hostname = window.location.hostname;

                                let hostNameCheck = hostname;
                                // 20210728先去掉www、agent跟master
                                if (hostname.indexOf("www") === 0) {
                                    hostNameCheck = hostname.replace("www.", "");
                                }
                                if (hostname.indexOf("agent") === 0) {
                                    hostNameCheck = hostname.replace("agent.", "");
                                }
                                if (hostname.indexOf("master") === 0) {
                                    hostNameCheck = hostname.replace("master.", "");
                                }
                                // 忽略後面com跟net
                                let hostFirstName = hostNameCheck.split('.')[0];

                                let platformData = ListData.find(data => data.URL.indexOf(hostFirstName) > -1);

                                if (platformData) {
                                    ngAuthSettings.platformID = platformData.ID;
                                    ngAuthSettings.platformCode = platformData.ShortName;
                                    ngAuthSettings.platformLogo = `${platformData.ShortName}-logo`;
                                } else {
                                    //TODO: 不再列表 則暫時用ghl
                                    ngAuthSettings.platformID = 3;
                                    ngAuthSettings.platformCode = 'hl';
                                    ngAuthSettings.platformLogo = 'hl-logo';
                                }

                                ngAuthSettings.platformList = ListData.filter(data => data.URL.indexOf(checkUrl) > -1);
                                $rootScope.$broadcast('updatePlatformList');
							}
						}
					},
					function error(response) {

					}
				);
			};

            $scope.personProfile = function () {
                $scope.dataSource.subMenuIndex = -1;
                $location.path('personProfile');
                //if ($location.path() === '/memberManage') $route.reload();
                //else $location.path('memberManage');
            };

            $scope.siteMapPath = function (menuVal, subMenuIndex) {
                if (menuVal.URL === 'javascript:void(0)' && subMenuIndex === -1) return;

                $scope.dataSource.selectMenu = menuVal;
                $scope.dataSource.subMenuIndex = subMenuIndex;
                if (subMenuIndex >= 0) {
                    $scope.dataSource.siteMapPath = menuVal.Text + ' ➔ ' + menuVal.Items[subMenuIndex].Text;
                }
                else {
                    $scope.dataSource.siteMapPath = menuVal.Text;
                }
            };

            $scope.changeLanguage = function () {
                $translate.use($scope.dataSource.languageRead);
                localStorageService.set('LanguageRead', $scope.dataSource.languageRead);
            };

            //broadCast event

            // 訊息框內容更換
            $rootScope.$on('setMenuPermission', function () {

                let MemberFunction = localStorageService.get('MemberFunction') || {};
                let FunctionGroups = MemberFunction.FunctionGroups || [];
                
                $scope.dataSource.menuList = [];

                FunctionGroups.forEach(fItem => {
                    if(fItem.IsBO) {
                        let newMenuItem = {
                            Text: fItem.LKey,
                            URL: fItem.FURL,
                            DropDownList: false,
                            Enable: true,
                            Sort: fItem.Sort,
                        }

                        if(fItem.DropDownFunction && fItem.DropDownFunction.length > 0) {
                            newMenuItem.DropDownList = true;
                            newMenuItem.Items = fItem.DropDownFunction.map(ddfItem => ({
                                Text: ddfItem.LKey,
                                URL: ddfItem.FURL,
                                DropDownList: false,
                                Enable: true,
                                Sort: ddfItem.Sort,
                            }));
                        }
                        // newMenuItem.Items.sort((a,b) => a.Sort - b.Sort);
                        $scope.dataSource.menuList.push(newMenuItem);
                    }
                });
                // $scope.dataSource.menuList.sort((a,b) => a.Sort - b.Sort);
            });

            // 訊息框內容更換
            $rootScope.$on('changeModalMsg', function (event, showCancel) {
                //$scope.dataSource.modalMsg.title = title;
                //$scope.dataSource.modalMsg.msg = msg;
                //$scope.dataSource.modalMsg.type = type;
                //$scope.dataSource.modalMsg.linkTo = linkTo;
                //$scope.dataSource.modalMsg.callBack = callBack;
                $scope.dataSource.modalMsg = ngAuthSettings.modalMsg;
                //$scope.dataSource.loginStatus = ngAuthSettings.isLogin;
                //console.log(ngAuthSettings.modalMsg);

                if (showCancel) $('#ModalCancel').show();
                else $('#ModalCancel').hide();

                if (!$('#exampleModalLong').hasClass('in')) $('#ModalShow').click();

            });

            // Menu是否顯示
            $rootScope.$on('changeMenuShow', function (event) {
                $scope.dataSource.topBarShow = ngAuthSettings.topBarShow;
                $scope.dataSource.menuShow = ngAuthSettings.menuShow;
            });

            // 更新MemberInfo
            $rootScope.$on('changeMemberInfo', function (event) {
                $rootScope.memberInfo = localStorageService.get('UserInfo');
                $scope.dataSource.memberInfo = $rootScope.memberInfo;
            });

            // 訊息框處理事件
            $scope.modalMsgConfirmEvent = function (values) {
                $('#exampleModalLong').modal('hide');

                if (values) {
                    //Confirmevent
                    if ($scope.dataSource.modalMsg.callBack) setTimeout(function () {
                        $rootScope.$broadcast($scope.dataSource.modalMsg.callBack);
                    }, 500);
                } else {
                    //Cancelevent
                }

                if ($scope.dataSource.modalMsg.linkTo) $location.path($scope.dataSource.modalMsg.linkTo);
            };

            //驗證Form欄位資料
            $rootScope.valid = function (form) {
                var errorMsg = '';
                if (form && form.$invalid) {
                    if (form.$error.required) {
                        errorMsg += 'Required：';
                        form.$error.required.forEach(p => { errorMsg += p.$name + '.'; });
                    }

                    if (form.$error.myValidator) {
                        if (errorMsg) errorMsg += "<br>";
                        errorMsg += 'Format Error：';
                        form.$error.myValidator.forEach(p => { errorMsg += p.$name + '.'; });
                    }

                    ngAuthSettings.modalMsg = {};
                    ngAuthSettings.modalMsg.title = "Message";
                    ngAuthSettings.modalMsg.msg = errorMsg;
                    ngAuthSettings.modalMsg.type = '100';
                    $rootScope.$broadcast('changeModalMsg', false);
                }

                return errorMsg;
            };



        }
    ]
);