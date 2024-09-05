'use strict';
app.factory('seoService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

        ajaxData["ApiPath"] = '/api/SEO/AddSEO';
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["PageURL"] = dataObj.PageURL;
        ajaxData["MetaTitle"] = dataObj.MetaTitle;
        ajaxData["MetaKeyword"] = dataObj.MetaKeyword;
        ajaxData["MetaDescription"] = dataObj.MetaDescription;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/SEO/FindSEO';
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["MetaTitle"] = dataObj.MetaTitle;

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/SEO/DelSEO';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/SEO/UpdateSEO';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["PageURL"] = dataObj.PageURL;
        ajaxData["MetaTitle"] = dataObj.MetaTitle;
        ajaxData["MetaKeyword"] = dataObj.MetaKeyword;
        ajaxData["MetaDescription"] = dataObj.MetaDescription;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.delete = _delete;
    return factory;
}]);