'use strict';
app.factory('mGroupService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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
        ajaxData["ApiPath"] = '/api/MGroup/AddMGroup';

        ajaxData["MGroupName"] = dataObj.MGroupName;

        return _callRepository(deferred, ajaxData);
    }; 

    var _addFunctionList = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/AddFunctionList';

        ajaxData["MGroupID"] = dataObj.MGroupID;
        ajaxData["FunctionIDs"] = dataObj.FunctionIDs;

        return _callRepository(deferred, ajaxData);
    }; 

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/FindMGroup';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["MGroupName"] = dataObj.MGroupName;
        ajaxData["FunctionID_not"] = dataObj.FunctionID_not;

        return _callRepository(deferred, ajaxData);
    };

    var _get = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/GetMGroup';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["MGroupID"] = dataObj.MGroupID;

        return _callRepository(deferred, ajaxData);
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/DelMGroup';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _delFunction = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/DelMGMap';

        ajaxData["FID"] = dataObj.FID;
        ajaxData["MGroupID"] = dataObj.MGroupID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/UpdateMGroup';

        ajaxData["ID"] = dataObj.ID;
        ajaxData["MGroupName"] = dataObj.MGroupName;

        return _callRepository(deferred, ajaxData);
    };
    
    var _updateFunctionGroupByMember = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/MGroup/UpdateFunctionGroupByMember';

        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["FunctionIDs"] = dataObj.FunctionIDs; 
        ajaxData["IsGameDealer"] = dataObj.IsGameDealer;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.addFunctionList = _addFunctionList;
    factory.find = _find;
    factory.get = _get;
    factory.update = _update;
    factory.updateFunctionGroupByMember = _updateFunctionGroupByMember;
    factory.del = _del;
    factory.delFunction = _delFunction;
    return factory;
}]);