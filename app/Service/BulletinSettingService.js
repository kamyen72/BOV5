'use strict';
app.factory('bulletinSettingService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

        ajaxData["ApiPath"] = '/api/Bulletin/AddBulletin';
        ajaxData["IsEnable"] = dataObj["IsEnable"];
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["BulletinTitle"] = dataObj["BulletinTitle"];
        ajaxData["BulletinNotice"] = dataObj["BulletinNotice"];

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["BulletinTitle"] = dataObj.BulletinTitle;
        ajaxData["ApiPath"] = '/api/Bulletin/FindBulletin';


        return _callRepository(deferred, ajaxData);
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ID"] = dataObj.ID;
        ajaxData["ApiPath"] = '/api/Bulletin/DelBulletin';

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/Bulletin/UpdateBulletin';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["BulletinTitle"] = dataObj.BulletinTitle;
        ajaxData["BulletinNotice"] = dataObj.BulletinNotice;
        ajaxData["IsEnable"] = dataObj.IsEnable;
        ajaxData["DateS"] = formatDate(dataObj.DateS, false);
        ajaxData["DateE"] = formatDate(dataObj.DateE, false);
 
        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    //factory.findChildren = _findChildren; 
    factory.update = _update;
    factory.del = _del;
    return factory;
}]);