'use strict';
app.factory('bannerSettingService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

        ajaxData["ApiPath"] = '/api/Banner/AddBanner';
        ajaxData["BannerImg"] = dataObj["BannerImg"];
        ajaxData["BannerNotice"] = dataObj["BannerNotice"];
        ajaxData["FileName"] = dataObj["FileName"];
        ajaxData["FileExtension"] = dataObj["FileExtension"];
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["Type"] = dataObj["Type"];
        ajaxData["FamilyBigID"] = dataObj["FamilyBigID"];
        ajaxData["FamilyMiddleID"] = dataObj["FamilyMiddleID"];
        ajaxData["IsEnable"] = dataObj["IsEnable"];

        //ajaxData["Files"] = [];
        //for (var i = 0; i < dataObj["Files"].length; i++) {
        //    ajaxData["Files"].push({
        //        BannerImg: dataObj["Files"][i].file,
        //        FileName: dataObj["Files"][i].name,
        //        FileExtension: dataObj["Files"][i].extension
        //    });
        //}
        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE); 
        ajaxData["BannerNotice"] = dataObj.BannerNotice; 
        ajaxData["Type"] = dataObj.Type;
        ajaxData["FileName"] = dataObj.FileName;
        ajaxData["IsEnable"] = dataObj.IsEnable;
        ajaxData["ApiPath"] = '/api/Banner/FindBanner';

        return _callRepository(deferred, ajaxData);
    };

    var _del = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ID"] = dataObj.ID;
        ajaxData["ApiPath"] = '/api/Banner/DelBanner';

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/Banner/UpdateBanner';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["BannerImg"] = dataObj["BannerImg"];
        ajaxData["BannerNotice"] = dataObj["BannerNotice"];
        ajaxData["FileName"] = dataObj["FileName"];
        ajaxData["FileExtension"] = dataObj["FileExtension"];
        ajaxData["DateS"] = getDateS(dataObj.DateS);
        ajaxData["DateE"] = getDateE(dataObj.DateE);
        ajaxData["Type"] = dataObj["Type"];
        ajaxData["FamilyBigID"] = dataObj["FamilyBigID"];
        ajaxData["FamilyMiddleID"] = dataObj["FamilyMiddleID"];
        ajaxData["IsEnable"] = dataObj["IsEnable"];

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    //factory.findChildren = _findChildren; 
    factory.update = _update;
    factory.del = _del;
    return factory;
}]);