'use strict';
app.factory('userLevelService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _addUserLevel = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/UserLevel/AddUserLevel';

        ajaxData["LevelName"] = dataObj.LevelName;
        ajaxData["LevelNotice"] = dataObj.LevelNotice;
        ajaxData["MinAddCredit"] = dataObj.MinAddCredit; 
        ajaxData["MinTotalRealBet"] = dataObj.MinTotalRealBet;
        ajaxData["SPCashBack"] = dataObj.SPCashBack;
        ajaxData["Sort"] = dataObj.Sort;

        return _callRepository(deferred, ajaxData);
    };

    var _findUserLevel = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/UserLevel/FindUserLevel';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["LevelName"] = dataObj.LevelName;
        ajaxData["UserLevel"] = dataObj.UserLevel;

        return _callRepository(deferred, ajaxData);
    };

    var _delUserLevel = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/UserLevel/DelUserLevel';

        ajaxData["LevelID"] = dataObj.LevelID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateUserLevel = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/UserLevel/UpdateUserLevel';

        ajaxData["LevelID"] = dataObj.LevelID;
        ajaxData["LevelName"] = dataObj.LevelName;
        ajaxData["LevelNotice"] = dataObj.LevelNotice;
        ajaxData["MinAddCredit"] = dataObj.MinAddCredit;
        ajaxData["MinTotalRealBet"] = dataObj.MinTotalRealBet;
        ajaxData["SPCashBack"] = dataObj.SPCashBack;
        ajaxData["Sort"] = dataObj.Sort;

        return _callRepository(deferred, ajaxData);
    };

    factory.addUserLevel = _addUserLevel;
    factory.findUserLevel = _findUserLevel;
    factory.updateUserLevel = _updateUserLevel;
    factory.delUserLevel = _delUserLevel;
    return factory;
}]);