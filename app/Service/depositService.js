'use strict';
app.factory('depositService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

        ajaxData["ApiPath"] = '/api/Deposit/AddDeposit';
        ajaxData["PromotionID"] = dataObj.PromotionID; 
        ajaxData["CBankID"] = dataObj.CBankID; 
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["Amount"] = dataObj.Amount;
        ajaxData["Remark"] = dataObj.Remark;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Deposit/FindDeposit';
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["DepositTypeSCID"] = dataObj.DepositTypeSCID;

        return _callRepository(deferred, ajaxData);
    };

    var _findDepositHistory = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Deposit/FindDepositHistory';
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["DepositTypeSCID"] = dataObj.DepositTypeSCID;

        return _callRepository(deferred, ajaxData);
    };

    var _findDepositHasFile = function (dataObj) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["HasFile"] = dataObj.HasFile;
        ajaxData["ApiPath"] = '/api/Deposit/FindDepositHasFile';

        return _callRepository(deferred, ajaxData);
    };

    var _findDepositFile = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Deposit/FindDepositFile';
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["DepositID"] = dataObj.DepositID;
        ajaxData["FileName"] = dataObj.FileName;

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Deposit/DelDeposit';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Deposit/UpdateDeposit';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["DepositTypeSCID"] = dataObj.DepositTypeSCID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["Amount"] = dataObj.Amount;
        ajaxData["Remark"] = dataObj.Remark;
        ajaxData["DepositFileIDs"] = dataObj.DepositFileIDs;
        
        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.findDepositHistory = _findDepositHistory;
    factory.findDepositHasFile = _findDepositHasFile;
    factory.findDepositFile = _findDepositFile;
    factory.update = _update;
    factory.delete = _delete;
    return factory;
}]);