'use strict';
app.factory('platformService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

    var _get = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/PlatformSetting/GetPlatformSetting';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["PlatformName"] = dataObj.PlatformName
        ajaxData["CompanyCode"] = dataObj.CompanyCode;
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/PlatformSetting/FindPlatformSetting';
        ajaxData["PlatformName"] = dataObj.PlatformName;
        ajaxData["TypeCode"] = dataObj.TypeCode;
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        // API
        ajaxData["CompanyName"] = dataObj.CompanyName;
        ajaxData["APICode"] = dataObj.APICode;
        // ajaxData["APID"] = dataObj.APID;

        return _callRepository(deferred, ajaxData);
    };

    factory.get = _get;
    factory.find = _find;
    return factory;
}]);