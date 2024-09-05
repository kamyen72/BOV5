'use strict';
app.factory('functionGroupService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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
        ajaxData["ApiPath"] = '/api/FunctionGroup/AddFunctionGroup';

        ajaxData["FName"] = dataObj.FName;
        ajaxData["ParentID"] = dataObj.ParentID;
        ajaxData["IsDropDown"] = dataObj.IsDropDown;
        ajaxData["Sort"] = dataObj.Sort;
        ajaxData["IsBO"] = dataObj.IsBO;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/FunctionGroup/FindFunctionGroup';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["FName"] = dataObj.FName;
        ajaxData["IsDropdown"] = dataObj.IsDropdown;
        ajaxData["MGroupID"] = dataObj.MGroupID; 
        ajaxData["MGroupID_Not"] = dataObj.MGroupID_Not; 
        ajaxData["ApiDefaultID"] = dataObj.ApiDefaultID;
        ajaxData["ApiDefaultID_Not"] = dataObj.ApiDefaultID_Not; 

        return _callRepository(deferred, ajaxData);
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/FunctionGroup/DelFunctionGroup';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/FunctionGroup/UpdateFunctionGroup';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["FName"] = dataObj.FName;
        ajaxData["ParentID"] = dataObj.ParentID;
        ajaxData["IsDropDown"] = dataObj.IsDropDown;
        ajaxData["Sort"] = dataObj.Sort;
        ajaxData["IsBO"] = dataObj.IsBO;

        return _callRepository(deferred, ajaxData);
    };

    var _addMGroupList = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/FunctionGroup/AddMGroupList';

        ajaxData["FunctionID"] = dataObj.FunctionID;
        ajaxData["MGroupIDs"] = dataObj.MGroupIDs;

        return _callRepository(deferred, ajaxData);
    };

    var _addApiList = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/FunctionGroup/AddApiList';

        ajaxData["FunctionID"] = dataObj.FunctionID;
        ajaxData["ApiDefaultIDs"] = dataObj.ApiDefaultIDs;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.del = _del;
    factory.update = _update;
    factory.addMGroupList = _addMGroupList;
    factory.addApiList = _addApiList;
    return factory;
}]);