'use strict';
app.factory('gameRoomService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

        ajaxData["ApiPath"] = '/api/Lottery/AddGameRoomType';
        ajaxData["GameName"] = dataObj.GameName;
        ajaxData["GameType"] = dataObj.GameType;
        ajaxData["MinCommission"] = dataObj.MinCommission;
        ajaxData["MaxCommission"] = dataObj.MaxCommission;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["GameRoom_TableID"] = dataObj.GameRoom_TableID;

        var referralLayers = [];
        if (dataObj.ReferralLayers && dataObj.ReferralLayers[0]) referralLayers.push(dataObj.ReferralLayers[0]["ReferralPercentage"]);
        if (dataObj.ReferralLayers && dataObj.ReferralLayers[1]) referralLayers.push(dataObj.ReferralLayers[1]["ReferralPercentage"]);
        if (dataObj.ReferralLayers && dataObj.ReferralLayers[2]) referralLayers.push(dataObj.ReferralLayers[2]["ReferralPercentage"]);
        ajaxData["ReferralLayers"] = referralLayers;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/FindGameRoomType';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["GameRoomID"] = dataObj.GameRoomID;


        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/DelGameRoomType';
        ajaxData["GameRoomID"] = dataObj.GameRoomID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/Lottery/UpdateGameRoomType';
        ajaxData["GameRoomID"] = dataObj.GameRoomID;
        ajaxData["GameName"] = dataObj.GameName;
        ajaxData["GameType"] = dataObj.GameType;
        ajaxData["MinCommission"] = dataObj.MinCommission;
        ajaxData["MaxCommission"] = dataObj.MaxCommission;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["GameRoom_TableID"] = dataObj.GameRoom_TableID;
        ajaxData["ReferralLayers"] = dataObj.ReferralLayers;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.delete = _delete;
    factory.update = _update;
    return factory;
}]);