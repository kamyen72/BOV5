'use strict';
app.controller('outstandingReportController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'lotteryService',
    'mplayerService',
    'memberShipService',
    function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
        lotteryService, mplayerService, memberShipService) {
        //blockUI.start();

        var nowDate = new Date();
        var dateS = new Date(Number(nowDate));
        dateS.setDate(nowDate.getDate() - 2);

        $scope.dataSource = {
            pageStatus: '4D',
            searchCondition: { CurrentPage: 1, PageSize: 1000000, DateS: dateS, DateE: new Date() },
            memberInfo: {},
            tableNameList: [],
            positionTakingListData: [],
            positionTakingMaps: [],
            fileName: '',
            listData_4D: [],
            listData_3D: [],
            listData_2D: [],
            listData_colokBebas: [],
            listData_colokBebas2D: [],
            listData_colokNaga: [],
            listData_colokJitu: [],
            listData_tengah: [],
            listData_dasar: [],
            listData_5050: [],
            listData_50502D: [],
            listData_shio: [],
            listData_silang: [],
            listData_kembang: [],
            listData_kombinasi: [],
            listData_kombinasi_1st2nd: [
                { type: '_', text: '', rows: [] },
                {
                    type: 'Big_1st', text: 'TA', rows: [{ type: 'Title', text: '', value: 'Big_2nd' }, { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 }, { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Small_1st', text: 'HSIAO', rows: [{ type: 'Title', text: '', value: 'Small_2nd' }, { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 }, { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Odd_1st', text: 'TAN', rows: [{ type: 'Title', text: '', value: 'Odd_2nd' }, { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 }, { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Even_1st', text: 'SHUANG', rows: [{ type: 'Title', text: '', value: 'Even_2nd' }, { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 }, { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                }
            ],
            listData_kombinasi_3rd4th: [
                { type: '_', rows: [] },
                {
                    type: 'Big_3rd', text: 'TA', rows: [
                        { type: 'Title', text: '', value: 'Big_4th' },
                        { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 },
                        { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Small_3rd', text: 'HSIAO', rows: [
                        { type: 'Title', text: '', value: 'Small_4th' },
                        { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 },
                        { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Odd_3rd', text: 'TAN', rows: [
                        { type: 'Title', text: '', value: 'Odd_4th' },
                        { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 },
                        { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Even_3rd', text: 'SHUANG', rows: [
                        { type: 'Title', text: '', value: 'Even_4th' },
                        { type: 'Big', text: 'TA', value: 0, positionTaking: 0 }, { type: 'Small', text: 'HSIAO', value: 0, positionTaking: 0 },
                        { type: 'Odd', text: 'TAN', value: 0, positionTaking: 0 }, { type: 'Even', text: 'SHUANG', value: 0, positionTaking: 0 }]
                }
            ],
            listData_kombinasi_combination: [
                { type: '_', text: '', rows: [] },
                {
                    type: 'Big_1st', text: 'TA_3rd', rows: [
                        { type: 'Title', text: '', value: 'Big_3rd' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Small_1st', text: 'HSIAO_3rd', rows: [
                        { type: 'Title', text: '', value: 'Small_3rd' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Odd_1st', text: 'TAN_3rd', rows: [
                        { type: 'Title', text: '', value: 'Odd_3rd' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Even_1st', text: 'SHUANG_3rd', rows: [
                        { type: 'Title', text: '', value: 'Even_3rd' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Big_2nd', text: 'TA_4th', rows: [
                        { type: 'Title', text: '', value: 'Big_4th' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Small_2nd', text: 'HSIAO_4th', rows: [
                        { type: 'Title', text: '', value: 'Small_4th' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Odd_2nd', text: 'TAN_4th', rows: [
                        { type: 'Title', text: '', value: 'Odd_4th' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                },
                {
                    type: 'Even_2nd', text: 'SHUANG_4th', rows: [
                        { type: 'Title', text: '', value: 'Even_4th' },
                        { type: 'Big_1st', text: 'TA_1st', value: 0, positionTaking: 0 }, { type: 'Small_1st', text: 'HSIAO_1st', value: 0, positionTaking: 0 }, { type: 'Odd_1st', text: 'TAN_1st', value: 0, positionTaking: 0 }, { type: 'Even_1st', text: 'SHUANG_1st', value: 0, positionTaking: 0 },
                        { type: 'Big_2nd', text: 'TA_2nd', value: 0, positionTaking: 0 }, { type: 'Small_2nd', text: 'HSIAO_2nd', value: 0, positionTaking: 0 }, { type: 'Odd_2nd', text: 'TAN_2nd', value: 0, positionTaking: 0 }, { type: 'Even_2nd', text: 'SHUANG_2nd', value: 0, positionTaking: 0 }]
                }
            ],
            allShowListData: [],
            showListData: [],
            betListData: [],
            selLotteryTypeList: [],
            lotteryInfoListData: [],
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

        $timeout(function () { $scope.init(); }, 100);

        $scope.init = function () {
            $scope.dataSource.memberInfo = localStorageService.get('UserInfo');
            $scope.initData();
            $scope.searchLotteryType();
            $scope.searchPositionTakingMap();
        };


        $scope.initData = function () {
            //var tenIdx = 1;

            //var tenList_4D = [];
            //var tenList_3D = [];
            //var tenList_2D = [];

            var i = 0;
            //for (i = 0; i < 10000; i++) {
            //    tenList_4D.push({ key: i.toString().padStart(4, 0), value: 0 });
            //    if (i < 1000) { tenList_3D.push({ key: i.toString().padStart(3, 0), value: 0 }); }
            //    if (i < 100) { tenList_2D.push({ key: i.toString().padStart(2, 0), value: 0 }); }
            //    if (i % 10 === 9) {
            //        if (i < 1000) { $scope.dataSource.listData_3D.push({ idx: tenIdx, list: tenList_3D }); }
            //        if (i < 100) {
            //            $scope.dataSource.listData_2D.push({ idx: tenIdx, list: tenList_2D });
            //        }
            //        $scope.dataSource.listData_4D.push({ idx: tenIdx, list: tenList_4D });

            //        tenIdx++;
            //        tenList_2D = [];
            //        tenList_3D = [];
            //        tenList_4D = [];
            //    }
            //}

            //tenIdx = 1;
            //for (i = 0; i < 1000; i++) {
            //    tenList_3D.push({ key: i.toString().padStart(3, 0), value: 0 });
            //    if (i < 100) { tenList_2D.push({ key: i.toString().padStart(2, 0), value: 0 }); }
            //    if (i % 5 === 4) {
            //        if (i < 100) { $scope.dataSource.listData_colokBebas2D.push({ idx: tenIdx, list: tenList_2D }); }
            //        $scope.dataSource.listData_colokNaga.push({ idx: tenIdx, list: tenList_3D });

            //        tenIdx++;
            //        tenList_2D = [];
            //        tenList_3D = [];
            //    }
            //}

            $scope.dataSource.listData_colokBebas.push({ idx: -1, text: 'Number', value: 'Value', positionTaking: 'P.T' });
            for (i = 0; i < 10; i++) {
                $scope.dataSource.listData_colokBebas.push({ idx: i, text: i, value: 0, positionTaking: 0 });
            }

            $scope.dataSource.listData_colokJitu.push({ text: '1st', list: initArray() });
            $scope.dataSource.listData_colokJitu.push({ text: '2nd', list: initArray() });
            $scope.dataSource.listData_colokJitu.push({ text: '3rd', list: initArray() });
            $scope.dataSource.listData_colokJitu.push({ text: '4th', list: initArray() });

            //$scope.dataSource.showListData = $scope.dataSource.listData_4D.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * 10, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
            //$scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_4D.length * 10 / $scope.dataSource.PagerObj.PageSize;

            //changePagerObj({ CurrentPage: 1, PageSize: 10, TotalItems: $scope.dataSource.PagerObj.TotalItems });

        };

        function filterDrawListData(betList) {
            console.log('filterDrawListData_Start_' + new Date());

            var selectLNums = betList.map(item => item.SelectedNums.replace(/X/g, ''))
                .filter((value, index, self) => self.indexOf(value) === index).sort();
            console.log(selectLNums);
            var drawList = [];

            for (var i = 0; i < selectLNums.length; i++) {
                let result = betList.filter(b => b.SelectedNums.replace(/X/g, '') === selectLNums[i]);
                let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                if (result && result.length > 0) {
                    drawList.push({
                        idx: selectLNums[i],
                        value: result.map(item => item.TotalPending).reduce((prev, next) => prev + next),
                        LotteryInfoID: result[0].LotteryInfoID,
                        LotteryInfoIDs: lotteryInfoIDs
                    });
                }
            }
            //for (var i = 0; i < 10000; i++) {
            //    let result = betList.filter(b => parseInt(b.SelectedNums.replace(/X/g, '')) === i);
            //    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
            //    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
            //    if (result && result.length > 0) {
            //        drawList.push({
            //            idx: i, 
            //            value: result.map(item => item.TotalPending).reduce((prev, next) => prev + next),
            //            LotteryInfoID: result[0].LotteryInfoID,
            //            LotteryInfoIDs: lotteryInfoIDs
            //        });
            //    }
            //}

            console.log('filterDrawListData_End_' + new Date());
            return drawList;
        }

        function setShowListData(drawListData, showListData, padStart, rowCount) {
            console.log('setShowListData_Start_' + new Date());

            var rowList = [];
            var tenIdx = 1;
            for (var i = 0; i < drawListData.length; i++) {
                let data = drawListData[i];
                let key = data.idx.toString().padStart(padStart, 0);
                //let positionTakingList = $scope.dataSource.positionTakingListData.filter(p =>
                //    p.SelectedNums.replace(/X/g, '') === key && p.LotteryInfoID === data.LotteryInfoID &&
                //        ngAuthSettings.apiType === 'Platform' ? (p.MemberID === $scope.dataSource.memberInfo.MemberID)
                //        : (p.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                let positionTakingList = getPositionTakingList(1, key, data.LotteryInfoIDs);
                rowList.push({
                    key: key,
                    value: data.value,
                    positionTaking: positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0,
                    LotteryInfoID: data.LotteryInfoID,
                    LotteryInfoIDs: data.LotteryInfoIDs,
                    keyValue: key
                });

                if (i % rowCount === (rowCount - 1)) {
                    showListData.push({ idx: tenIdx, list: rowList });

                    tenIdx++;
                    rowList = [];
                }
            }

            if (rowList.length > 0) {
                showListData.push({ idx: tenIdx, list: rowList });
            }

            $scope.dataSource.allShowListData = showListData.slice();

            console.log('setShowListData_End_' + new Date());
        }

        function initArray() {
            var list = [];
            for (var i = 0; i < 10; i++) {
                list.push({ idx: i, text: i, value: 0, positionTaking: 0 });
            }
            return list;
        }

        $scope.setData = function (type) {
            $scope.dataSource.showListData = [];
            $scope.dataSource.listData_colokBebas2D = [];
            $scope.dataSource.listData_colokNaga = [];
            $scope.dataSource.tableNameList = [];

            var betList = [];
            var drawList = [];

            debugger
            console.log('setData_Start_' + new Date());

            if (type === '4D' || type === '3D' || type === '2D' || type === 'ColokBebas2D' || type === 'ColokNaga'
                || type === 'Depan2D' || type === 'Tengah2D') {
                if (type === '4D') {
                    $scope.dataSource.fileName = '4D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '4D');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.showListData, 4, 10);
                }
                if (type === '3D') {
                    $scope.dataSource.fileName = '4D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '3D');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.showListData, 3, 10);
                }
                if (type === '2D') {
                    var twoDNameList = ['2D', '2D-B/S-Front', '2D-O/E-Front', '2D-B/S-Middle', '2D-O/E-Middle', '2D-B/S-Back', '2D-O/E-Back'];

                    $scope.dataSource.fileName = '4D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => twoDNameList.includes(p.LotteryInfoName));

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.showListData, 2, 10);
                }
                if (type === 'Depan2D') {
                    $scope.dataSource.fileName = '4D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName.split('_')[0] === '2D-Front');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.showListData, 2, 5);
                }
                if (type === 'Tengah2D') {
                    $scope.dataSource.fileName = '4D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName.split('_')[0] === '2D-Middle');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.showListData, 2, 5);
                }
                if (type === 'ColokBebas2D') {
                    $scope.dataSource.fileName = 'ColokBebas2D';
                    $scope.dataSource.tableNameList.push('table_4D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '4D-Two-Any');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.listData_colokBebas2D, 2, 5);
                }
                if (type === 'ColokNaga') {
                    $scope.dataSource.fileName = 'ColokBebas2D';
                    $scope.dataSource.tableNameList.push('table_ColokBebas2D');
                    betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '4D-Three-Any');

                    drawList = filterDrawListData(betList);
                    setShowListData(drawList, $scope.dataSource.listData_colokNaga, 3, 5);
                }
                //$scope.dataSource.showListData.forEach(p => {
                //    p.list.forEach(q => {
                //        var result = betList.filter(b => b.SelectedNums.replace(/X/g, '') === q.key.toString());
                //        if (result && result.length > 0) {
                //            q.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                //        }
                //    });
                //});

                //console.log($scope.dataSource.listData_colokBebas2D);

                console.log('setData_End_' + new Date());
            }

            if (type === 'ColokBebas') {
                $scope.dataSource.fileName = 'ColokBebas';
                $scope.dataSource.tableNameList.push('table_ColokBebas');
                betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '4D-One-Any');

                $scope.dataSource.listData_colokBebas.forEach(q => {
                    var result = betList.filter(b => b.SelectedNums.replace('X', '') === q.text.toString());
                    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                    if (result && result.length > 0) {
                        //let positionTakingList = $scope.dataSource.positionTakingListData.filter(p =>
                        //    p.SelectedNums.replace(/X/g, '') === q.text.toString() && p.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (p.MemberID === $scope.dataSource.memberInfo.MemberID) : (p.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                        let positionTakingList = getPositionTakingList(1, q.text.toString(), lotteryInfoIDs);

                        q.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                        q.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                        q.LotteryInfoID = result[0].LotteryInfoID;
                        q.LotteryInfoIDs = lotteryInfoIDs;
                        q.keyValue = result[0].SelectedNums.replace(/X/g, '');
                    }
                });
            }

            if (type === 'ColokJitu') {
                $scope.dataSource.fileName = 'ColokJitu';
                $scope.dataSource.tableNameList.push('table_ColokJitu');
                betList = $scope.dataSource.betListData.filter(p => p.LotteryInfoName === '4D-Position');

                $scope.dataSource.listData_colokJitu.forEach(p => {
                    p.list.forEach(q => {
                        var result = betList.filter(b => b.SelectedNums.split('_')[0] === q.text.toString() && b.SelectedNums.split('_')[1] === p.text);
                        let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                        let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                        if (result && result.length > 0) {
                            //let positionTakingList = $scope.dataSource.positionTakingListData.filter(b =>
                            //    b.SelectedNums.split('_')[0] === q.text.toString() && b.SelectedNums.split('_')[1] === p.text
                            //        && b.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (b.MemberID === $scope.dataSource.memberInfo.MemberID) : (b.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                            let positionTakingList = getPositionTakingList(3, q.text.toString(), lotteryInfoIDs, p.text);

                            q.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                            q.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                            q.LotteryInfoID = result[0].LotteryInfoID;
                            q.LotteryInfoIDs = lotteryInfoIDs;
                            q.keyValue = result[0].SelectedNums;
                        }
                    });
                });
            }

            if (type === 'Kombinasi') {
                $scope.dataSource.fileName = 'Kombinasi';
                $scope.dataSource.tableNameList.push('table_Kombinasi_1&2');
                $scope.dataSource.tableNameList.push('table_Kombinasi_3&4');
                $scope.dataSource.tableNameList.push('table_Kombinasi_combination');
                $scope.dataSource.listData_kombinasi = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Kombinasi');
                //$scope.setInfoList($scope.dataSource.listData_kombinasi);

                $scope.dataSource.listData_kombinasi.forEach(p => {
                    var betList = $scope.dataSource.betListData.filter(b => b.LotteryInfoName === p.LotteryInfoName);
                    switch (p.LotteryInfoName) {
                        case '4D-1st,2nd':
                            $scope.dataSource.listData_kombinasi_1st2nd.forEach(q => {
                                q.rows.forEach(r => {
                                    var result = betList.filter(b => b.SelectedNums.split(',')[0] === q.text.toString() && b.SelectedNums.split(',')[1] === r.text);
                                    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                                    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                                    if (result && result.length > 0) {
                                        //let positionTakingList = $scope.dataSource.positionTakingListData.filter(b =>
                                        //    b.SelectedNums.split(',')[0] === q.text.toString() && b.SelectedNums.split(',')[1] === r.text &&
                                        //        b.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (b.MemberID === $scope.dataSource.memberInfo.MemberID) : (b.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                                        let positionTakingList = getPositionTakingList(4, q.text.toString(), lotteryInfoIDs, r.text);

                                        r.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                                        r.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                                        r.LotteryInfoID = result[0].LotteryInfoID;
                                        r.LotteryInfoIDs = lotteryInfoIDs;
                                        r.keyValue = result[0].SelectedNums;
                                    }
                                });
                            });
                            break;
                        case '4D-3rd,4th':
                            $scope.dataSource.listData_kombinasi_3rd4th.forEach(q => {
                                q.rows.forEach(r => {
                                    var result = betList.filter(b => b.SelectedNums.split(',')[0] === q.text.toString() && b.SelectedNums.split(',')[1] === r.text);
                                    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                                    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                                    if (result && result.length > 0) {
                                        //let positionTakingList = $scope.dataSource.positionTakingListData.filter(b =>
                                        //    b.SelectedNums.split(',')[0] === q.text.toString() && b.SelectedNums.split(',')[1] === r.text &&
                                        //        b.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (b.MemberID === $scope.dataSource.memberInfo.MemberID) : (b.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                                        let positionTakingList = getPositionTakingList(4, q.text.toString(), lotteryInfoIDs, r.text);

                                        r.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                                        r.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                                        r.LotteryInfoID = result[0].LotteryInfoID;
                                        r.LotteryInfoIDs = lotteryInfoIDs;
                                        r.keyValue = result[0].SelectedNums;
                                    }
                                });
                            });
                            break;
                        case '4D-1st&2nd,3rd&4th':
                            $scope.dataSource.listData_kombinasi_combination.forEach(q => {
                                q.rows.forEach(r => {
                                    var result = betList.filter(b => b.SelectedNums.split(',')[0] === r.text && b.SelectedNums.split(',')[1] === q.text.toString());
                                    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                                    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                                    if (result && result.length > 0) {
                                        //let positionTakingList = $scope.dataSource.positionTakingListData.filter(b =>
                                        //    b.SelectedNums.split(',')[0] === r.text && b.SelectedNums.split(',')[1] === q.text.toString() &&
                                        //        b.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (b.MemberID === $scope.dataSource.memberInfo.MemberID) : (b.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                                        let positionTakingList = getPositionTakingList(4, r.text, lotteryInfoIDs, q.text.toString());

                                        r.value = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                                        r.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                                        r.LotteryInfoID = result[0].LotteryInfoID;
                                        r.LotteryInfoIDs = lotteryInfoIDs;
                                        r.keyValue = result[0].SelectedNums;
                                    }
                                });
                            });
                            break;
                    }
                });
            }

            if (type === 'Others') {
                $scope.dataSource.fileName = 'Others';
                $scope.dataSource.tableNameList.push('table_tengah');
                $scope.dataSource.tableNameList.push('table_dasar');
                $scope.dataSource.tableNameList.push('table_fifty_fifty');
                $scope.dataSource.tableNameList.push('table_fifty_fifty2D');
                $scope.dataSource.tableNameList.push('table_shio');
                $scope.dataSource.tableNameList.push('table_silang');
                $scope.dataSource.tableNameList.push('table_kembang');

                $scope.dataSource.listData_tengah = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Tengah');
                $scope.setInfoList($scope.dataSource.listData_tengah);

                $scope.dataSource.listData_dasar = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Dasar');
                $scope.setInfoList($scope.dataSource.listData_dasar);

                $scope.dataSource.listData_5050 = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === '50-50');
                $scope.setInfoList($scope.dataSource.listData_5050);

                $scope.dataSource.listData_50502D = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === '50-50 2D');
                $scope.setInfoList($scope.dataSource.listData_50502D);

                $scope.dataSource.listData_shio = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Shio');
                $scope.setInfoList($scope.dataSource.listData_shio);

                $scope.dataSource.listData_silang = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Silang');
                $scope.setInfoList($scope.dataSource.listData_silang);

                $scope.dataSource.listData_kembang = $scope.dataSource.lotteryInfoListData.filter(p => p.FamliyBigID === 'Kembang');
                $scope.setInfoList($scope.dataSource.listData_kembang);
            }

        };

        $scope.setInfoList = function (array) {
            array.forEach(p => {
                var betList = $scope.dataSource.betListData.filter(b => b.LotteryInfoName === p.LotteryInfoName);
                p.listData.forEach(q => {
                    q.rvalue = 0;
                    q.positionTaking = 0;
                    var result = betList.filter(b => b.SelectedNums === q.value.toString());
                    let lotteryInfoArray = result.map(p => p.LotteryInfoID);
                    let lotteryInfoIDs = lotteryInfoArray.filter(function (item, pos) { return lotteryInfoArray.indexOf(item) === pos; });
                    if (result && result.length > 0) {
                        //let positionTakingList = $scope.dataSource.positionTakingListData.filter(b =>
                        //    b.SelectedNums === q.value.toString() &&
                        //        b.LotteryInfoID === result[0].LotteryInfoID && ngAuthSettings.apiType === 'Platform' ? (b.MemberID === $scope.dataSource.memberInfo.MemberID) : (b.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                        let positionTakingList = getPositionTakingList(2, q.value.toString(), lotteryInfoIDs);

                        q.rvalue = result.map(item => item.TotalPending).reduce((prev, next) => prev + next);
                        q.positionTaking = positionTakingList.length > 0 ? positionTakingList.map(item => item.TotalPending).reduce((prev, next) => prev + next) : 0;
                        q.LotteryInfoID = result[0].LotteryInfoID;
                        q.LotteryInfoIDs = lotteryInfoIDs;
                        q.keyValue = result[0].SelectedNums;
                    }
                });
            });
        };

        $scope.changeReport = function (type) {
            $scope.dataSource.pageStatus = type;

            changePagerObj($scope.dataSource.PagerObj);
            $scope.setData($scope.dataSource.pageStatus);

            if (type === '4D') {
                //$scope.dataSource.showListData = $scope.dataSource.listData_4D.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                //$scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_4D.length;

                $scope.dataSource.showListData = $scope.dataSource.allShowListData.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                $scope.dataSource.PagerObj.TotalItems = $scope.dataSource.allShowListData.length;
            }
            if (type === '3D') {
                //$scope.dataSource.showListData = $scope.dataSource.listData_3D.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                //$scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_3D.length;
                $scope.dataSource.showListData = $scope.dataSource.allShowListData.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                $scope.dataSource.PagerObj.TotalItems = $scope.dataSource.allShowListData.length;
            }
            if (type === '2D') {
                //$scope.dataSource.showListData = $scope.dataSource.listData_2D.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                //$scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_2D.length;
                $scope.dataSource.showListData = $scope.dataSource.allShowListData.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                $scope.dataSource.PagerObj.TotalItems = $scope.dataSource.allShowListData.length;
            }
            if (type === 'ColokBebas2D') {
                $scope.dataSource.showListData = $scope.dataSource.listData_colokBebas2D.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                $scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_colokBebas2D.length;
            }
            if (type === 'ColokNaga') {
                $scope.dataSource.showListData = $scope.dataSource.listData_colokNaga.slice(($scope.dataSource.PagerObj.CurrentPage - 1) * $scope.dataSource.PagerObj.PageSize, $scope.dataSource.PagerObj.PageSize * $scope.dataSource.PagerObj.CurrentPage);
                $scope.dataSource.PagerObj.TotalItems = $scope.dataSource.listData_colokNaga.length;
            }
        };

        $scope.search = function () {
            blockUI.start();
            $scope.dataSource.searchCondition.IsDetailReport = true;
            $scope.dataSource.searchCondition.ShowPending = true;
            $scope.dataSource.searchCondition.IsStaging = IS_STAGING;

            mplayerService.findOutStandingReport($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.betListData = response.data.Rows.filter(p => p.MemberID === 0 && p.GameDealerMemberID === 0);
                            $scope.dataSource.positionTakingListData = response.data.Rows.filter(p => p.MemberID > 0 || p.GameDealerMemberID > 0);
                            //console.log($scope.dataSource.betListData);
                            //console.log($scope.dataSource.positionTakingListData);
                            $scope.searchLotteryInfo();
                            //$scope.dataSource.listData.forEach(p => {
                            //    p.LotteryTypeName = $scope.dataSource.selLotteryTypeList.find(l => l.LotteryTypeID === p.LotteryTypeID).LotteryTypeName;
                            //});
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                            $rootScope.$broadcast('changeModalMsg');
                        }
                        blockUI.stop();
                    },
                    function error(response) {
                        console.log(response);
                        blockUI.stop();
                    });
        };

        $scope.searchLotteryType = function () {
            var sendObj = {};
            sendObj.CurrentPage = 1;
            sendObj.PageSize = 1000;
            sendObj.LotteryClassID = 5;

            lotteryService.findLotteryType(sendObj)
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            //console.log(response.data.Rows.ListData);
                            $scope.dataSource.selLotteryTypeList = response.data.Rows.ListData;
                            $scope.dataSource.searchCondition.LotteryTypeID = $scope.dataSource.selLotteryTypeList[0].LotteryTypeID;
                            $scope.search();
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                            $rootScope.$broadcast('changeModalMsg');
                        }
                    },
                    function error(response) {
                        console.log(response);
                    });
        };

        $scope.searchLotteryInfo = function () {
            lotteryService.findLotteryInfo($scope.dataSource.searchCondition)
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            //console.log(response.data.Rows.ListData);
                            $scope.dataSource.lotteryInfoListData = response.data.Rows.ListData;
                            $scope.dataSource.lotteryInfoListData.forEach(p => {
                                p.listData = JSON.parse(p.SelectArray);
                            });

                            //$scope.setData($scope.dataSource.pageStatus);
                            $scope.changeReport($scope.dataSource.pageStatus);
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                            $rootScope.$broadcast('changeModalMsg');
                        }
                    },
                    function error(response) {
                        console.log(response);
                    });
        };

        $scope.searchPositionTakingMap = function () {
            memberShipService.findMPositionProfitMap({ CurrentPage: 1, PageSize: 100000 })
                .then(
                    function success(response, status, headers, config) {
                        if (response.data.APIRes.ResCode === '000') {
                            $scope.dataSource.positionTakingMaps = response.data.Rows.ListData;
                        } else {
                            ngAuthSettings.modalMsg.title = "Message";
                            ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                            ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

                            $rootScope.$broadcast('changeModalMsg');
                        }
                    },
                    function error(response) {
                        console.log(response);
                    });
        };

        $scope.showDetail = function (info) {
            $scope.dataSource.selInfo = info;

            var nowDate = new Date();
            var dateS = new Date(Number(nowDate));
            dateS.setDate(nowDate.getDate() - 3);
            var dateE = new Date(Number(nowDate));
            dateE.setDate(nowDate.getDate());

            var ajaxData = {
                'CurrentPage': 1,
                'PageSize': 100000,
                'ByReport': true,
                //'LotteryInfoID': info.LotteryInfoID,
                'LotteryInfoIDs': info.LotteryInfoIDs,
                'SelectNums': info.keyValue,
                'StatusCode': 0,
                'DateS': dateS,
                'DateE': dateE,
                'IsStaging': IS_STAGING
            };

            blockUI.start();

            lotteryService.findVwMPlayerReport(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.mPlayerObj = response.data.Rows.ListData;
                        $scope.dataSource.mPlayerObj.forEach(p => {
                            var positionTakingMaps = $scope.dataSource.positionTakingMaps.filter(f => f.AgentParentMap === (p.Member === undefined ? '' : p.Member.AgentParentMap));
                            var positionTakingMap = [];

                            if ($scope.dataSource.memberInfo.AgentLevelSCID === 28) {
                                positionTakingMap =
                                    positionTakingMaps.find(f => f.MemberID === $scope.dataSource.memberInfo.MemberID || f.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID);
                            } else {
                                positionTakingMap =
                                    positionTakingMaps.find(f =>
                                        ngAuthSettings.apiType === 'Platform' ? (f.MemberID === $scope.dataSource.memberInfo.MemberID) : (f.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
                            }

                            if (positionTakingMap) {
                                var subPositionTakingMap = positionTakingMaps[positionTakingMaps.indexOf(positionTakingMap) + 1];
                                p.DownLineName = positionTakingMap.AgentParentMap.split('/')[positionTakingMaps.indexOf(subPositionTakingMap)];
                                //p.DownLinePositionTaking = p.Price * subPositionTakingMap.PositionTakingProfit;
                                p.DownLinePositionTaking = p.BetAmounts * positionTakingMap.PositionTakingProfit;
                            }
                        });
                        //console.log($scope.dataSource.mPlayerObj);
                        $('#ShowDetailDialog').click();
                        //頁籤
                        //$scope.dataSource.PagerObj = response.data.Rows.PagerObj;
                        //$scope.dataSource.PagerObj["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                        //$scope.dataSource.PagerObj["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                        //$scope.dataSource.PagerObj["PageArray"] = [];
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "Information";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        ngAuthSettings.modalMsg.callBack = "home";

                        // 填完訊息後顯示訊息框
                        $rootScope.$broadcast('changeModalMsg');
                        $('#ModalShow').click();
                    }
                    blockUI.stop();
                },
                function error(response) {
                    console.log(response);
                }
            );
        };

        //換頁
        $scope.PageChanged = function (page) {
            $scope.dataSource.PagerObj.CurrentPage = page;
            $scope.changeReport($scope.dataSource.pageStatus);
            //$scope.setData($scope.dataSource.pageStatus);
        };

        function changePagerObj(obj) {
            $scope.dataSource.PagerObj = {
                CurrentPage: obj.CurrentPage,
                PageSize: obj.PageSize,
                TotalItems: obj.TotalItems,
                PageArray: [],
                thisPage: obj.CurrentPage,
                thisPageSize: obj.PageSize
            };
        }

        $scope.copy = function () {
            var body = document.body, range, sel;
            copy(body, document, $scope.dataSource.fileName);
        };

        $scope.excel = function () {
            excel(document, $scope.dataSource.tableNameList, $scope.dataSource.fileName + '.xls');
        };

        $scope.print = function () {
            print(document, $scope.dataSource.fileName);
        };

        function getPositionTakingList(type, value, lotteryInfoIDs, value2) {
            var returnList = [];
            switch (type) {
                case 1:
                    returnList = $scope.dataSource.positionTakingListData.filter(p =>
                        p.SelectedNums.replace(/X/g, '') === value &&
                        lotteryInfoIDs.includes(p.LotteryInfoID));
                    break;
                case 2:
                    returnList = $scope.dataSource.positionTakingListData.filter(p =>
                        p.SelectedNums === value &&
                        lotteryInfoIDs.includes(p.LotteryInfoID));
                    break;
                case 3:
                    returnList = $scope.dataSource.positionTakingListData.filter(p =>
                        p.SelectedNums.split('_')[0] === value && p.SelectedNums.split('_')[1] === value2 &&
                        lotteryInfoIDs.includes(p.LotteryInfoID));
                    break;
                case 4:
                    returnList = $scope.dataSource.positionTakingListData.filter(p =>
                        p.SelectedNums.split(',')[0] === value && p.SelectedNums.split(',')[1] === value2 &&
                        lotteryInfoIDs.includes(p.LotteryInfoID));
                    break;
            }

            if ($scope.dataSource.memberInfo.AgentLevelSCID === 28) {
                returnList = returnList.filter(p => p.MemberID === $scope.dataSource.memberInfo.MemberID || p.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID);
            } else {
                returnList = returnList.filter(p => ngAuthSettings.apiType === 'Platform' ? (p.MemberID === $scope.dataSource.memberInfo.MemberID) : (p.GameDealerMemberID === $scope.dataSource.memberInfo.MemberID));
            }

            return returnList;
        }

    }]);