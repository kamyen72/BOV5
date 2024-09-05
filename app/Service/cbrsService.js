'use strict';
app.factory('cbrsService', ['$q', 'RepositoryHelper', function ($q, Repository) {
    var factory = {};

    var _callRepository = function (deferred, ajaxData) {
        Repository.post(ajaxData).then(
            function success(response, status, headers) {
                deferred.resolve(response);
            }, function error(data, status, headers) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    var _add = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/AddCBRS';
        ajaxData["Name"] = dataObj.Name;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MinLoss"] = dataObj.MinLoss;
        ajaxData["MaxLoss"] = dataObj.MaxLoss;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["RebateType"] = dataObj.RebateType;
        ajaxData["SettingType"] = dataObj.SettingType;
        ajaxData["CBRS"] = dataObj.CBRS;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/FindCBRS';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["ID"] = dataObj.ID;
        ajaxData["Name"] = dataObj.Name;
        ajaxData["RebateType"] = dataObj.RebateType;

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/DelCBRS';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/UpdateCBRS';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["Name"] = dataObj.Name;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MinLoss"] = dataObj.MinLoss;
        ajaxData["MaxLoss"] = dataObj.MaxLoss;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["RebateType"] = dataObj.RebateType; 
        ajaxData["SettingType"] = dataObj.SettingType;
        ajaxData["CBRS"] = dataObj.CBRS;

        return _callRepository(deferred, ajaxData);
    };

    var _findCBRReport = function (dataObj) {
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/FindCBRReport';
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["CashBackPending"] = dataObj.CashBackPending;
        ajaxData["CashRebatePending"] = dataObj.CashRebatePending; 
        ajaxData["ReportType"] = dataObj.ReportType; 

        return Repository.post(ajaxData);
    };

    var _updateCBRReport = function (dataObj, mPlayerReportIDs) {
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/UpdateCBRReport';
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["CashMoney"] = dataObj.CashMoney;
        ajaxData["Type"] = dataObj.Type;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["MPlayerReportIDs"] = mPlayerReportIDs;

        return Repository.post(ajaxData);
    };

    var _findReferralReport = function (dataObj) {
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/CBRS/FindReferralReport';
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["UserName"] = dataObj.UserName;

        return Repository.post(ajaxData);
    };
    
    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.delete = _delete;
    factory.findCBRReport = _findCBRReport;
    factory.updateCBRReport = _updateCBRReport;
    factory.findReferralReport = _findReferralReport;
    return factory;
}]);