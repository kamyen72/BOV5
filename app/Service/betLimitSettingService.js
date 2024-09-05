'use strict';
app.factory('betLimitSettingService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

        ajaxData["ApiPath"] = '/api/LotteryBetLimit/AddLotteryBetLimitType';
        ajaxData["LimitMin"] = dataObj.LimitMin;
        ajaxData["LimitMax"] = dataObj.LimitMax;
        ajaxData["LimitName"] = dataObj.LimitName; 
        ajaxData["LotteryBetLimitMaps"] = dataObj.mapList ? dataObj.mapList.filter(p => p.Changed) : [];

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryBetLimitType';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize; 
        ajaxData["LimitName"] = dataObj.LimitName;
        ajaxData["IsParentType"] = dataObj.IsParentType;

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelLotteryBetLimitType';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/UpdateLotteryBetLimitType';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["LimitMin"] = dataObj.LimitMin;
        ajaxData["LimitMax"] = dataObj.LimitMax;
        ajaxData["LimitName"] = dataObj.LimitName;
        ajaxData["LotteryBetLimitMaps"] = dataObj.mapList ? dataObj.mapList.filter(p => p.Changed) : [];

        return _callRepository(deferred, ajaxData);
    };

    var _deleteMap = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelLotteryBetLimitMap';
        ajaxData["ID"] = dataObj.LotteryBetLimitMapID;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.delete = _delete;
    factory.deleteMap = _deleteMap;
    return factory;
}]);