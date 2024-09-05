'use strict';
app.controller('betReportController', [
    '$q',
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    '$translate',
    'localStorageService',
    'blockUI',
    'ngAuthSettings',
    'authService',
    'lotteryService',
    'mplayerService',
    function ($q, $scope, $rootScope, $location, $timeout, $translate, localStorageService, blockUI,
        ngAuthSettings, authService, lotteryService, mplayerService) {

        $scope.dataSource = {
            lotteryClassObj: [],
            SelectLotteryClass: {},
            mPlayerDetail: {},
            listData: [],
            mPlayerObj: [],
            pageStatus: 'reportView',
            searchCondition: { StatusCode: 1 },
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

        // 查詢今日投注
        $scope.search = function () {
            var lotteryTypeIDs = [];
            if ($scope.dataSource.SelectLotteryType && $scope.dataSource.SelectLotteryType.LotteryTypeID > 0) {
                lotteryTypeIDs.push($scope.dataSource.SelectLotteryType.LotteryTypeID);
            } else {
                $scope.dataSource.SelectLotteryClass.lotteryTypes.forEach(p => { if (p.LotteryTypeID) lotteryTypeIDs.push(p.LotteryTypeID); });
            }

            var ajaxData = {
                'CurrentPage': $scope.dataSource.PagerObj.CurrentPage,
                'PageSize': $scope.dataSource.PagerObj.PageSize,
                'UserName': $scope.dataSource.searchCondition.UserName,
                'LotteryTypeIDs': lotteryTypeIDs,
                'StatusCode': $scope.dataSource.searchCondition.StatusCode,
                'DateS': $scope.dataSource.searchCondition.DateS,
                'DateE': $scope.dataSource.searchCondition.DateE,
                'IsStaging': IS_STAGING
            };

            lotteryService.findMPlayerTotalSum(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        //$scope.dataSource.listData = response.data.Rows.DictionaryData;

                        console.log(response.data.Rows);
                        //console.log($scope.dataSource.listData);
                        
                        $scope.dataSource.listData = response.data.Rows.ObjectListData;
                        // $scope.dataSource.listData.forEach(data => {
                        //     data.DetailList.push({
                        //         'TurnOver': data.DetailList.reduce(sumFunction('TurnOver'), 0),
                        //         'WinLose': data.DetailList.reduce(sumFunction('WinLose'), 0),
                        //         'BetAmount': data.DetailList.reduce(sumFunction('BetAmount'), 0),
                        //         'WinMoney': data.DetailList.reduce(sumFunction('WinMoney'), 0)
                        //     });
                        // });
                        
                        $scope.dataSource.listData.push({
                            'UserName': 'Total',
                            'TurnOver': $scope.dataSource.listData.reduce(sumFunction('TurnOver'), 0),
                            'BetAmount': $scope.dataSource.listData.reduce(sumFunction('BetAmount'), 0),
                            'WinLose': $scope.dataSource.listData.reduce(sumFunction('WinLose'), 0),
                            'WinMoney': $scope.dataSource.listData.reduce(sumFunction('WinMoney'), 0)
                        });

                        $scope.dataSource.listData.push({
                            'UserName': 'Grand Total',
                            'TurnOver': response.data.Rows.ObjectQryData.TotalTurnover,
                            'BetAmount': response.data.Rows.ObjectQryData.TotalBetAmount,
                            'WinLose': response.data.Rows.ObjectQryData.TotalWinLose,
                            'WinMoney': response.data.Rows.ObjectQryData.TotalWinMoney
                        });
                        
                        //頁籤
                        $scope.dataSource.PagerObj = response.data.Rows.PagerObj;
                        $scope.dataSource.PagerObj["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
                        $scope.dataSource.PagerObj["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
                        $scope.dataSource.PagerObj["PageArray"] = [];
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
                },
                function error(response) { }
            );
        };

        $scope.showDetail = function (mPlayer) {
            $scope.dataSource.mPlayerDetail = JSON.parse(JSON.stringify(mPlayer));
            if ($scope.dataSource.mPlayerDetail.vwMPlayers && $scope.dataSource.mPlayerDetail.vwMPlayers.length > 0) {
                for (var i = 0; i < $scope.dataSource.mPlayerDetail.vwMPlayers.length; i++) {
                    let selectedPlayType = $scope.dataSource.mPlayerDetail.vwMPlayers[i].LotteryInfoName.split('_');
                    if (selectedPlayType.length > 1) {
                        let SelectedTxtData = $scope.dataSource.mPlayerDetail.vwMPlayers[i].SelectedTxt.split('|');
                        $scope.dataSource.mPlayerDetail.vwMPlayers[i].SelectedTxt = selectedPlayType[0] + '|' + SelectedTxtData[1] + '|' + SelectedTxtData[2];
                    }
                }

                if ($scope.dataSource.mPlayerDetail.vwMPlayers[0].LotteryClassID === 5) {
                    let newResultList = $scope.dataSource.mPlayerDetail.oLottery.Result.split(',').reverse();
                    newResultList = newResultList.map(result => result.toString().padStart(4, 0));
                    $scope.dataSource.mPlayerDetail.oLottery.Result = newResultList.join(', ');
                }

                $scope.dataSource.mPlayerDetail.vwMPlayers.push({
                    'Price': $scope.dataSource.mPlayerDetail.vwMPlayers.reduce(sumFunction('Price'), 0),
                    'DiscountPrice': $scope.dataSource.mPlayerDetail.vwMPlayers.reduce(sumFunction('DiscountPrice'), 0),
                    'WinMoney': $scope.dataSource.mPlayerDetail.vwMPlayers.reduce(sumFunction('WinMoney'), 0),
                    'WinLose': $scope.dataSource.mPlayerDetail.vwMPlayers.reduce(sumFunction('WinLose'), 0)
                });
            }
        };

        $scope.init = function () {
            //$scope.findLotteryClass();
            $scope.findLotteryTypeLobby();
        };

        // 查詢彩種
        //$scope.findLotteryClass = function () {
        //    var ajaxData = {
        //        'CurrentPage': 1,
        //        'PageSize': 100000,
        //        'Status': true
        //    };

        //    lotteryService.findLotteryClass(ajaxData, ngAuthSettings.headers).then(
        //        function success(response) {
        //            if (response.data.APIRes.ResCode === '000') {
        //                $scope.dataSource.lotteryClassObj = response.data.Rows.ListData;
        //                $scope.dataSource.lotteryClassObj.unshift({ ID: 0, LotteryClassName: 'All', lotteryTypes: [] });
        //                $scope.dataSource.lotteryClassObj.unshift({ ID: -1, LotteryClassName: '--Game Class--', lotteryTypes: [] });
        //                $scope.dataSource.SelectLotteryClass = $scope.dataSource.lotteryClassObj[0];
        //                $scope.dataSource.lotteryClassObj.forEach(p => {
        //                    if (!p.lotteryTypes) return;
        //                    p.lotteryTypes.unshift({ ID: 0, LotteryTypeCode: 'All' });
        //                    p.lotteryTypes.unshift({ ID: -1, LotteryTypeCode: '--Game Type--' });
        //                });
        //                $scope.secondSelected();
        //                $scope.dateSearch(0, 0);
        //            }
        //            else {
        //                ngAuthSettings.modalMsg.title = "FindLotteryClass";
        //                ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
        //                ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
        //            }
        //        },
        //        function error(response) {

        //        }
        //    );
        //};


        // 取得 GameClass
        $scope.findLotteryTypeLobby = function () {
            var ajaxData = {};
            lotteryService.findLotteryTypeLobby(ajaxData, ngAuthSettings.header).then(
                function success(response) {
                    if (response && response.data && response.data.APIRes.ResCode === '000') {
                        $scope.dataSource.lotteryClassObj = (response.data.Rows.ListData || []).map(item => ({
                            LotteryClassName: item.LotteryTypeName,
                            LotteryClassLabel: item.LotteryTypeName,
                            LotteryClassLangKey: `Lobby_${item.LotteryTypeName}`,
                            LotteryTypeIDList: (item.LotteryTypeCode || '').split(',').map(id => parseInt(id)),
                            LotteryTypes: []
                        }));
                        $scope.dataSource.lotteryClassObj.unshift({
                            ID: -1,
                            LotteryClassName: '--Game Class--',
                            LotteryClassLabel: '--Game Class--',
                            LotteryTypeIDList: [],
                            LotteryTypes: []
                        });
                        $scope.findLotteryClass();
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "FindLotteryTypeLobby";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                        $rootScope.$broadcast('changeModalMsg');
                        $('#ModalShow').click();
                    }
                },
                function error(response) {

                }
            );
        };


        // 使用GameClass 篩選對應GameTypes
        $scope.findLotteryClass = function () {
            var now = new Date();
            var today = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
            var ajaxData = {
                'CurrentPage': 1,
                'PageSize': 100000,
                'DateS': today + ' 00:00:00',
                'DateE': today + ' 23:59:59',
                'Status': true
            };

            lotteryService.findLotteryClass(ajaxData, ngAuthSettings.headers).then(
                function success(response) {
                    if (response && response.data && response.data.APIRes.ResCode === '000') {

                        var totalLotteryTypes = (response.data.Rows.ListData || []).reduce((prev, curr) => {
                            if (curr.LotteryClassID !== 6) {
                                var newLotteryTypes = curr.lotteryTypes.map(type => ({
                                    ...type,
                                    LotteryTypeLabel: type.LotteryTypeCode,
                                    LotteryTypeLangKey: `Lobby_${type.LotteryTypeCode}`
                                }));
                                return [...prev, ...newLotteryTypes];
                            }
                            return prev;
                        }, []);
                        $scope.dataSource.totalLotteryTypes = totalLotteryTypes;
                        $scope.dataSource.lotteryClassObj.forEach(item => {
                            item.lotteryTypes = totalLotteryTypes.filter(type => (item.LotteryTypeIDList || []).includes(type.LotteryTypeID));
                            item.lotteryTypes.unshift({
                                ID: -1,
                                LotteryTypeCode: '--Game Type--',
                                LotteryTypeLabel: '--Game Type--'
                            });
                        });
                        $scope.dataSource.SelectLotteryClass = $scope.dataSource.lotteryClassObj[0];

                        $scope.getOptionsTranslate();
                        $scope.secondSelected();
                        $scope.dateSearch(0, 0);
                    }
                    else {
                        ngAuthSettings.modalMsg.title = "FindLotteryClass";
                        ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
                        ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
                    }
                },
                function error(response) {
                    console.log(response);
                }
            );
        };

        // 關聯式選單
        $scope.secondSelected = function () {
            $scope.dataSource.lotteryTypes = [];
            if (!$scope.dataSource.SelectLotteryClass.lotteryTypes) {
                $scope.dataSource.SelectLotteryType = $scope.dataSource.lotteryTypes[0];
                return;
            }

            $scope.dataSource.lotteryTypes = $scope.dataSource.SelectLotteryClass.lotteryTypes;
            $scope.dataSource.SelectLotteryType = $scope.dataSource.lotteryTypes[0];
        };

        // 取得翻譯 覆蓋各選項的Label
        $scope.getOptionsTranslate = function () {
            var translateKeyList = [];
            
            $scope.dataSource.lotteryClassObj.forEach(classItem => {
                translateKeyList.push(classItem.LotteryClassLangKey);
                classItem.lotteryTypes.forEach(typeItem => {
                    translateKeyList.push(typeItem.LotteryTypeLangKey);
                });
            });
            
            $translate(translateKeyList)
                .then(translateMap => {
                    $scope.dataSource.lotteryClassObj.forEach(classItem => {

                        classItem.LotteryClassLabel = translateMap[classItem.LotteryClassLangKey] || classItem.LotteryClassName;

                        console.log(classItem.LotteryClassLabel,classItem.LotteryClassLangKey, classItem.LotteryClassName);

                        classItem.lotteryTypes.forEach(typeItem => {
                            typeItem.LotteryTypeLabel = translateMap[typeItem.LotteryTypeLangKey] || typeItem.LotteryTypeCode;

                            console.log(classItem.LotteryTypeLabel, typeItem.LotteryTypeLangKey, typeItem.LotteryTypeCode);
                        });
                    });
                })
                .catch(() => { });
            var lotteryTypeIDs = [];
            if ($scope.dataSource.SelectLotteryType && $scope.dataSource.SelectLotteryType.LotteryTypeID > 0) {
                lotteryTypeIDs.push($scope.dataSource.SelectLotteryType.LotteryTypeID);
            } else {
                $scope.dataSource.SelectLotteryClass.lotteryTypes.forEach(p => { if (p.LotteryTypeID) lotteryTypeIDs.push(p.LotteryTypeID); });
            }
        };

        setTimeout($scope.init, 300);

        $scope.dateSearch = function (dayS, dayE) {
            var nowDate = new Date();
            var dateS = new Date(Number(nowDate));
            dateS.setDate(nowDate.getDate() + dayS);
            var dateE = new Date(Number(nowDate));
            dateE.setDate(nowDate.getDate() + dayE);

            $scope.dataSource.searchCondition.DateS = dateS;
            $scope.dataSource.searchCondition.DateE = dateE;
            $scope.search();
        };

        $scope.showBets = function (report) {
            $scope.dataSource.pageStatus = 'detailView';
            // $scope.dataSource.mPlayerObj = report.DetailList;

            // console.log(report);
            
            var lotteryTypeIDs = [];
            if ($scope.dataSource.SelectLotteryType && $scope.dataSource.SelectLotteryType.LotteryTypeID > 0) {
                lotteryTypeIDs.push($scope.dataSource.SelectLotteryType.LotteryTypeID);
            } else {
                $scope.dataSource.SelectLotteryClass.lotteryTypes.forEach(p => { if (p.LotteryTypeID) lotteryTypeIDs.push(p.LotteryTypeID); });
            }
            var ajaxData = {
                'CurrentPage': $scope.dataSource.PagerObj.CurrentPage,
                'PageSize': $scope.dataSource.PagerObj.PageSize,
                'UserName': $scope.dataSource.searchCondition.UserName,
                'GameDealerMemberID' : report.GameDealerMemberID,
                'LotteryTypeIDs': lotteryTypeIDs,
                'StatusCode': $scope.dataSource.searchCondition.StatusCode,
                'DateS': $scope.dataSource.searchCondition.DateS,
                'DateE': $scope.dataSource.searchCondition.DateE,
                'IsStaging': IS_STAGING
            };
            
            lotteryService.findUserVwMPlayer(ajaxData).then(
                function success(response) {
                    if (response.data.APIRes.ResCode === '000') {
                        //$scope.dataSource.listData = response.data.Rows.DictionaryData;

                        console.log(response.data);
                        $scope.dataSource.mPlayerObj = response.data.Rows.ListData;
                        
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
                },
                function error(response) { }
            );
        };

        $scope.showReport = function () {
            $scope.dataSource.pageStatus = 'reportView';
        };

        //換頁
        $scope.PageChanged = function (page) {
            $scope.dataSource.PagerObj.CurrentPage = page;
            $scope.search();
        };


        $scope.copy = function () {
            var body = document.body, range, sel;
            copy(body, document, 'winLoseReport');
        };

        $scope.excel = function () {
            //excel(document, ['winLoseReport'], 'winLoseReport' + '.xls');
            var url = ngAuthSettings.apiServiceBaseUri + '/api/GameDealerMPlayer/GetBetReportExcel';
            url += "?dateS=" + getDateS($scope.dataSource.searchCondition.DateS);
            url += "&dateE=" + getDateE($scope.dataSource.searchCondition.DateE);
            url += "&companyID=" + localStorageService.get('UserInfo').CompanyID;
            window.open(url);
        };

        $scope.print = function () {
            print(document, 'winLoseReport');
        };

        $scope.openVideo = function(currentperiod) {
            lotteryService.checkVideoUploadS3({CurrentPeriod: currentperiod}).then(
                function success(response) {
                    // alert('Video still uploading, please wait.');
                    if(response.data.APIRes.ResCode === '000') {
                        window.open(`https://static.pisang102.com/3mlive/VideoRecord/${currentperiod}.mp4`, '_blank');
                    } else {
                        ngAuthSettings.modalMsg.title = "Information";
                        ngAuthSettings.modalMsg.msg = "Video sedang dimuat, silakan dicoba beberapa saat lagi.";
                        ngAuthSettings.modalMsg.callBack = "";       
    
                        // 填完訊息後顯示訊息框
                        $('#ModalShow').click();
                    }
                },
                function error(response) {
                }
            );
        };

    }]);