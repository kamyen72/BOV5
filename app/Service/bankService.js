'use strict';
app.factory('bankService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _addBank = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["BankCode"] = dataObj.BankCode;
        ajaxData["BankName"] = dataObj.BankName;
        ajaxData["BankNumber"] = dataObj.BankNumber;
        ajaxData["ApiPath"] = '/api/MBank/AddMBank';

        return _callRepository(deferred, ajaxData);
    };

    var _findBank = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["BankCode"] = dataObj.BankCode;
        ajaxData["BankName"] = dataObj.BankName;
        ajaxData["BankNumber"] = dataObj.BankNumber;
        ajaxData["MemberID"] = dataObj.MemberID;

        ajaxData["ApiPath"] = '/api/MBank/FindMBank';

        return _callRepository(deferred, ajaxData);
    };

    var _delBank = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ID"] = dataObj.ID;
        ajaxData["ApiPath"] = '/api/MBank/DelMBank';

        return _callRepository(deferred, ajaxData);
    };

    var _updateBank = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ID"] = dataObj.ID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["BankCode"] = dataObj.BankCode;
        ajaxData["BankName"] = dataObj.BankName;
        ajaxData["BankNumber"] = dataObj.BankNumber;
        ajaxData["ApiPath"] = '/api/MBank/UpdateMBank';

        return _callRepository(deferred, ajaxData);
    };

    factory.addBank = _addBank;
    factory.findBank = _findBank;
    factory.updateBank = _updateBank;
    factory.delBank = _delBank;
    return factory;
}]);