'use strict';
app.factory('mplayerService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
    var factory = {};
    var _callRepository = function (deferred, ajaxData) {
        RepositoryHelper.post(ajaxData).then(
            function success(response, status, headers) {
                deferred.resolve(response);
            }, function error(data, status, headers) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    var _findAllVwMPlayer = function (dataObj) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = dataObj.DateS.getFullYear() + '/' + (dataObj.DateS.getMonth() + 1) + '/' + dataObj.DateS.getDate() + ' 00:00:00';
        ajaxData["DateE"] = dataObj.DateE.getFullYear() + '/' + (dataObj.DateE.getMonth() + 1) + '/' + dataObj.DateE.getDate() + ' 23:59:59';
        ajaxData["ApiPath"] = '/api/MPlayer/FindAllVwMPlayer';

        return _callRepository(deferred, ajaxData);
    };

    var _findMPlayerReport = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID; 
        ajaxData["MemberIDs"] = dataObj.MemberIDs;
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindMPlayerReport';

        return _callRepository(deferred, ajaxData);
    };

    var _findWinLoseReport = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID;
        ajaxData["MemberIDs"] = dataObj.MemberIDs; 
        ajaxData["WebCode"] = dataObj.WebCode;
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindWinLoseReport';

        return _callRepository(deferred, ajaxData);
    }; 

    var _findWinLoseReportDetail = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID;
        ajaxData["MemberIDs"] = dataObj.MemberIDs;
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindWinLoseReportDetail';

        return _callRepository(deferred, ajaxData);
    }; 

    var _findGameDealerWinLoseReportDetail = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID;
        ajaxData["MemberIDs"] = dataObj.MemberIDs;
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindGameDealerWinLoseReportDetail';

        return _callRepository(deferred, ajaxData);
    }; 

    var _findGameDealerWinLoseReport = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID;
        ajaxData["MemberIDs"] = dataObj.MemberIDs; 
        ajaxData["WebCode"] = dataObj.WebCode; 
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindGameDealerWinLoseReport';

        return _callRepository(deferred, ajaxData);
    }; 

    var _findTotalWinLoseReport = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MPlayerID"] = dataObj.MPlayerID;
        ajaxData["MemberIDs"] = dataObj.MemberIDs; 
        ajaxData["WebCode"] = dataObj.WebCode; 
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindTotalWinLoseReport'; 

        return _callRepository(deferred, ajaxData);
    }; 

    var _findWinLoseReportByGame = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID; 
        ajaxData["IsDetailReport"] = dataObj.IsDetailReport; 
        ajaxData["IsMemberReport"] = dataObj.IsMemberReport; 
        ajaxData["ShowPending"] = dataObj.ShowPending;
        ajaxData["ApiPath"] = '/api/MPlayerReport/FindWinLoseReportByGame';

        return _callRepository(deferred, ajaxData);
    };

    var _findOutStandingReport = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["IsDetailReport"] = dataObj.IsDetailReport;
        ajaxData["IsMemberReport"] = dataObj.IsMemberReport;
        ajaxData["ShowPending"] = dataObj.ShowPending;
        ajaxData["SearchType"] = dataObj.SearchType;
        ajaxData["IsStaging"] = dataObj.IsStaging;
        ajaxData["ApiPath"] = '/api/Report/FindOutStandingReport';

        return _callRepository(deferred, ajaxData);
    };
    
    factory.findAllVwMPlayer = _findAllVwMPlayer;
    factory.findMPlayerReport = _findMPlayerReport;
    factory.findWinLoseReport = _findWinLoseReport;
    factory.findWinLoseReportDetail = _findWinLoseReportDetail; 
    factory.findGameDealerWinLoseReportDetail = _findGameDealerWinLoseReportDetail;
    factory.findGameDealerWinLoseReport = _findGameDealerWinLoseReport;
    factory.findTotalWinLoseReport = _findTotalWinLoseReport;
    factory.findWinLoseReportByGame = _findWinLoseReportByGame; 
    factory.findOutStandingReport = _findOutStandingReport;
    return factory;
}]);