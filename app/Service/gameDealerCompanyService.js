'use strict';
app.factory('gameDealerCompanyService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _add = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerCompany/AddGameDealerCompany';
        ajaxData["CompanyName"] = dataObj.CompanyName;
        ajaxData["CompanyCode"] = dataObj.CompanyCode;
        ajaxData["CompanyDNS"] = dataObj.CompanyDNS;
        ajaxData["APID"] = dataObj.APID;
        ajaxData["PlayTokenStatus"] = dataObj.PlayTokenStatus;
        ajaxData["IsTest"] = dataObj.IsTest;  

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerCompany/FindGameDealerCompany';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["APID"] = dataObj.APID;
        ajaxData["CompanyName"] = dataObj.CompanyName;
        ajaxData["CompanyCode"] = dataObj.CompanyCode;

        _callRepository(deferred, ajaxData);

        return deferred.promise;
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerCompany/DelGameDealerCompany';
        ajaxData["ID"] = dataObj.CompanyID;

        _callRepository(deferred, ajaxData);

        return deferred.promise;
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerCompany/UpdateGameDealerCompany';
        ajaxData["ID"] = dataObj.CompanyID;
        ajaxData["CompanyName"] = dataObj.CompanyName;
        ajaxData["CompanyCode"] = dataObj.CompanyCode;
        ajaxData["CompanyDNS"] = dataObj.CompanyDNS;
        ajaxData["APID"] = dataObj.APID;
        ajaxData["PlayTokenStatus"] = dataObj.PlayTokenStatus;
        ajaxData["IsTest"] = dataObj.IsTest;  

        _callRepository(deferred, ajaxData);

        return deferred.promise;
    };

    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.del = _del;
    return factory;
}]);