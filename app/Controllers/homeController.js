'use strict';
app.controller('homeController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'memberShipService',
    'depositService',
    'promotionSettingsService',
    'cbrsService',
    'mplayerService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
        memberShipService, depositService, promotionSettingsService, cbrsService, mplayerService) {
        blockUI.start();

        var date = new Date();

        $scope.dataSource = {
            menuList: [
                //{ text: "人事系統", items: [{ text: "請假單新增", url: "http://localhost/HRS.API/APITest.html" }] },
            ],
            searchCondition: { CurrentPage: 1, PageSize: 9999999, DateS: new Date(date.setMonth(date.getMonth() - 6)), DateE: new Date() },
            arrMonth: [],
            arrMonthIdx: [],
            arrGames: ['GPRacing', '2DNumberGame', 'HKLotto', 'Sicbo', '4DLotto'],
            memberListData: [],
            depositListData: [],
            mPromotionListData: [],
            cbrsListData: [],
            mPlayListData: []
        };

        $scope.querySubmit = function () {
            console.log($scope.chooseUrl);
        };

        $scope.init = function () {
            ngAuthSettings.modalMsg.linkTo = "";

            //$scope.getData();
            blockUI.stop();
        };

        $scope.getData = function () {
            var callStatus = true;

            var memberAjax = memberShipService.findUser($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.memberListData = response.data.Rows.ListData;
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        }
                    },
                    function error(data, status, headers) {
                        callStatus = false;
                    });

            var depositAjax = depositService.findDepositHistory($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.depositListData = response.data.Rows.ListData;
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        }
                    },
                    function error(data, status, headers) {
                        callStatus = false;
                    });

            var promotionAjax = promotionSettingsService.findVwMPromotions($scope.dataSource.searchCondition).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.mPromotionListData = response.data.Rows.ListData;
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Message";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                    }
                },
                function error(response) {
                    callStatus = false;
                });

            var cbrsAjax = cbrsService.findCBRReport($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers, config) {
                        //alert(JSON.stringify(response.data.Rows.ListData));
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.cbrsListData = response.data.Rows;
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        }
                    },
                    function error(data, status, headers, config) {
                        callStatus = false;
                    });

            var mplayerAjax = mplayerService.findAllVwMPlayer($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.mPlayListData = response.data.Rows.ListData;
                            //console.log($scope.dataSource.mPlayListData);
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        }
                    },
                    function error(data, status, headers, config) {
                        callStatus = false;
                    });

            Promise.all([memberAjax, depositAjax, promotionAjax, cbrsAjax, mplayerAjax])
                .then(() => {
                    if (callStatus) $scope.initChart();
                    else $rootScope.$broadcast('changeModalMsg');
                });

        };

        $scope.initChart = function () {
            var defaultMonth = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
            var month = new Date().getMonth();
            for (var i = month - 5; i <= month; i++) {
                if (i >= 0) {
                    $scope.dataSource.arrMonth.push(defaultMonth[i]);
                    $scope.dataSource.arrMonthIdx.push(i);
                }
                else {
                    $scope.dataSource.arrMonth.push(defaultMonth[i + 12]);
                    $scope.dataSource.arrMonthIdx.push(i + 12);
                }
            }

            $scope.registerChart();
            $scope.promotionChart();
            $scope.cashRebateChart();
            $scope.allGameWinLoseChart();
        };

        $scope.registerChart = function () {
            var memberData = [];
            var depositData = [];
            //var memberData = [100,240,300,250,150,220];
            //var depositData = [70, 140, 100, 90, 120, 120];

            $scope.dataSource.arrMonthIdx.forEach(p => {
                memberData.push($scope.dataSource.memberListData.filter(q => new Date(q.CreateDate).getMonth() === p).length);
                depositData.push($scope.dataSource.depositListData.filter(q => new Date(q.CreateDate).getMonth() === p).length);
            });

            var registerChart = echarts.init(document.getElementById('registerChart'));
            registerChart.setOption(genBarOption('Register vs Deposit', $scope.dataSource.arrMonth,
                [
                    { title: 'Register', data: memberData, color: '#095971' },
                    { title: 'Deposit', data: depositData, color: '#71CFE0' }
                ]));
        };

        $scope.promotionChart = function () {
            //var depositData = [500000, 520000, 330000, 334000, 390000, 300030];
            //var promotionData = [50000, 10000, 30000, 40000, 10000, 18000];
            var depositData = [];
            var promotionData = [];

            $scope.dataSource.arrMonthIdx.forEach(p => {
                depositData.push($scope.dataSource.depositListData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce((a, c) => a + parseFloat(c.Amount), 0));
                promotionData.push($scope.dataSource.mPromotionListData.filter(q => new Date(q.JoinDate).getMonth() === p).reduce((a, c) => a + parseFloat(c.BonusAmount), 0));
            });

            var promotionChart = echarts.init(document.getElementById('promotionChart'));
            promotionChart.setOption(genLineBarOption('Promotion vs Deposit', $scope.dataSource.arrMonth,
                [
                    { title: 'Percent', type: 'line', yIndex: 0, data: depositData.map((p, i) => { return (promotionData[i] / p * 100).toFixed(2); }), color: '#E84855' },
                    { title: 'Deposit', type: 'bar', yIndex: 1, data: depositData, color: '#095971' },
                    { title: 'Promotion', type: 'bar', yIndex: 1, data: promotionData, color: '#71CFE0' }
                ]));
        };

        $scope.cashRebateChart = function () {
            //var cashRebateData = [40000, 44000, 20000, 50000, 44000, 40030];
            //var cashBackData = [30000, 44000, 28000, 50000, 44000, 40030];
            //var incomeData = [800000, 700000, 900000, 400000, 800000, 690000];

            var cashRebateData = [];
            var cashBackData = [];
            var incomeData = [];

            $scope.dataSource.arrMonthIdx.forEach(p => {
                cashRebateData.push($scope.dataSource.cbrsListData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce(function (a, c) {
                    var cashRebate = parseFloat(c.CashRebate);
                    return cashRebate > 0 ? a + cashRebate : a;
                }, 0));
                cashBackData.push($scope.dataSource.cbrsListData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce(function (a, c) {
                    var cashRebate = parseFloat(c.CashBack);
                    return cashRebate > 0 ? a + cashRebate : a;
                }, 0));
                incomeData.push($scope.dataSource.cbrsListData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce((a, c) => a + parseFloat(-c.RecordMoney), 0));
            });

            var cashRebateChart = echarts.init(document.getElementById('cashRebateChart'));
            cashRebateChart.setOption(genCashRebateOption('CashRebate vs Income', $scope.dataSource.arrMonth,
                [
                    //{ title: 'Percent', type: 'line', yIndex: 0, data: incomeData.map((p, i) => { return (cashRebateData[i] / p * 100).toFixed(2); }), color: '#E84855' },
                    { title: 'Income', type: 'bar', yIndex: 1, data: incomeData, color: '#095971' },
                    { title: 'CashRebate', type: 'bar', yIndex: 1, data: cashRebateData, color: '#71CFE0' },
                    { title: 'CashBack', type: 'bar', yIndex: 1, data: cashBackData, color: '#AA7700' }
                ]));
        };

        $scope.allGameWinLoseChart = function () {

            //var allTurnOverData = [10000000, 5200000, 2000000, 1500000, 2500000];
            //var allWinData = [1000000, 520000, 200000, 150000, 250000];
            //var allLoseData = [500000, 100000, 300000, 400000, 100000];

            var allTurnOverData = [];
            var allWinData = [];
            var allLoseData = [];

            for (var i = 1; i < 6; i++) {
                allTurnOverData.push($scope.dataSource.mPlayListData.filter(p => p.LotteryClassID === i).reduce((a, c) => a + parseFloat(c.Price), 0));
                allWinData.push($scope.dataSource.mPlayListData.filter(p => p.LotteryClassID === i).reduce(function (a, c) {
                    var price = parseFloat(c.WinMoney);
                    return c.IsWin ? a + price : a;
                }, 0));
                allLoseData.push($scope.dataSource.mPlayListData.filter(p => p.LotteryClassID === i).reduce(function (a, c) {
                    var price = parseFloat(c.Price);
                    return !c.IsWin ? a + price : a;
                }, 0));
            }

            var allGameWinLoseChart = echarts.init(document.getElementById('allGameWinLoseChart'));
            allGameWinLoseChart.setOption(genCashRebateOption('Win/Lose By Game Category', $scope.dataSource.arrGames,
                [
                    { title: 'T/Over', type: 'bar', yIndex: 1, data: allTurnOverData, color: '#AA7700' },
                    { title: 'Win', type: 'bar', yIndex: 1, data: allWinData, color: '#095971' },
                    { title: 'Lose', type: 'bar', yIndex: 1, data: allLoseData, color: '#71CFE0' }
                ]));
            allGameWinLoseChart.on('click', function (params) {
                // printing data name in console
                $scope.oneGameWinLoseChart(params);
            });
        };

        $scope.oneGameWinLoseChart = function (params) {
            //var oneTurnOverData = [400000, 520000, 600000, 850000, 650000, 800000];
            //var oneWinData = [40000, 52000, 60000, 85000, 65000, 80000];
            //var oneLoseData = [50000, 10000, 30000, 40000, 10000, 60000];
            var oneTurnOverData = [];
            var oneWinData = [];
            var oneLoseData = [];

            var gameData = $scope.dataSource.mPlayListData.filter(p => p.LotteryClassID === (params.dataIndex + 1));

            $scope.dataSource.arrMonthIdx.forEach(p => {
                oneTurnOverData.push(gameData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce((a, c) => a + parseFloat(c.Price), 0));
                oneWinData.push(gameData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce(function (a, c) {
                    var price = parseFloat(c.WinMoney);
                    return c.IsWin ? a + price : a;
                }, 0));
                oneLoseData.push(gameData.filter(q => new Date(q.CreateDate).getMonth() === p).reduce(function (a, c) {
                    var price = parseFloat(c.Price);
                    return !c.IsWin ? a + price : a;
                }, 0));
            });

            var oneGameWinLoseChart = echarts.init(document.getElementById('oneGameWinLoseChart'));
            oneGameWinLoseChart.setOption(genCashRebateOption(params.name + ' By Six Month', $scope.dataSource.arrMonth,
                [
                    { title: 'T/Over', type: 'bar', yIndex: 1, data: oneTurnOverData, color: '#AA7700' },
                    { title: 'Win', type: 'bar', yIndex: 1, data: oneWinData, color: '#095971' },
                    { title: 'Lose', type: 'bar', yIndex: 1, data: oneLoseData, color: '#71CFE0' }
                ]));
        };

        $timeout($scope.init, 300);
    }]);