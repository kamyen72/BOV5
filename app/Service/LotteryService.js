'use strict';
app.factory('lotteryService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _findMPlayerTotalSum = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindMPlayerTotalSum';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID; 
        ajaxData["UserName"] = dataObj.UserName; 
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["IsStaging"] = dataObj.IsStaging;


        return _callRepository(deferred, ajaxData, config);
    };

    var _findUserVwMPlayer = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindUserVwMPlayer';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID; 
        ajaxData["GameDealerMemberID"] = dataObj.GameDealerMemberID; 
        ajaxData["UserName"] = dataObj.UserName; 
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["IsStaging"] = dataObj.IsStaging;


        return _callRepository(deferred, ajaxData, config);
    };

    var _findVwMPlayer = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindGameDealerMPlayer';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID; 
        ajaxData["UserName"] = dataObj.UserName; 
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["IsStaging"] = dataObj.IsStaging;


        return _callRepository(deferred, ajaxData, config);
    };

    var _findVwMPlayerByBack = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindVwMPlayerByBack';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["SelectNums"] = dataObj.SelectNums;
        ajaxData["IsStaging"] = dataObj.IsStaging;

        return _callRepository(deferred, ajaxData, config);
    };

    var _findVwMPlayerReport = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["LotteryInfoIDs"] = dataObj.LotteryInfoIDs;
        ajaxData["SelectedNums"] = dataObj.SelectNums;
        ajaxData["IsStaging"] = dataObj.IsStaging;
        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindVwMPlayerReport';

        return _callRepository(deferred, ajaxData, config);
    };

    var _addLotteryClass = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/AddLotteryClass';
        ajaxData["LotteryClassName"] = dataObj.LotteryClassName;
        ajaxData["Notice"] = dataObj.Notice;
        ajaxData["GameRoomID"] = dataObj.GameRoomID;
        ajaxData["LotteryClass_TableID"] = dataObj.LotteryClass_TableID;
        ajaxData["Status"] = dataObj.Status;

        return _callRepository(deferred, ajaxData);
    };

    var _findLotteryClass = function (dataObj) {
        var deferred = $q.defer();

        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryClass';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = dataObj.DateS;
        ajaxData["DateE"] = dataObj.DateE;
        ajaxData["LotteryClassName"] = dataObj.LotteryClassName;
        ajaxData["GameRoomID"] = dataObj.GameRoomID;
        ajaxData["LotteryClass_TableID"] = dataObj.LotteryClass_TableID;
        ajaxData["Status"] = dataObj.Status;

        return _callRepository(deferred, ajaxData);
    };

    var _findLotteryTypeLobby = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryTypeLobby';

        return _callRepository(deferred, ajaxData, config);
    };

    var _delLotteryClass = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelLotteryClass';
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateLotteryClass = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/UpdateLotteryClass';
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["LotteryClassName"] = dataObj.LotteryClassName;
        ajaxData["Notice"] = dataObj.Notice;
        ajaxData["GameRoomID"] = dataObj.GameRoomID;
        ajaxData["LotteryClass_TableID"] = dataObj.LotteryClass_TableID;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["IsMaintain"] = dataObj.IsMaintain;

        return _callRepository(deferred, ajaxData);
    };

    var _addLotteryType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/AddLotteryType';
        ajaxData["LotteryTypeName"] = dataObj.LotteryTypeName;
        ajaxData["LotteryTypeCode"] = dataObj.LotteryTypeCode;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["PeriodInterval"] = dataObj.PeriodInterval;
        ajaxData["MaxBonusMoneyPool"] = dataObj.MaxBonusMoneyPool;
        ajaxData["DrawBonusPercentage"] = dataObj.DrawBonusPercentage;
        ajaxData["IsEnableAI"] = dataObj.IsEnableAI;
        ajaxData["IsOfficial"] = dataObj.IsOfficial;
        ajaxData["AIType"] = dataObj.AIType;
        ajaxData["CompanyWinPercentage"] = dataObj.CompanyWinPercentage; 
        ajaxData["UserWinPercentage"] = dataObj.UserWinPercentage;
        ajaxData["CompanyPresetCompensation"] = dataObj.CompanyPresetCompensation;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["LotteryType_TableID"] = dataObj.LotteryType_TableID;
        ajaxData["IsAgentGame"] = dataObj.IsAgentGame;
        ajaxData["CurrentLotteryTime"] = dataObj.CurrentLotteryTime;
        ajaxData["OpenDayOfWeek"] = dataObj.OpenDayOfWeek;
        ajaxData["ImagePath"] = dataObj.ImagePath;
        ajaxData["Color"] = dataObj.Color;
        ajaxData["Base64Img"] = dataObj.Base64Img;
        ajaxData["FileExtension"] = dataObj.FileExtension;

        return _callRepository(deferred, ajaxData);
    };

    var _findLotteryType = function (dataObj) {
        var deferred = $q.defer();

        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryType';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = formatDate(dataObj.DateS, false);
        ajaxData["DateE"] = formatDate(dataObj.DateE, false);
        ajaxData["LotteryTypeName"] = dataObj.LotteryTypeName;
        ajaxData["LotteryTypeCode"] = dataObj.LotteryTypeCode;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["IsAgentGame"] = dataObj.IsAgentGame;
        ajaxData["LotteryType_TableID"] = dataObj.LotteryType_TableID;

        return _callRepository(deferred, ajaxData);
    };

    var _delLotteryType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelLotteryType';
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateLotteryType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/UpdateLotteryType';
        ajaxData["CompanyID"] = dataObj.CompanyID;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["LotteryTypeName"] = dataObj.LotteryTypeName;
        ajaxData["LotteryTypeCode"] = dataObj.LotteryTypeCode;
        ajaxData["URL"] = dataObj.URL;
        ajaxData["PeriodInterval"] = dataObj.PeriodInterval;
        ajaxData["MaxBonusMoneyPool"] = dataObj.MaxBonusMoneyPool;
        ajaxData["DrawBonusPercentage"] = dataObj.DrawBonusPercentage;
        ajaxData["IsEnableAI"] = dataObj.IsEnableAI;
        ajaxData["AIType"] = dataObj.AIType;
        ajaxData["CompanyWinPercentage"] = dataObj.CompanyWinPercentage;
        ajaxData["UserWinPercentage"] = dataObj.UserWinPercentage; 
        ajaxData["CompanyPresetCompensation"] = dataObj.CompanyPresetCompensation;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["IsCloseGame"] = dataObj.IsCloseGame;
        ajaxData["IsMaintain"] = dataObj.IsMaintain;
        ajaxData["LotteryType_TableID"] = dataObj.LotteryType_TableID;
        ajaxData["IsAgentGame"] = dataObj.IsAgentGame;
        ajaxData["CurrentLotteryTime"] = dataObj.CurrentLotteryTime;
        ajaxData["OpenDayOfWeek"] = dataObj.OpenDayOfWeek;
        ajaxData["Color"] = dataObj.Color;
        ajaxData["ImagePath"] = dataObj.ImagePath;
        ajaxData["Base64Img"] = dataObj.Base64Img;
        ajaxData["FileExtension"] = dataObj.FileExtension;

        return _callRepository(deferred, ajaxData);
    };

    var _addLotteryInfo = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/AddLotteryInfo';
        ajaxData["LotteryInfoName"] = dataObj.LotteryInfoName;
        ajaxData["LotteryInfoNotice"] = dataObj.LotteryInfoNotice;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["LotteryInfo_TableID"] = dataObj.LotteryInfo_TableID;

        return _callRepository(deferred, ajaxData);
    };

    var _findLotteryInfo = function (dataObj) {
        var deferred = $q.defer();

        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryInfo';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = formatDate(dataObj.DateS, false);
        ajaxData["DateE"] = formatDate(dataObj.DateE, false);
        ajaxData["LotteryInfoName"] = dataObj.LotteryInfoName;
        ajaxData["LotteryInfoCode"] = dataObj.LotteryInfoCode;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["LotteryInfo_TableID"] = dataObj.LotteryInfo_TableID;

        return _callRepository(deferred, ajaxData);
    };

    var _delLotteryInfo = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelLotteryInfo';
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateLotteryInfo = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/UpdateLotteryInfo';
        ajaxData["LotteryInfoID"] = dataObj.LotteryInfoID;
        ajaxData["LotteryInfoName"] = dataObj.LotteryInfoName;
        ajaxData["LotteryInfoNotice"] = dataObj.LotteryInfoNotice;
        ajaxData["LotteryClassID"] = dataObj.LotteryClassID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["SelectArray"] = dataObj.SelectArray;
        ajaxData["DisCount"] = dataObj.DisCount;
        ajaxData["LotteryInfo_TableID"] = dataObj.LotteryInfo_TableID;

        return _callRepository(deferred, ajaxData);
    }; 

    var _manualOpenLottery = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/OLottery/ManualOpenLottery';
        ajaxData["Result"] = dataObj.InputResult;
        ajaxData["CurrentPeriod"] = dataObj.CurrentPeriod;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;

        return _callRepository(deferred, ajaxData);
    };

    var _findLotteryTypeByOfficial = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["StatusCode"] = dataObj.StatusCode;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["LotteryTypeIDs"] = dataObj.LotteryTypeIDs;
        ajaxData["IsOpen"] = dataObj.IsOpen;
        ajaxData["IsAgentGame"] = dataObj.IsAgentGame;
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryTypeByOfficial';

        return _callRepository(deferred, ajaxData, config);
    };

    var _getDefaultSpecial4DLotteryType = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/getDefaultSpecial4DLotteryType';

        return _callRepository(deferred, ajaxData, config);
    };

    var _getSpecial4DLotteryType = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/getSpecial4DLotteryType';

        return _callRepository(deferred, ajaxData, config);
    };

    var _get4DRrpResult = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};

        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["CurrentPeriod"] = dataObj.CurrentPeriod;
        ajaxData["UserWinPercentage"] = dataObj.UserWinPercentage;
        ajaxData["ApiPath"] = '/api/OLottery/Get4DRrpResult';

        return _callRepository(deferred, ajaxData, config);
    };

    var _checkVideoUploadS3 = function (dataObj, config) {
        var deferred = $q.defer(), ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["CurrentPeriod"] = dataObj.CurrentPeriod;
        ajaxData["ApiPath"] = '/api/VideoRecord/CheckVideo';
        return _callRepository(deferred, ajaxData, config);
    };

    factory.findMPlayerTotalSum = _findMPlayerTotalSum;
    factory.findUserVwMPlayer = _findUserVwMPlayer;
    factory.findVwMPlayer = _findVwMPlayer;
    factory.findVwMPlayerByBack = _findVwMPlayerByBack;
    factory.findVwMPlayerReport = _findVwMPlayerReport;

    factory.addLotteryClass = _addLotteryClass;
    factory.findLotteryClass = _findLotteryClass;
    factory.updateLotteryClass = _updateLotteryClass;
    factory.delLotteryClass = _delLotteryClass; 
    factory.findLotteryTypeLobby = _findLotteryTypeLobby;

    factory.addLotteryType = _addLotteryType;
    factory.findLotteryType = _findLotteryType;
    factory.updateLotteryType = _updateLotteryType;
    factory.delLotteryType = _delLotteryType;

    factory.addLotteryInfo = _addLotteryInfo;
    factory.findLotteryInfo = _findLotteryInfo;
    factory.updateLotteryInfo = _updateLotteryInfo;
    factory.delLotteryInfo = _delLotteryInfo;

    factory.manualOpenLottery = _manualOpenLottery;
    factory.findLotteryTypeByOfficial = _findLotteryTypeByOfficial;
    factory.get4DRrpResult = _get4DRrpResult;
    factory.getDefaultSpecial4DLotteryType = _getDefaultSpecial4DLotteryType;
    factory.getSpecial4DLotteryType = _getSpecial4DLotteryType;
    factory.checkVideoUploadS3 = _checkVideoUploadS3;
    return factory;
}]);