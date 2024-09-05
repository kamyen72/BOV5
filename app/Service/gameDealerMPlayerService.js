'use strict';
app.factory('gameDealerMPlayerService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerMPlayer/FindGameDealerMPlayer';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);

        _callRepository(deferred, ajaxData);

        return deferred.promise;
    };

    factory.find = _find;
    return factory;
}]);