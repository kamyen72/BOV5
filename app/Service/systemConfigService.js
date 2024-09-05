'use strict';
app.factory('systemConfigService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _addSystemConfig = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/SystemConfig/AddSystemConfig';

        ajaxData["ConfigName"] = dataObj.ConfigName;
        ajaxData["ConfigNotice"] = dataObj.ConfigNotice;
        ajaxData["ConfigParentID"] = dataObj.ConfigParentID;
        ajaxData["ConfigTypeID"] = dataObj.ConfigTypeID;
        ajaxData["ConfigValues"] = dataObj.ConfigValues;

        return _callRepository(deferred, ajaxData);
    };

    var _findSystemConfig = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/SystemConfig/FindSystemConfig';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["ConfigName"] = dataObj.ConfigName;
        ajaxData["ConfigParentID"] = dataObj.ConfigParentID;
        ajaxData["ConfigTypeID"] = dataObj.ConfigTypeID;

        return _callRepository(deferred, ajaxData);
    };

    var _findSystemConfigChildren = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/SystemConfig/FindSystemConfigChildren';

        ajaxData["ListConfigName"] = dataObj.ListConfigName;
        return _callRepository(deferred, ajaxData);
    };

    var _delSystemConfig = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/SystemConfig/DelSystemConfig';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateSystemConfig = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/SystemConfig/UpdateSystemConfig';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["ConfigName"] = dataObj.ConfigName;
        ajaxData["ConfigNotice"] = dataObj.ConfigNotice;
        ajaxData["ConfigParentID"] = dataObj.ConfigParentID;
        ajaxData["ConfigTypeID"] = dataObj.ConfigTypeID;
        ajaxData["ConfigValues"] = dataObj.ConfigValues;

        return _callRepository(deferred, ajaxData);
    };

    factory.addSystemConfig = _addSystemConfig;
    factory.findSystemConfig = _findSystemConfig;
    factory.findSystemConfigChildren = _findSystemConfigChildren; 
    factory.updateSystemConfig = _updateSystemConfig;
    factory.delSystemConfig = _delSystemConfig;
    return factory;
}]);