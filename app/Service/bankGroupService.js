'use strict';
app.factory('bankGroupService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

    var _findByUserLevel = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/BankGroup/FindBankGroupByUserLevel';
        ajaxData["LevelIDs"] = dataObj.LevelIDs;

        return _callRepository(deferred, ajaxData);
    };

    var _updateBankGroup = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        
        ajaxData["ApiPath"] = '/api/BankGroup/UpdateBankGroup';
        ajaxData["UserLevelID"] = dataObj.UserLevelID;
        ajaxData["BankIDList"] = dataObj.BankIDList; 

        return _callRepository(deferred, ajaxData);
    };

    factory.findByUserLevel = _findByUserLevel;
    factory.updateBankGroup = _updateBankGroup;
    return factory;
}]);