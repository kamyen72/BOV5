'use strict';
app.controller('subAdminManageController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'memberShipService',
    'mGroupService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, memberShipService, mGroupService) {

        $scope.dataSource = {
            pageStatus: 'searchView',
            searchCondition: { CurrentPage: 1, PageSize: 10 },
            ConfirmMsg: {},
            clickRegister: false,
            functionGroupList: [],
            selMemberInfo: {},
            listData: [],
            PagerObj: {
                CurrentPage: 1,
                PageSize: 10,
                TotalItems: 0,
                PageArray: [],
                PageRangeMax: 10,
                PageRangeMin: 1,
                thisPage: 1
            }
        };

        $scope.init = function () {
            $scope.dataSource.memberInfo = localStorageService.get('UserInfo');
            $scope.search();
            $scope.defaultFunctionGroups();
        };

        $timeout($scope.init, 100);

        $scope.defaultFunctionGroups = function () {
            let MemberFunction = localStorageService.get('MemberFunction') || {};
            let defaultFunctionGroups = (MemberFunction.MGroup || {}).FunctionGroups || [];
            $scope.dataSource.functionGroupList = [];
            
            defaultFunctionGroups.forEach(item => {
                if (item.ParentID > 0) {
                    // 有父層
                    let parent = $scope.dataSource.functionGroupList.find(prev => prev.ID === item.ParentID);
                    if (parent) {
                        if (!parent.subView) { // 子列表初始化
                            parent.subView = [];
                        }
                        let twin = parent.subView.find(sub => sub.GroupA === item.GroupA);
                        // 若有GroupA重複的 代表是同一頁(紀錄不同權限的ID)
                        if (twin && item.GroupA) {
                            if (!item.IsRead) {
                                twin.EditID = item.ID;
                            }
                            if (item.IsRead) {
                                twin.ViewID = item.ID;
                            }
                        } else {
                            // 新頁面
                            item.EditID = -1;
                            item.ViewID = -1;
                            if (!item.IsRead) {
                                item.EditID = item.ID;
                            }
                            if (item.IsRead) {
                                item.ViewID = item.ID;
                            }
                            parent.subView.push(item);
                        }
                    }
                } else {
                    // 父頁
                    item.EditID = item.ID;
                    $scope.dataSource.functionGroupList.push(item);
                }
            });
        };

        $scope.search = function () {
            let ajaxData = {
                AgentLevelSCID: IS_MASTER ? 38 : 39, // Master網站查subCompany Agent網站查SubAgent
                CurrentPage: $scope.dataSource.PagerObj.CurrentPage,
                PageSize: $scope.dataSource.PagerObj.PageSize
            };

            blockUI.start();
            memberShipService.findUser(ajaxData)
                .then(
                    function success(response) {
                        //alert(JSON.stringify(response.data.Rows.ListData));
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.listData = response.data.Rows.ListData;
                            //頁籤
                            $scope.dataSource.PagerObj = response.data.Rows.PagerObj;
                            $scope.dataSource.PagerObj["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                            $scope.dataSource.PagerObj["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                            $scope.dataSource.PagerObj["PageArray"] = [];
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                            $rootScope.$broadcast('changeModalMsg');
                        }
                        blockUI.stop();
                    },
                    function error() {
                        blockUI.stop();
                    });
        };

        
        // 檢查註冊資料
        // $scope.checkRegisterData = function (column) {
        //     if ($scope.dataSource.pageStatus !== 'addView') {
        //         return;
        //     }

        //     var sendObj = {};
        //     if (column === 'UserName') {
        //         if (!$scope.dataSource.selMemberInfo.Account) return;
                
        //         // 不在IS_MASTER 加上當前平台前綴 串出UserName
        //         else if (!IS_MASTER && ngAuthSettings.platformCode) {
        //             sendObj.UserName = ngAuthSettings.platformCode + '_' + $scope.dataSource.selMemberInfo.Account;
        //         } else {
        //             sendObj.UserName = $scope.dataSource.selMemberInfo.Account;
        //         }
        //     }

        //     memberShipService.checkRegisterData(sendObj).then(
        //         function success(response) {
        //             if (response.data.APIRes.ResCode === '000') {
        //                 $scope.dataSource.ConfirmMsg[column] = '';
        //             }
        //             else if (response.data.APIRes.ResCode === '400') {
        //                 if (column === 'UserName') {
        //                     $scope.dataSource.ConfirmMsg.UserName = 'MemberManage_UsernameNotAvailable';
        //                 }
        //             }
        //             else {
        //                 $scope.dataSource.ConfirmMsg[column] = response.data.APIRes.ResMessage;
        //             }
        //         },
        //         function error() {
        //         }
        //     );
        // };

        $scope.add = function (form) {
            $scope.dataSource.clickRegister = true;
            if ($rootScope.valid(form)) return;

            if ($scope.dataSource.selMemberInfo.Pwd !== $scope.dataSource.selMemberInfo.ConfirmPwd) {
                $scope.dataSource.ConfirmMsg.Pwd = $scope.dataSource.ConfirmMsg.ConfirmPwd = 'PasswordDifferentDetail';
                ngAuthSettings.modalMsg.title = 'Alert';
                ngAuthSettings.modalMsg.msg = 'PasswordDifferentDetail';
                $rootScope.$broadcast('changeModalMsg', false);
                return;
            }

            let parentInfo = $scope.dataSource.memberInfo;

            let ajaxData = {
                Account: $scope.dataSource.selMemberInfo.Account,
                FullName: $scope.dataSource.selMemberInfo.FullName,
                NickName: $scope.dataSource.selMemberInfo.FullName,
                Pwd: $scope.dataSource.selMemberInfo.Pwd,
                AgentLevelSCID: IS_MASTER ? 38 : 39, // Master網站加subCompany Agent網站加SubAgent
                AgentParentID: parentInfo.MemberID,
                AgentParentMap: parentInfo.AgentParentMap + parentInfo.UserName + '/',
                selPlatformCode: ngAuthSettings.platformCode,
                ReferralPayType: parentInfo.ReferralPayType,
                CashRebatePayType: parentInfo.CashRebatePayType,
                CashBackRebatePayType: parentInfo.CashBackRebatePayType,
                PlatformSettingIDs: []
            };

            ajaxData.UserName = ajaxData.Account;

            blockUI.start();
            memberShipService.addMember(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.clickRegister = false;

                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        
                        //20210728 addMember後 取得memberID 一秒後更新functionGroup
                        if((response.data.Rows && response.data.Rows.MemberID)) {
                            setTimeout( function() {
                                blockUI.stop();
                                $scope.updateFunctionGroup(response.data.Rows.MemberID);
                            }, 1000);
                        } else {
                            blockUI.stop();
                            $rootScope.$broadcast('changeModalMsg');
                            ngAuthSettings.modalMsg.callBack = 'showSearch';
                        }
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        blockUI.stop();
                        return;
                    }
                },
                function error(response) {
                    blockUI.stop();
                });

        };

        $scope.getMGroup = function (MGroupID) {
            let ajaxData = {
                CurrentPage: 1,
                PageSize: 100000,
                MGroupID
            };
            blockUI.start();
            mGroupService.get(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.clickRegister = false;
                        let functionGroups = response.data.Rows.QryData.FunctionGroups || [];
                        let functionGroupEnableIDs = functionGroups.map(item => item.ID);

                        $scope.dataSource.functionGroupList.forEach(item => {
                            if (item.EditID >= 0 && functionGroupEnableIDs.includes(item.EditID)) {
                                item.IsCanEdit = true;
                            } else {
                                item.IsCanEdit = false;
                            }
                            if (item.subView && item.subView.length > 0) {
                                item.subView.forEach(sub => {
                                    sub.IsCanEdit = false;
                                    sub.IsCanView = false;
                                    if (sub.EditID >= 0 && functionGroupEnableIDs.includes(sub.EditID)) {
                                        sub.IsCanEdit = true;
                                    }
                                    if (sub.ViewID >= 0 && functionGroupEnableIDs.includes(sub.ViewID)) {
                                        sub.IsCanView = true;
                                    }
                                });
                            }
                        });
                        blockUI.stop();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        blockUI.stop();
                        return;
                    }
                },
                function error(response) {
                    blockUI.stop();
                });
        };

        $scope.changeAndSave = function (member) {
            $scope.dataSource.selMemberInfo = member;
            $scope.update(null, false);
        };

        $scope.update = function (form, isNeedUpdateFunctionGroup) {
            $scope.dataSource.clickRegister = true;
            if ($rootScope.valid(form)) return;

            if (($scope.dataSource.selMemberInfo.Pwd || $scope.dataSource.selMemberInfo.ConfirmPwd) && 
                    $scope.dataSource.selMemberInfo.Pwd !== $scope.dataSource.selMemberInfo.ConfirmPwd) {
                $scope.dataSource.ConfirmMsg.Pwd = $scope.dataSource.ConfirmMsg.ConfirmPwd = 'PasswordDifferentDetail';
                ngAuthSettings.modalMsg.title = 'Alert';
                ngAuthSettings.modalMsg.msg = 'PasswordDifferentDetail';
                $rootScope.$broadcast('changeModalMsg', false);
                return;
            }
            
            var ajaxData = {};
            $.extend(ajaxData, $scope.dataSource.selMemberInfo);

            blockUI.start();
            memberShipService.updateUser(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.clickRegister = false;

                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        ngAuthSettings.modalMsg.callBack = 'showSearch';

                        $rootScope.$broadcast('changeModalMsg');
                        blockUI.stop();

                        if(isNeedUpdateFunctionGroup) {
                            //20210728 updateMember後 更新functionGroup
                            $scope.updateFunctionGroup($scope.dataSource.selMemberInfo.MemberID);
                        }
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        blockUI.stop();
                        return;
                    }
                },
                function error(response) {
                    blockUI.stop();
                });
        };

        $scope.updateFunctionGroup = function (MemberID) {
            let newFunctionIDs = [];

            $scope.dataSource.functionGroupList.forEach(item => {
                if(item.IsCanEdit) {
                    newFunctionIDs.push(item.EditID);
                }
                if(item.subView && item.subView.length > 0) {
                    item.subView.forEach(sub => {
                        if (sub.IsCanEdit) {
                            newFunctionIDs.push(sub.EditID);
                        }
                        if (sub.IsCanView) {
                            newFunctionIDs.push(sub.ViewID);
                        }
                    });
                }
            });

            
            var ajaxData = {
                FunctionIDs: newFunctionIDs,
                MemberID,
                IsGameDealer : true
            };
            blockUI.start();
            mGroupService.updateFunctionGroupByMember(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        ngAuthSettings.modalMsg.callBack = 'showSearch';
                        $rootScope.$broadcast('changeModalMsg');
                        blockUI.stop();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        blockUI.stop();
                        return;
                    }
                },
                function error(response) {
                    blockUI.stop();
                });
        };

        // 父層級更改勾選 下面全體一起跟著變
        $scope.changeViewGroupCheckbox = function (view) {
            if (view.subView && view.subView.length > 0) {
                view.subView.forEach(sub => {
                    sub.IsEnable = view.IsCanEdit;
                    if (sub.EditID >= 0) {
                        sub.IsCanEdit = view.IsCanEdit;
                    }
                    if (sub.ViewID >= 0) {
                        sub.IsCanView = view.IsCanEdit;
                    }
                });
            }
        };

        // 取消勾選IsCanView時 也要跟著取消IsCanEdit
        $scope.changeSubViewCheckBox = function (subView) {
            if (!subView.IsCanView && subView.EditID >= 0) {
                subView.IsCanEdit = subView.IsCanView;
            }
        };

        // 勾選IsCanEdit時 也要跟著勾選IsCanView
        $scope.changeSubEditCheckBox = function (subView) {
            if (subView.IsCanEdit && subView.ViewID >= 0) {
                subView.IsCanView = subView.IsCanEdit;
            }
        };

        $scope.showEyeEvent = function () {
            $scope.dataSource.isShowMemberPwd = !$scope.dataSource.isShowMemberPwd;
        };

        $scope.showAdd = function () {
            $scope.dataSource.pageStatus = 'addView';
            $scope.dataSource.selMemberInfo = {};
            $scope.dataSource.clickRegister = false;
            // Master網站預設(6)subCompany Agent網站預設(7)SubAgent
            $scope.getMGroup(IS_MASTER ? 6 : 7);
        };

        $scope.showEdit = function (member) {
            $scope.dataSource.pageStatus = 'editView';
            $.extend($scope.dataSource.selMemberInfo, member);
            $scope.dataSource.clickRegister = false;

            $scope.getMGroup(member.MGroupID);

            // 不在IS_MASTER 或 有show下拉代理平台  從userName取出PlatformCode與Account
            var userNameSplit = (member.UserName || '').split('_');
            if ((!IS_MASTER || $scope.dataSource.isShowPlatform) && userNameSplit.length > 1) {
                $scope.dataSource.selMemberInfo.Account = userNameSplit[1];
                $scope.dataSource.selMemberInfo.selPlatformCode = userNameSplit[0];
            } else {
                $scope.dataSource.selMemberInfo.Account = member.UserName;
                $scope.dataSource.selMemberInfo.selPlatformCode = '';
            }
            
        };

        $scope.showSearch = function () {
            $scope.dataSource.pageStatus = 'searchView';
            $scope.search();
        };

        $scope.$on('showSearch', $scope.showSearch);

        //換頁
        $scope.PageChanged = function (page) {
            $scope.dataSource.PagerObj.CurrentPage = page;
            $scope.search();
        };

    }]);