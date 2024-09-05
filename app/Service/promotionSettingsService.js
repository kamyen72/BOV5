'use strict';
app.factory('promotionSettingsService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _addPromotion = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/AddPlatformPromotion';

        ajaxData["PromotionName"] = dataObj.PromotionName;
        ajaxData["SystemConfigTypeID"] = dataObj.SystemConfigTypeID;
        ajaxData["UserLevelID"] = dataObj.UserLevelID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["PromotionPeriodS"] = dataObj.PromotionPeriodS;
        ajaxData["PromotionPeriodE"] = dataObj.PromotionPeriodE;
        ajaxData["MinDepositMoney"] = dataObj.MinDepositMoney;
        ajaxData["BonusPercentage"] = dataObj.BonusPercentage;
        ajaxData["MaxBonus"] = dataObj.MaxBonus;
        ajaxData["UnlockLossPercentage"] = dataObj.UnlockLossPercentage;
        ajaxData["UnlockWithdrawalMultiple"] = dataObj.UnlockWithdrawalMultiple;
        ajaxData["UnlockWithdrawalTask"] = dataObj.UnlockWithdrawalTask;
        ajaxData["IsFirstPromotion"] = dataObj.IsFirstPromotion;
        ajaxData["Status"] = dataObj.Status;
        if (dataObj.Img.length > 0) {
            ajaxData["Img"] = dataObj.Img[0].file;
            ajaxData["FileName"] = dataObj.Img[0].name;
            ajaxData["FileExtension"] = dataObj.Img[0].extension;
        }

        return _callRepository(deferred, ajaxData);
    };

    var _findPromotions = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/FindPlatformPromotion';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;

        return _callRepository(deferred, ajaxData);
    };

    var _findPromotionByFront = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/FindPlatformPromotionByFront';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["MemberID"] = dataObj.MemberID;

        return _callRepository(deferred, ajaxData);
    };

    var _delPromotion = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/DelPlatformPromotion';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _updatePromotion = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/UpdatePlatformPromotion';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["PromotionName"] = dataObj.PromotionName;
        ajaxData["SystemConfigTypeID"] = dataObj.SystemConfigTypeID;
        ajaxData["UserLevelID"] = dataObj.UserLevelID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["PromotionPeriodS"] = dataObj.PromotionPeriodS;
        ajaxData["PromotionPeriodE"] = dataObj.PromotionPeriodE;
        ajaxData["MinDepositMoney"] = dataObj.MinDepositMoney;
        ajaxData["BonusPercentage"] = dataObj.BonusPercentage;
        ajaxData["MaxBonus"] = dataObj.MaxBonus;
        ajaxData["UnlockLossPercentage"] = dataObj.UnlockLossPercentage;
        ajaxData["UnlockWithdrawalMultiple"] = dataObj.UnlockWithdrawalMultiple;
        ajaxData["UnlockWithdrawalTask"] = dataObj.UnlockWithdrawalTask;
        ajaxData["IsFirstPromotion"] = dataObj.IsFirstPromotion;
        ajaxData["Status"] = dataObj.Status;
        if (dataObj.Img.length > 0) {
            ajaxData["Img"] = dataObj.Img[0].file;
            ajaxData["FileName"] = dataObj.Img[0].name;
            ajaxData["FileExtension"] = dataObj.Img[0].extension;
        }

        return _callRepository(deferred, ajaxData);
    };

    var _addMPromotion = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/AddMPromotion';

        ajaxData["PromotionID"] = dataObj.PromotionID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["UserName"] = dataObj.MemberShip.UserName;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["DepositAmount"] = dataObj.DepositAmount;
        ajaxData["TotalPlayerAmount"] = dataObj.TotalPlayerAmount;
        ajaxData["UnlockWithdrawalTask"] = dataObj.UnlockWithdrawalTask;
        ajaxData["JoinDate"] = dataObj.JoinDate;
        ajaxData["IslockWithdrawalMemberID"] = dataObj.IslockWithdrawalMemberID;

        return _callRepository(deferred, ajaxData);
    };

    var _findMPromotions = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/FindMPromotion';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["PromotionID"] = dataObj.PromotionID;

        return _callRepository(deferred, ajaxData);
    };

    var _findVwMPromotions = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/FindVwMPromotion';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["PromotionID"] = dataObj.PromotionID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateMPromotion = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/PromotionSettings/UpdateMPromotion';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["PromotionID"] = dataObj.PromotionID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["LotteryTypeID"] = dataObj.LotteryTypeID;
        ajaxData["DepositAmount"] = dataObj.DepositAmount;
        ajaxData["TotalPlayerAmount"] = dataObj.TotalPlayerAmount;
        ajaxData["UnlockWithdrawalTask"] = dataObj.UnlockWithdrawalTask;
        ajaxData["JoinDate"] = dataObj.JoinDate;
        ajaxData["IslockWithdrawal"] = dataObj.IslockWithdrawal;

        return _callRepository(deferred, ajaxData);
    };

    factory.addPromotion = _addPromotion;
    factory.findPromotions = _findPromotions;
    factory.findPromotionByFront = _findPromotionByFront;
    factory.updatePromotion = _updatePromotion;
    factory.delPromotion = _delPromotion;
    factory.addMPromotion = _addMPromotion;
    factory.findMPromotions = _findMPromotions;
    factory.findVwMPromotions = _findVwMPromotions;
    factory.updateMPromotion = _updateMPromotion;
    return factory;
}]);