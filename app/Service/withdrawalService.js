'use strict';
app.factory('withDrawalService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

        ajaxData["ApiPath"] = '/api/WithDrawal/AddWithDrawalByBack';
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["Amount"] = dataObj.Amount;
        ajaxData["Remark"] = dataObj.Remark;
        ajaxData["MBankID"] = dataObj.MBankID;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["WithDrawalTypeSCID"] = dataObj.WithDrawalTypeSCID;
        ajaxData["ApiPath"] = '/api/WithDrawal/FindWithDrawal'; 

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/WithDrawal/DelWithDrawal';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/WithDrawal/UpdateWithDrawal';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["MBankID"] = dataObj.MBankID;
        ajaxData["WithDrawalTypeSCID"] = dataObj.WithDrawalTypeSCID;
        ajaxData["Amount"] = dataObj.Amount;
        ajaxData["Remark"] = dataObj.Remark;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.delete = _delete;
    return factory;
}]);