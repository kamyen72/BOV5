'use strict';
app.controller('manualOpenLotteryController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'lotteryService',
    'gameRoomService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
        lotteryService, gameRoomService) {

        $scope.dataSource = {
            searchCondition: { CurrentPage: 1, PageSize: 10, LotteryTypeID: -1 },
            pageStatus: 'officialPeriodView',
            selLotterys: [],
            openData: {},
            openedLotterys: [],
            resetData: {
                LotteryTypeData: null,
                oLottery: null,
                NewResult: null
            },
            manualOLotterys: [],
            selOLotterys: [],
            selLotteryTypeList: [],
            EditPassword: {
                isShow: true,
                type: null,
                Pwd: null,
                ConfirmPwd: null
            },
            callBack: null,
            parameter: {},
            fourDRtpResult: [],
            isLoading: false
        };

        $scope.init = function () {
            $scope.dataSource.memberInfo = localStorageService.get('UserInfo');
            if($scope.dataSource.memberInfo.AgentLevelSCID === 31) $scope.dataSource.searchCondition.IsAgentGame = true;
            
            $scope.searchGameRoomType();
            $scope.changePageToManualView();
            $scope.dateSearch(-4, 0);
        };

        $timeout($scope.init, 100);

        $scope.updateEditPassword = function (form) {
            if ($rootScope.valid(form) || !$scope.dataSource.EditPassword.type) return;

            $scope.checkGamePwd();
        };

        $scope.checkPwd = function (callBack, parameter) {
            //$scope.dataSource.parameter = parameter !== undefined ? parameter : {};
            //$scope.dataSource.callBack = callBack;

            //if ($scope.dataSource.EditPassword.isShow) {
            //    $scope.dataSource.EditPassword.type = 'GameRoom';
            //    $scope.dataSource.EditPassword.Pwd = null;
            //    $scope.dataSource.EditPassword.ConfirmPwd = null;
            //    $('#ShowPasswordDialog').click();
            //}

            if (parameter === 'open' || parameter === 'reset') {
                if (!confirm('Confirm to ' + parameter + ' lottery?')) return;
            }

            //老闆說不需要密碼檢驗
            callBack(parameter);
        };

        $scope.checkGamePwd = function () {
            $scope.dataSource.openData.GamePwd = $scope.dataSource.EditPassword.Pwd;

            lotteryService.checkGamePwd($scope.dataSource.openData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.callBack($scope.dataSource.parameter);
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        return;
                    }
                },
                function error(response) {
                    console.log(response);
                });
        };

        $scope.openDialog = function (olottery) {
            $scope.dataSource.openData.oLottery = olottery;
            // $scope.dataSource.openData.oLottery.UserWinPercentage = '0.90';
            $('#ShowOpenLottery').click();
        };

        $scope.open = function () {
            var msg = "";
            $scope.dataSource.openData.InputResult = $scope.dataSource.openData.InputResult1;

            if ($scope.dataSource.openData.InputResult1 && $scope.dataSource.openData.InputResult2 && $scope.dataSource.openData.InputResult3) {
                $scope.dataSource.openData.InputResult = $scope.dataSource.openData.InputResult3
                    + ',' + $scope.dataSource.openData.InputResult2
                    + ',' + $scope.dataSource.openData.InputResult1;
            }

            if (!$scope.dataSource.openData.InputResult || !$scope.dataSource.openData.oLottery || !$scope.dataSource.openData.oLottery.CurrentPeriod) {
                msg += 'Confirm all data is entered';

                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.openData.InputResult3 && (`${$scope.dataSource.openData.InputResult3}`.trim().length !== 4 || !Number($scope.dataSource.openData.InputResult3))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.openData.InputResult2 && (`${$scope.dataSource.openData.InputResult2}`.trim().length !== 4 || !Number($scope.dataSource.openData.InputResult2))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.openData.InputResult1 && (`${$scope.dataSource.openData.InputResult1}`.trim().length !== 4 || !Number($scope.dataSource.openData.InputResult1))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            let ajaxData = {
                InputResult: $scope.dataSource.openData.InputResult,
                CurrentPeriod: $scope.dataSource.openData.oLottery.CurrentPeriod,
                LotteryTypeID: $scope.dataSource.openData.oLottery.LotteryTypeID,
                GamePwd: $scope.dataSource.openData.GamePwd
            };

            blockUI.start();
            lotteryService.manualOpenLottery(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');

                        blockUI.stop();
                        $scope.dataSource.openData = {};
                        //$scope.changePageToManualView();
                        $scope.searchManualOLottery();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        blockUI.stop();
                        return;
                    }
                },
                function error(response) {
                    console.log(response);
                    blockUI.stop();
                });
        };

        $scope.searchGameRoomType = function () {
            blockUI.start();
            gameRoomService.find({})
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.gameRoomTypeListData = response.data.Rows;
                            //頁籤
                            $scope.dataSource.PagerObj = response.data.Rows.PagerObj;

                            $scope.dataSource.EditPassword.isShow = !!$scope.dataSource.gameRoomTypeListData[0].GamePwd;
                            blockUI.stop();
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                            $rootScope.$broadcast('changeModalMsg');
                            blockUI.stop();
                        }
                    },
                    function error(response) {
                        console.log(response);
                        blockUI.stop();
                    });
        };

        $scope.dateSearch = function (dayS, dayE) {
            var nowDate = new Date();
            var dateS = new Date(Number(nowDate));
            dateS.setDate(nowDate.getDate() + dayS);
            var dateE = new Date(Number(nowDate));
            dateE.setDate(nowDate.getDate() + dayE);

            $scope.dataSource.searchCondition.DateS = dateS;
            $scope.dataSource.searchCondition.DateE = dateE;
            $scope.searchManualOLottery();
        };

        $scope.searchManualOLottery = function () {
            blockUI.start();

            lotteryService.findLotteryTypeByOfficial($scope.dataSource.searchCondition).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.manualOLotterys = [];
                        $scope.dataSource.selLotteryTypeList = [];
                        // 20210720 展開資料
                        response.data.Rows.forEach(item => {
                            $scope.dataSource.selLotteryTypeList.push({
                                LotteryTypeName: item.LotteryTypeName,
                                LotteryTypeID: item.LotteryTypeID
                            });
                            item.OLotteries.forEach(oLottery => {
                                oLottery.IsAgentGame = item.IsAgentGame;
                                
                                $scope.dataSource.manualOLotterys.push({
                                    LotteryTypeName: item.LotteryTypeName,
                                    LotteryTypeID: item.LotteryTypeID,
                                    ID: oLottery.ID,
                                    CurrentPeriod: oLottery.CurrentPeriod,
                                    CurrentLotteryTime: new Date(oLottery.CurrentLotteryTime),
                                    DrawLotteryTime: new Date(oLottery.CloseTime).setSeconds((new Date(oLottery.CloseTime)).getSeconds() + 30),
                                    CloseTime: new Date(oLottery.CloseTime),
                                    IsAgentGame: item.IsAgentGame,
                                    Result: oLottery.Result,
                                    ResultList: !oLottery.Result ? '' : oLottery.Result.split(','),
                                    CanSetResult: new Date(oLottery.CloseTime) < new Date() && !oLottery.Result
                                });
                            });
                        });

                        $scope.dataSource.officialPeriod = $scope.dataSource.selLotteryTypeList[0];
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
                    console.log(response);
                    blockUI.stop();
                });
        };

        // $scope.getSelLotterys = function (LotteryTypeID) {
        //     $scope.dataSource.selOLotterys = $scope.dataSource.manualOLotterys.filter(p => p.LotteryTypeID === LotteryTypeID); 
        //     $scope.dataSource.openData.CurrentPeriod = null;
        // };

        $scope.showOfficialPeriod = function (oLottery) {
            if (oLottery) {
                $scope.dataSource.officialPeriod = oLottery;
            } else {
                $scope.dataSource.officialPeriod = {};
            }

            $('#ShowOffificalPeriod').click();
        };

        $scope.confirmOfficialPeriod = function (form, officialPeriod) {
            if ($rootScope.valid(form)) return;

            officialPeriod.CurrentLotteryTime = formatDate(officialPeriod.CurrentLotteryTime, true);
            officialPeriod.CloseTime = formatDate(officialPeriod.CloseTime, true);

            if (officialPeriod.ID > 0) {
                lotteryService.updateOLottery(officialPeriod).then(
                    function success(response) {
                        if (response.data.APIRes.ResCode === '000') {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg');
                            $scope.searchManualOLottery();
                        }
                        else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg');

                            $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                            return;
                        }
                    },
                    function error(response) {
                        console.log(response);
                    });
            } else {
                lotteryService.addOLottery(officialPeriod).then(
                    function success(response) {
                        if (response.data.APIRes.ResCode === '000') {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg');
                            $scope.searchManualOLottery();
                        }
                        else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg');

                            $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                            return;
                        }
                    },
                    function error(response) {
                        console.log(response);
                    });
            }

        };

        $scope.deleteOfficialPeriod = function (officialPeriod) {
            lotteryService.deleteOLottery(officialPeriod).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        $scope.searchManualOLottery();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
                        return;
                    }
                },
                function error(response) {
                    console.log(response);
                });
        };

        $scope.changePageToManualView = function () {
            //$scope.dataSource.pageStatus = 'manualView';
            $scope.dataSource.pageStatus = 'officialPeriodView';

            blockUI.start();
            lotteryService.findLotteryTypeByOfficial({ IsAgentGame: true }).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        let ListData = response.data.Rows;
                        $scope.dataSource.selLotterys = ListData;
                        //$scope.dataSource.openData.LotteryTypeData = $scope.dataSource.selLotterys[0];
                        $scope.dataSource.selLotterys.unshift({ LotteryTypeID: -1, LotteryTypeName: 'All' });
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
                    console.log(response);
                    blockUI.stop();
                });
        };

        $scope.changePageToResetView = function () {
            $scope.dataSource.pageStatus = 'resetView';

            blockUI.start();
            lotteryService.findLotteryTypeByOfficial({ IsAgentGame: true }).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        let ListData = response.data.Rows.ListData;
                        $scope.dataSource.openedLotterys = ListData; // .filter(lottery => lottery.LotteryClassID === 5);
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
                    console.log(response);
                    blockUI.stop();
                });
        };

        $scope.reset = function () {
            var msg = "";

            $scope.dataSource.resetData.NewResult = $scope.dataSource.resetData.NewResult1;

            if ($scope.dataSource.resetData.NewResult1 && $scope.dataSource.resetData.NewResult2 && $scope.dataSource.resetData.NewResult3) {
                $scope.dataSource.resetData.NewResult = $scope.dataSource.resetData.NewResult3
                    + ',' + $scope.dataSource.resetData.NewResult2
                    + ',' + $scope.dataSource.resetData.NewResult1;
            }

            if (!$scope.dataSource.resetData.NewResult || !$scope.dataSource.resetData.oLottery || !$scope.dataSource.resetData.oLottery.CurrentPeriod
                || !$scope.dataSource.resetData.LotteryTypeData || !$scope.dataSource.resetData.LotteryTypeData.LotteryTypeID) {
                msg += 'Confirm all data is entered';

                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.resetData.NewResult3 && (`${$scope.dataSource.resetData.NewResult3}`.trim().length !== 4 || !Number($scope.dataSource.resetData.NewResult3))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.resetData.NewResult2 && (`${$scope.dataSource.resetData.NewResult2}`.trim().length !== 4 || !Number($scope.dataSource.resetData.NewResult2))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            if ($scope.dataSource.resetData.NewResult1 && (`${$scope.dataSource.resetData.NewResult1}`.trim().length !== 4 || !Number($scope.dataSource.resetData.NewResult1))) {
                msg += 'wrong format. follow example : 1234';
                ngAuthSettings.modalMsg.title = "Message";
                ngAuthSettings.modalMsg.msg = msg;
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            let ajaxData = {
                NewResult: $scope.dataSource.resetData.NewResult,
                CurrentPeriod: $scope.dataSource.resetData.oLottery.CurrentPeriod,
                LotteryTypeID: $scope.dataSource.resetData.LotteryTypeData.LotteryTypeID
            };


            lotteryService.manualResetOLottery(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');

                        $scope.dataSource.resetData.NewResult = '';
                        $scope.changePageToResetView();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        return;
                    }
                },
                function error(response) {
                    console.log(response);
                });
        };

        $scope.get4DRtpResult = function (olottery) {
            
            if(!$scope.dataSource.openData.oLottery.UserWinPercentage){
                ngAuthSettings.modalMsg.title = "Error";
                ngAuthSettings.modalMsg.msg = "Please set user win percentage first.";
                $rootScope.$broadcast('changeModalMsg');
                return;
            }

            $scope.dataSource.isLoading = true

            lotteryService.get4DRrpResult(olottery).then(
                function success(response) {
                    $scope.dataSource.isLoading = false
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.fourDRtpResult = response.data.Rows.ListData;
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        return;
                    }
                },
                function error(response) {
                    $scope.dataSource.isLoading = false
                    console.log(response);
                });
        };
    }]);