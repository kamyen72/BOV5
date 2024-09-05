'use strict';
app.factory('transactionsService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _findTransactionsHistory = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["Remark"] = dataObj.Remark;
        ajaxData["TransactionsTypeID"] = dataObj.TransactionsTypeID;
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["MemberID"] = dataObj.MemberID; 
        ajaxData["ApiPath"] = '/api/Transactions/FindTransactionsHistory';

        return _callRepository(deferred, ajaxData);
    };

    factory.findTransactionsHistory = _findTransactionsHistory;
    return factory;
}]);