'use strict';
app.controller('memberManageController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'memberShipService',
    'systemConfigService',
    'transactionsService',
    'statementService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
        memberShipService, systemConfigService, transactionsService, statementService) {

        $scope.changeConsole = function () {
            console.log($scope.dataSource.selMemberInfo);
        };

        $scope.dataSource = {
            pageStatus: 'searchView',
            searchCondition: { CurrentPage: 1, PageSize: 10, MemberUser: '', Address: '', Email: '', AgentLevelSCID: null },
            modalMsg: {},
            resetInfo: {},
            listData: [],
            transactionData: [],
            statementData: [],
            parentData: [
                { level: 1, selData: {}, listData: [] },
                { level: 2, selData: {}, listData: [] },
                { level: 3, selData: {}, listData: [] }
            ],
            payTypeDropDown: [],
            memberInfo: {},
            selMemberInfo: {},
            selBank: {},
            selStatement: {},
            parentInfo: { agentParent: {}, level: 1, agentParentMap: [] },
            changePwdObj: { MemberOldPwd: '', MemberNewPwd: '' },
            status: 0,
            userTypeDropDown: [{ text: 'Please Choose', value: -1 }, { text: 'System Manager', value: '0' }, { text: 'Customer Service', value: '1' }, { text: 'Agent', value: '2' }],
            agentLevelDropDown: [],
            showAgentLevelDropDown: [],
            isShowAddMemberPwd: false,
            PagerObj: {
                CurrentPage: 1,
                PageSize: 10,
                TotalItems: 0,
                PageArray: [],
                PageRangeMax: 10,
                PageRangeMin: 1,
                thisPage: 1
            },
            PagerObj2: {
                CurrentPage: 1,
                PageSize: 10,
                TotalItems: 0,
                PageArray: [],
                PageRangeMax: 10,
                PageRangeMin: 1,
                thisPage: 1
            },
            PagerObj3: {
                CurrentPage: 1,
                PageSize: 10,
                TotalItems: 0,
                PageArray: [],
                PageRangeMax: 10,
                PageRangeMin: 1,
                thisPage: 1
            },
            platformOptions: [],
            platformID :0,
            IsSpecialAgent: false
        };

        $scope.init = function () {
            ngAuthSettings.menuShow = true;
            ngAuthSettings.pagitationShow = true;

            $scope.editType = $location.path() === '/memberManage' ? 'editView' : 'personEditView';
            $scope.dataSource.pageStatus = $location.path() === '/memberManage' ? 'searchView' : 'editView';
            
            $scope.dataSource.memberInfo = localStorageService.get('UserInfo');
			$scope.dataSource.IsSpecialAgent = $scope.dataSource.memberInfo.IsSpecialAgent;
            if ($scope.dataSource.memberInfo && $scope.dataSource.pageStatus !== 'searchView') {
                $scope.showEdit($scope.dataSource.memberInfo);
            }

            // 取出登入帳號平台列表
            $scope.dataSource.platformOptions = (localStorageService.get('PlatformSettings') || [])
                .map(item => ({
                    label: item.PlatformName,
                    value: item.TypeCode === 'API' ? item.APICode : item.ShortName, // API用APICode Platform用ShortName
                    ID: item.ID,
                    TypeCode: item.TypeCode,
                }));

            //SubCompany, SubAdmin
            if ($scope.dataSource.memberInfo.AgentLevelSCID === 38 || $scope.dataSource.memberInfo.AgentLevelSCID === 39) {
                var agentParentMap = $scope.dataSource.memberInfo.AgentParentMap.split('/');
                $scope.dataSource.memberInfo.UserName = agentParentMap[agentParentMap.length - 2];
                $scope.dataSource.memberInfo.MemberID = $scope.dataSource.memberInfo.AgentParentID;
                //$scope.dataSource.memberInfo.AgentLevelSCID = $scope.dataSource.memberInfo.AgentLevelSCID === 38 ? 28 : 31;
                //$scope.dataSource.memberInfo.AgentPositionTakingTebate = 1;
            }

            //$scope.dataSource.platformID = $scope.dataSource.platformOptions.find(p => p.value === ngAuthSettings.platformCode).ID;
            $scope.dataSource.platformID = $scope.dataSource.platformOptions.find(p => p.value === 'HL')?.ID;

            $scope.dropDownInit();
            //$scope.search();
        };

        //抓取介紹費PayType下拉
        $scope.dropDownInit = function () {
            //PayType DropDown
            var dropDown1 = systemConfigService.findSystemConfigChildren({ ListConfigName: ['PayType'] })
                .then(
                    function success(response, status, headers) {
                        //console.log(response.data.Rows.ListData);
                        //alert(JSON.stringify(response.data.Rows.ListData));
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.payTypeDropDown = response.data.Rows.ListData;
                            $scope.dataSource.payTypeDropDown.unshift({ ID: -1, ConfigName: 'Please Choose' });
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                    },
                    function error(response) {
                        console.log(response);
                        blockUI.stop();
                    });

            //AgentLevel DropDown
            var dropDown2 = systemConfigService.findSystemConfigChildren({ ListConfigName: ['AgentLevel'] })
                .then(
                    function success(response, status, headers) {
                        //alert(JSON.stringify(response.data.Rows.ListData));
                        if (response.data.APIRes.ResCode === '000') {
                            // 取得所有等級列表
                            $scope.dataSource.agentLevelDropDown = response.data.Rows.ListData.filter(p => p.ConfigValues !== '5');
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                    },
                    function error(response) {
                        console.log(response);
                        blockUI.stop();
                    });

            //TransactionType
            var dropDown3 = systemConfigService.findSystemConfigChildren({ ListConfigName: ['DepositType', 'WithDrawalType'] })
                .then(
                    function success(response, status, headers) {
                        //alert(JSON.stringify(response.data.Rows.ListData));
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.transactionTypeDropDown = response.data.Rows.ListData;
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                    },
                    function error(response) {
                        console.log(response);
                        blockUI.stop();
                    });

            Promise.all([dropDown1, dropDown2, dropDown3])
                .then(() => {
                    if ($scope.editType !== 'personEditView') {
                        $scope.search();
                    }

                    if ($scope.dataSource.memberInfo && $scope.dataSource.pageStatus !== 'searchView') {
                        $scope.showEdit($scope.dataSource.memberInfo);
                    }
                });
        };

        $timeout($scope.init, 100);

        $scope.search = function (isRefresh) {
            blockUI.start();

            let ajaxData = {
                UserName: $scope.dataSource.searchCondition.UserName,
                Email: $scope.dataSource.searchCondition.Email,
                Phone: $scope.dataSource.searchCondition.Phone,
                AgentParentID: $scope.dataSource.memberInfo.MemberID,
                CurrentPage: $scope.dataSource.PagerObj.CurrentPage,
                PageSize: $scope.dataSource.PagerObj.PageSize,
                IsStaging: IS_STAGING
            }

            // 20210728 agnet subAgent只會搜尋到member
            if($scope.dataSource.memberInfo.AgentLevelSCID === 31 || $scope.dataSource.memberInfo.AgentLevelSCID === 39) {
                ajaxData.AgentLevelSCID = 32;
            }

            if(isRefresh) {
                ajaxData.IsUpdateBalance = true;
            }

            $scope.dataSource.listData = [];
            memberShipService.findUser(ajaxData)
                .then(
                    function success(response, status, headers) {
                        blockUI.stop();
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.listData = response.data.Rows.ListData;

                            //$scope.dataSource.listData.forEach(p => {
                                //p.AgentLevel = $scope.dataSource.agentLevelDropDown.filter(q => q.ID === parseInt(p.AgentLevelSCID))[0].ConfigName;
                                //p.AgentLevelValue = $scope.dataSource.agentLevelDropDown.filter(q => q.ID === parseInt(p.AgentLevelSCID))[0].ConfigValues;
                            //});

                            //頁籤
                            $scope.dataSource.PagerObj = response.data.Rows.PagerObj;
                            $scope.dataSource.PagerObj["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                            $scope.dataSource.PagerObj["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                            $scope.dataSource.PagerObj["PageArray"] = [];
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                    },
                    function error(data, status, headers) {
                        blockUI.stop();
                    });
        };

        $scope.searchParent = function (userName, level) {
            blockUI.start();

            var searchCondition = {};
            searchCondition.CurrentPage = $scope.dataSource.PagerObj.CurrentPage;
            searchCondition.PageSize = $scope.dataSource.PagerObj.PageSize;
            searchCondition.UserName = userName;
            searchCondition.IsTree = true;

            memberShipService.getUser(searchCondition)
                .then(
                    function success(response, status, headers) {
                        //console.log(response.data.Rows.ListData);
                        //console.log(response.data.Rows);
                        if (response.data.APIRes.ResCode === '000') {
                            var parentData = $scope.dataSource.parentData.find(p => p.level === level);
                            parentData.listData = response.data.Rows.SubNodes;
                            parentData.listData.unshift({ MemberID: -1, UserName: 'Please Choose' });

                            if ($scope.dataSource.parentInfo.agentParentMap[level]) {
                                parentData.listData.forEach((p, idx) => {
                                    if (p.UserName === $scope.dataSource.parentInfo.agentParentMap[level]) {
                                        parentData.selData = parentData.listData[idx];
                                    }
                                });
                            } else {
                                parentData.selData = parentData.listData[0];
                            }

                            $scope.changeParent(parentData, level + 1);

                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                        blockUI.stop();
                    },
                    function error(data, status, headers) {
                        blockUI.stop();
                    });
        };

        //代理人下拉選單Change
        $scope.changeParent = function (parent, level) {
            var selData = parent.selData;
            var nowParent = $scope.dataSource.parentData.find(p => p.level === level);

            if (level < $scope.dataSource.parentInfo.level) {
                var popIdx = $scope.dataSource.parentInfo.level - level + 1;
                for (var i = 0; i < popIdx; i++) {
                    $scope.dataSource.parentInfo.agentParentMap.pop();
                }
            }

            if (selData.MemberID === -1) {
                //alert($scope.dataSource.parentInfo.level + ',' + level + ',' + $scope.dataSource.parentInfo.agentParentMap);
                $scope.dataSource.parentInfo.level = level - 1;

                if (level === 2) {
                    $scope.dataSource.parentInfo.agentParent = $scope.dataSource.memberInfo;
                    return;
                } else {
                    $scope.dataSource.parentInfo.agentParent = $scope.dataSource.parentData.find(p => p.level === level - 2).selData;
                }
            }
            else {
                $scope.dataSource.parentInfo.level = level;
                //$.extend($scope.dataSource.parentInfo.agentParent, selData);
                $scope.dataSource.parentInfo.agentParent = selData;
                if (!$scope.dataSource.parentInfo.agentParentMap.includes(selData.UserName))
                    $scope.dataSource.parentInfo.agentParentMap.push(selData.UserName);


                //alert(level + ',' + $scope.dataSource.parentInfo.agentParentMap[level + 2]);
                if (level === 4) return;

                nowParent.listData = selData.SubNodes;
                if (!nowParent.listData) nowParent.listData = [];
                if (nowParent.listData.filter(p => p.MemberID === -1).length === 0)
                    nowParent.listData.unshift({ MemberID: -1, UserName: 'Please Choose' });

                if ($scope.dataSource.parentInfo.agentParentMap[level]) {
                    //agentmap有對應時自動帶入
                    var check = false;
                    nowParent.listData.forEach((p, idx) => {
                        if (p.UserName === $scope.dataSource.parentInfo.agentParentMap[level]) {
                            nowParent.selData = nowParent.listData[idx];
                            $scope.changeParent(nowParent, level + 1);
                            check = true;
                        }
                    });
                    if (!check) nowParent.selData = nowParent.listData[0];
                } else {
                    nowParent.selData = nowParent.listData[0];
                }
            }
        };

        $scope.changeAgentLevel = function () {
            $scope.dataSource.parentInfo.level = $scope.dataSource.agentLevelDropDown.filter(q => q.ID === parseInt($scope.dataSource.selMemberInfo.AgentLevelSCID))[0].ConfigValues - 1;
        };

        //清除搜尋條件
        $scope.clear = function () {
            $scope.dataSource.searchCondition = {};
        };

        //回搜尋頁面
        $scope.showSearch = function () {
            $scope.dataSource.pageStatus = 'searchView';
            $scope.dataSource.parentInfo = { agentParent: {}, level: 1, agentParentMap: [] };
            $scope.dataSource.memberInfo = localStorageService.get('UserInfo');

            //SubCompany, SubAdmin
            if ($scope.dataSource.memberInfo.AgentLevelSCID === 38 || $scope.dataSource.memberInfo.AgentLevelSCID === 39) {
                var agentParentMap = $scope.dataSource.memberInfo.AgentParentMap.split('/');
                $scope.dataSource.memberInfo.UserName = agentParentMap[agentParentMap.length - 2];
                $scope.dataSource.memberInfo.MemberID = $scope.dataSource.memberInfo.AgentParentID;
                // 20210630 不確定這裡為什麼要改變當前登入者AgentLevelSCID 因會影響到disabled按鈕 故先註解
                // $scope.dataSource.memberInfo.AgentLevelSCID = $scope.dataSource.memberInfo.AgentLevelSCID === 38 ? 28 : 31;
                // $scope.dataSource.memberInfo.AgentPositionTakingTebate = 1;
            }
            $scope.search();
        };

        $scope.$on('showSearch', $scope.showSearch);

        //顯示新增頁
        $scope.showAdd = function () {
            $scope.dataSource.pageStatus = 'addView';

            // 新增會員 列出登入帳號可建立的等級列表
            var uplineLevel = $scope.dataSource.agentLevelDropDown.filter(p => p.ID === $scope.dataSource.memberInfo.AgentLevelSCID)[0].ConfigValues;
            $scope.dataSource.showAgentLevelDropDown = $scope.dataSource.agentLevelDropDown.filter(p => 
                p.ConfigValues > parseInt(uplineLevel) && p.ConfigValues <= (parseInt(uplineLevel) + 1) && 
                p.ID !== 38 && p.ID !== 39 // 20210724 subCompany跟subAdmin要在subAdminManage裡面建立
            );
            // $scope.dataSource.showAgentLevelDropDown = $scope.dataSource.agentLevelDropDown.filter(p => p.ConfigValues > parseInt(uplineLevel) && p.ConfigValues <= (parseInt(uplineLevel) + 1));
            $scope.dataSource.showAgentLevelDropDown.unshift({ ID: -1, ConfigName: 'Please Choose' });

            //預設代理人為建立者
            $scope.dataSource.parentInfo.agentParent = $scope.dataSource.memberInfo;
            $scope.dataSource.status = $scope.dataSource.memberInfo.AgentLevelValue;
            $scope.dataSource.parentInfo.level = $scope.dataSource.status;

            $scope.dataSource.selMemberInfo = {};

            var agentParentMap = '';

            if ($scope.dataSource.parentInfo.agentParent.AgentParentMap) agentParentMap = $scope.dataSource.parentInfo.agentParent.AgentParentMap + $scope.dataSource.parentInfo.agentParent.UserName + '/';
            else agentParentMap = $scope.dataSource.parentInfo.agentParent.UserName;

            $scope.dataSource.selMemberInfo.AgentParentMap = agentParentMap;
            $scope.dataSource.selMemberInfo.AgentParentName = $scope.dataSource.parentInfo.agentParent.UserName;
            $scope.dataSource.selMemberInfo.AgentParentID = $scope.dataSource.parentInfo.agentParent.MemberID;
            $scope.dataSource.selMemberInfo.UserType = -1;
            $scope.dataSource.selMemberInfo.AgentLevelSCID = 39;//$scope.dataSource.parentInfo.agentParent.AgentLevelSCID + 1;
            $scope.dataSource.selMemberInfo.ReferralPayType = -1;
            $scope.dataSource.selMemberInfo.CashRebatePayType = -1;
            $scope.dataSource.selMemberInfo.CashBackRebatePayType = -1;
            $scope.dataSource.selMemberInfo.IsEditEmail = false;
            $scope.dataSource.selMemberInfo.IsEditPhone = true;

            //帶入預設代理人之parentMap
            //$scope.dataSource.parentInfo.agentParentMap.push($scope.dataSource.parentInfo.agentParent.UserName);

            var parentMap = agentParentMap.split('/');
            parentMap.forEach(p => { if (p) $scope.dataSource.parentInfo.agentParentMap.push(p); });

            $scope.searchParent(parentMap[0], 1);
        };

        //顯示編輯頁
        $scope.showEdit = function (member) {
            $scope.dataSource.pageStatus = $scope.editType;
            $scope.dataSource.status = member.AgentLevelValue - 2;

            if (member.Birthday) member.Birthday = new Date(member.Birthday);
            if (member.ReferralPayType) member.ReferralPayType = parseInt(member.ReferralPayType);
            if (member.CashBackPayType) member.CashBackPayType = parseInt(member.CashBackPayType);
            if (member.CashRebatePayType) member.CashRebatePayType = parseInt(member.CashRebatePayType);

            $.extend($scope.dataSource.selMemberInfo, member);
            $.extend($scope.dataSource.resetInfo, $scope.dataSource.selMemberInfo);

            // 修改 會員等級只顯示當前會員的等級
            $scope.dataSource.showAgentLevelDropDown = $scope.dataSource.agentLevelDropDown.filter(p => p.ID === $scope.dataSource.selMemberInfo.AgentLevelSCID);

            var userNameSplit = (member.UserName || '').split('_');
            if (userNameSplit.length > 1) {
                $scope.dataSource.selMemberInfo.Account = userNameSplit[1];
            }

            //console.log($scope.dataSource.selMemberInfo);
            //目前map為UserName,搜尋需要ID
            //帶入預設代理人之parentMap
            var parentMap = $scope.dataSource.selMemberInfo.AgentParentMap.split('/');
            $scope.dataSource.selMemberInfo.AgentParentName = parentMap[parentMap.length - 2];
            $scope.dataSource.parentInfo.agentParent.UserName = $scope.dataSource.selMemberInfo.AgentParentName;
            $scope.dataSource.parentInfo.agentParent.MemberID = $scope.dataSource.selMemberInfo.AgentParentID;

            parentMap.forEach(function (element) {
                if (element) $scope.dataSource.parentInfo.agentParentMap.push(element);
            });

            //$scope.dataSource.parentInfo.agentParentMap.push(parentMap[0]);
            if (parentMap[0])
                $scope.searchParent(parentMap[0], 1);
            else
                $scope.searchParent('Admin', 1);

        };

        //復原修改資料
        $scope.resetInfo = function () {
            $.extend($scope.dataSource.selMemberInfo, $scope.dataSource.resetInfo);
        };

        $scope.deleteMember = function (member) {
            $scope.dataSource.selMemberInfo = member;
            ngAuthSettings.modalMsg.title = 'Confirm';
            ngAuthSettings.modalMsg.msg = 'Confirm Delete?';
            ngAuthSettings.modalMsg.type = '000';
            ngAuthSettings.modalMsg.callBack = 'confirmDel';
            $rootScope.$broadcast('changeModalMsg', true);
        };

        $scope.$on('confirmDel', function (event) {
            memberShipService.delMember($scope.dataSource.selMemberInfo)
                .then(
                    function success(response, status, headers) {
                        if (response.data.APIRes.ResCode === '000') {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            ngAuthSettings.modalMsg.callBack = 'showSearch';
                            $rootScope.$broadcast('changeModalMsg', false);
                            $scope.search();
                        }
                        else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);

                            $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                            return;
                        }
                    },
                    function error(data, status, headers) {
                    });
        });

        $scope.addMember = function (form) {
            if ($rootScope.valid(form)) return;

            if ($scope.dataSource.selMemberInfo.Pwd !== $scope.dataSource.selMemberInfo.ConfirmPwd) {
                ngAuthSettings.modalMsg.title = 'Alert';
                ngAuthSettings.modalMsg.msg = 'Password And ConfirmPassword Is Different';
                $rootScope.$broadcast('changeModalMsg', false);
                return;
            }

            var ajaxData = {};
            $.extend(ajaxData, $scope.dataSource.selMemberInfo);
            ajaxData.UserName = ngAuthSettings.platformCode + '_' + ajaxData.Account;
            // ajaxData.UserName = 'HL_' + ajaxData.Account;
            ajaxData.PlatformSettingIDs = [$scope.dataSource.platformID];

            blockUI.start();
            memberShipService.addMember(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        ngAuthSettings.modalMsg.callBack = 'showSearch';
                        $rootScope.$broadcast('changeModalMsg', false);

                        $scope.search();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg', false);

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                    }
                    blockUI.stop();
                },
                function error(response) {
                    blockUI.stop();
                });
        };

        $scope.saveMember = function (form) {
            if ($rootScope.valid(form)) return;

            memberShipService.updateUser($scope.dataSource.selMemberInfo).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        //ngAuthSettings.modalMsg.callBack = 'showSearch';

                        // 填完訊息後顯示訊息框
                        $rootScope.$broadcast('changeModalMsg', false);
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        $rootScope.$broadcast('changeModalMsg', false);
                    }
                },
                function error(response) {

                });
        };

        $scope.savePwd = function (form) {
            if ($rootScope.valid(form)) return;

            if ($scope.dataSource.changePwdObj.MemberNewPwd !== $scope.dataSource.changePwdObj.ConfirmPwd) {
                ngAuthSettings.modalMsg.title = 'Alert';
                ngAuthSettings.modalMsg.msg = 'NewPassword And ConfirmPassword Is Different';
                $rootScope.$broadcast('changeModalMsg', false);
                return;
            }

            if ($scope.dataSource.changePwdObj.MemberOldPwd === $scope.dataSource.changePwdObj.MemberNewPwd) {
                ngAuthSettings.modalMsg.title = 'Alert';
                ngAuthSettings.modalMsg.msg = 'MemberOldPwd And MemberNewPwd Can\'t Be Same';
                $rootScope.$broadcast('changeModalMsg', false);
                return;
            }

            memberShipService.changePwdMember($scope.dataSource.changePwdObj).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        ngAuthSettings.modalMsg.callBack = 'showSearch';

                        // 填完訊息後顯示訊息框
                        $rootScope.$broadcast('changeModalMsg', false);
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        $rootScope.$broadcast('changeModalMsg', false);
                    }

                },
                function error(response) {

                });
        };

        $scope.resetPwd = function () {
            if (!confirm('Confirm reset password?')) return;
            memberShipService.forgetPwd($scope.dataSource.selMemberInfo).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.authToken = response.data.AuthToken;
                        ngAuthSettings.modalMsg.title = "forget Password";
                        ngAuthSettings.modalMsg.msg = 'New password has been sent to your mail.';

                        // Put cookie
                        //localStorageService.set('UserToken', response.data.AuthToken);
                        //localStorageService.set('userInfo', response.data.Rows);

                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        authService.fillAuthData();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "forget Password";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                    }

                    // 填完訊息後顯示訊息框
                    $rootScope.$broadcast('changeModalMsg', false);
                },
                function error(response) {

                });
        };

        $scope.changeAndSave = function (member) {
            $scope.dataSource.selMemberInfo = member;
            $scope.saveMember();
        };

        $scope.showChangePassword = function (member) {
            member.isShowChangePassword = true;
            member.MemberNewPwd = '';
            member.NewPwdError = '';
            member.clickChangePwd = false;
        };

        $scope.showEyeEvent = function (member) {
            member.isShowPwd = !member.isShowPwd;
        };

        // $scope.showModifyPwdEyeEvent = function () {
        //     $scope.dataSource.isShowModifyPwd = !$scope.dataSource.isShowModifyPwd;
        // };

        $scope.showAddMemberEyeEvent = function () {
            $scope.dataSource.isShowAddMemberPwd = !$scope.dataSource.isShowAddMemberPwd;
        };

        $scope.changePassword = function (form, member) {
            member.clickChangePwd = true;
            if ($rootScope.valid(form)) return;

            var ajaxData = {
                MemberID: member.MemberID,
                UserName: member.UserName,
                MemberNewPwd: member.MemberNewPwd
            };
            memberShipService.changeGameDealerPwdMemberByBack(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        // ngAuthSettings.modalMsg.callBack = 'showSearch';

                        member.isShowChangePassword = false;
                        // 填完訊息後顯示訊息框
                        $rootScope.$broadcast('changeModalMsg', false);
                    }
                    else {
                        member.NewPwdError = response.data.APIRes.ResMessage;
                        // ngAuthSettings.modalMsg.title = "Message";
                        // ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        // ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                        // $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        // return;
                    }

                },
                function error(response) {

                });
        };


        //顯示銀行頁
        // $scope.showBank = function (member) {
        //     $scope.dataSource.selMemberInfo = member;
        //     $scope.dataSource.modalMsg.title = 'Bank';
        //     $('#ShowDetailDialog').click();
        // };

        //銀行編輯視窗
        // $scope.showBankDialog = function (bank) {
        //     if (bank) $scope.dataSource.selBank = bank;
        //     else {
        //         $scope.dataSource.selBank = {};
        //         $scope.dataSource.selBank.MemberID = $scope.dataSource.selMemberInfo.MemberID;
        //     }

        //     $('#ShowBankDialog').click();
        // };

        //$scope.addOrEditBank = function () {
        //    if ($scope.dataSource.selBank.ID) {
        //        bankService.updateBank($scope.dataSource.selBank).then(
        //            function success(response) {
        //                if (response.data.APIRes.ResCode === '000') {
        //                    ngAuthSettings.modalMsg.title = "Message";
        //                    ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
        //                    ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
        //                    $rootScope.$broadcast('changeModalMsg', false);
        //                    $scope.search();
        //                }
        //                else {
        //                    ngAuthSettings.modalMsg.title = "Message";
        //                    ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
        //                    ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
        //                    $rootScope.$broadcast('changeModalMsg', false);

        //                    $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
        //                    return;
        //                }


        //            },
        //            function error(response) {

        //            });
        //    } else {
        //        bankService.addBank($scope.dataSource.selBank).then(
        //            function success(response) {
        //                if (response.data.APIRes.ResCode === '000') {
        //                    ngAuthSettings.modalMsg.title = "Message";
        //                    ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
        //                    ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
        //                    $rootScope.$broadcast('changeModalMsg', false);
        //                    $scope.search();
        //                }
        //                else {
        //                    ngAuthSettings.modalMsg.title = "Message";
        //                    ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
        //                    ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
        //                    $rootScope.$broadcast('changeModalMsg', false);

        //                    $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
        //                    return;
        //                }


        //            },
        //            function error(response) {

        //            });
        //    }
        //};

        $scope.deleteBank = function () {
            if (!confirm('Confirm刪除?')) return;

            bankService.delBank($scope.dataSource.selBank).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg', false);
                        $scope.search();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg', false);

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        return;
                    }


                },
                function error(response) {

                });
        };

        // $scope.showWallet = function (member) {
        //     $scope.dataSource.selMemberInfo = member;
        //     $scope.dataSource.modalMsg.title = 'Wallet';
        //     $('#ShowDetailDialog').click();
        // };

        $scope.showTransaction = function () {
            $scope.dataSource.pageStatus = 'transactionView';
            $scope.dataSource.PagerObj2.CurrentPage = 1;
            $scope.dataSource.PagerObj2.PageSize = 10;

            $scope.dataSource.searchCondition.CurrentPage = $scope.dataSource.PagerObj2.CurrentPage;
            $scope.dataSource.searchCondition.PageSize = $scope.dataSource.PagerObj2.PageSize;
            $scope.dataSource.searchCondition.MemberID = $scope.dataSource.selMemberInfo.MemberID;

            transactionsService.findTransactionsHistory($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers) {
                        if (response.data.APIRes.ResCode === '000') {
                            console.log(response.data.Rows.ListData);
                            $scope.dataSource.transactionData = response.data.Rows.ListData;

                            //$scope.dataSource.transactionData.forEach(p => {
                            //    p.Status = $scope.dataSource.transactionTypeDropDown.filter(q => q.ID === parseInt(p.TransacitonsTypeSCID))[0].ConfigName;
                            //});
                            
                            //頁籤
                            $scope.dataSource.PagerObj2 = response.data.Rows.PagerObj;
                            $scope.dataSource.PagerObj2["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                            $scope.dataSource.PagerObj2["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                            $scope.dataSource.PagerObj2["PageArray"] = [];
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg', false);
                        }
                    },
                    function error(data, status, headers) {
                    });
        };

        // 查詢今日投注
        $scope.showStatement = function () {
            $scope.dataSource.pageStatus = 'statementView';

            var ajaxData = {
                'CurrentPage': $scope.dataSource.PagerObj3.CurrentPage,
                'PageSize': $scope.dataSource.PagerObj3.PageSize,
                'LotteryType': $scope.dataSource.searchCondition.LotteryType,
                'DateS': $scope.dataSource.searchCondition.DateS,
                'DateE': $scope.dataSource.searchCondition.DateE,
                'Status': $scope.dataSource.searchCondition.Status,
                'MemberID': $scope.dataSource.selMemberInfo.MemberID
            };

            statementService.findStatement(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.statementData = response.data.Rows.ListData;
                        //頁籤
                        $scope.dataSource.PagerObj3 = response.data.Rows.PagerObj;
                        $scope.dataSource.PagerObj3["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                        $scope.dataSource.PagerObj3["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                        $scope.dataSource.PagerObj3["PageArray"] = [];
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Error";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.Msg;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        // 填完訊息後顯示訊息框
                        ngAuthSettings.modalMsg.callBack = "";
                        $rootScope.$broadcast('changeModalMsg');
                    }
                    blockUI.stop();
                },
                function error(response) { blockUI.stop(); }
            );
        };

        $scope.showDetail = function (statement, status) {
            //mPlayer.ResultList = mPlayer.Result.split(',');
            $scope.dataSource.selStatement = statement;
        };

        // 訊息框處理事件
        $scope.confirmAgent = function () {
            //alert($scope.dataSource.selMemberInfo.AgentLevelSCID + ',' + $scope.dataSource.parentInfo.agentParentMap.length);
            //alert(JSON.stringify($scope.dataSource.parentInfo.agentParentMap))
            var msg = '';
            switch ($scope.dataSource.selMemberInfo.AgentLevelSCID) {
                case 30:
                    if ($scope.dataSource.parentInfo.agentParentMap.length !== 2) msg = 'Please Choose Agent SM.';
                    break;
                case 31:
                    if ($scope.dataSource.parentInfo.agentParentMap.length !== 3) msg = 'Please Choose Agent M.';
                    break;
                case 32:
                    if ($scope.dataSource.parentInfo.agentParentMap.length !== 4) msg = 'Please Choose Agent AG.';
                    break;
            }
            if (msg) {
                ngAuthSettings.modalMsg.title = "Msg";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }
            //alert(JSON.stringify($scope.dataSource.parentInfo.agentParent))
            $scope.dataSource.selMemberInfo.AgentParentName = $scope.dataSource.parentInfo.agentParent.UserName;
            $scope.dataSource.selMemberInfo.AgentParentID = $scope.dataSource.parentInfo.agentParent.MemberID;
            $scope.dataSource.selMemberInfo.AgentParentMap = $scope.dataSource.parentInfo.agentParentMap.join('/') + '/';
            //$scope.dataSource.selMemberInfo.ReferralLink = ngAuthSettings.referralLinkDomain + $scope.dataSource.parentInfo.referralLink.join('/');
        };

        //換頁
        $scope.PageChanged = function (page) {
            $scope.dataSource.PagerObj.CurrentPage = page;
            $scope.search();
        };

        //換頁
        $scope.PageChanged2 = function (page) {
            $scope.dataSource.PagerObj2.CurrentPage = page;
            $scope.showTransaction();
        };

        //換頁
        $scope.PageChanged3 = function (page) {
            $scope.dataSource.PagerObj3.CurrentPage = page;
            $scope.showStatement();
        };

    }]);