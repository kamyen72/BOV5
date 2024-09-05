'use strict';
app.factory('apiDefaultService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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
        ajaxData["ApiPath"] = '/api/ApiDefault/AddApiDefault';

        ajaxData["Controller"] = dataObj.Controller;
        ajaxData["Action"] = dataObj.Action;
        ajaxData["Sort"] = dataObj.Sort;

        return _callRepository(deferred, ajaxData);
    };

    var _addFunctionList = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/ApiDefault/AddFunctionList';

        ajaxData["APID"] = dataObj.APID;
        ajaxData["FunctionIDs"] = dataObj.FunctionIDs;

        return _callRepository(deferred, ajaxData);
    }; 

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/ApiDefault/FindApiDefault';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["Controller"] = dataObj.Controller;
        ajaxData["FunctionID_not"] = dataObj.FunctionID_not;

        return _callRepository(deferred, ajaxData);
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/ApiDefault/DelApiDefault';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _delFunction = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/ApiDefault/DelFGMap';

        ajaxData["FID"] = dataObj.FID;
        ajaxData["MGroupID"] = dataObj.MGroupID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/ApiDefault/UpdateAPIDefault';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["Controller"] = dataObj.Controller;
        ajaxData["Action"] = dataObj.Action;
        ajaxData["Sort"] = dataObj.Sort;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.addFunctionList = _addFunctionList;
    factory.find = _find;
    factory.del = _del;
    factory.delFunction = _delFunction;
    factory.update = _update;
    return factory;
}]);