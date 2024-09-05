'use strict';
app.factory('statementService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
    var factory = {};

    var _callRepository = function (deferred, ajaxData, config) {
        RepositoryHelper.post(ajaxData, config).then(
            function success(response, status, headers, config) {
                deferred.resolve(response);
            }, function error(data, status, headers, config) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    var _findStatement = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["ApiPath"] = '/api/Statement/FindStatement';
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["UserName"] = dataObj.UserName; 
        ajaxData["MemberID"] = dataObj.MemberID;

        return _callRepository(deferred, ajaxData, config);
    };

    factory.findStatement = _findStatement;
    return factory;
}]);