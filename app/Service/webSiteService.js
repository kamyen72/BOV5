'use strict';
app.factory('webSiteService', ['$q', 'RepositoryHelper', function ($q, Repository) {
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

        ajaxData["ApiPath"] = '/api/WebSite/AddWebSite';
        ajaxData["BrandName"] = dataObj.BrandName;
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["GoogleAnalytics"] = dataObj.GoogleAnalytics;
        ajaxData["FooterText"] = dataObj.FooterText;
        ajaxData["WebsiteUrl"] = dataObj.WebsiteUrl;
        ajaxData["MWebsiteUrl"] = dataObj.MWebsiteUrl;
        ajaxData["WebsiteStyleSCID"] = dataObj.WebsiteStyleSCID;
        ajaxData["LogoImg"] = dataObj.LogoImg;
        ajaxData["LogoFileName"] = dataObj.LogoFileName;
        ajaxData["LogoFileExtension"] = dataObj.LogoFileExtension;
        ajaxData["FaviconImg"] = dataObj.FaviconImg;
        ajaxData["FaviconFileName"] = dataObj.FaviconFileName;
        ajaxData["FaviconFileExtension"] = dataObj.FaviconFileExtension;
        ajaxData["LivecharUrl"] = dataObj.LivecharUrl;
        ajaxData["LivechatCode"] = dataObj.LivechatCode;
        ajaxData["Email"] = dataObj.Email;
        ajaxData["Skype"] = dataObj.Skype;
        ajaxData["Wechat"] = dataObj.Wechat;
        ajaxData["Facebook"] = dataObj.Facebook;
        ajaxData["Instagram"] = dataObj.Instagram;
        ajaxData["Phone"] = dataObj.Phone;
        ajaxData["Line"] = dataObj.Line;
        ajaxData["Twitter"] = dataObj.Twitter;
        ajaxData["Whatsapp"] = dataObj.Whatsapp;
        ajaxData["Google"] = dataObj.Google;

        return _callRepository(deferred, ajaxData);
    };

    var _find = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/WebSite/FindWebSite';
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["MetaTitle"] = dataObj.MetaTitle;

        return _callRepository(deferred, ajaxData);
    };

    var _delete = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/WebSite/DelWebSite';
        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _update = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};

        ajaxData["ApiPath"] = '/api/WebSite/UpdateWebSite';
        ajaxData["ID"] = dataObj.ID;
        ajaxData["BrandName"] = dataObj.BrandName;
        ajaxData["PageTitle"] = dataObj.PageTitle;
        ajaxData["GoogleAnalytics"] = dataObj.GoogleAnalytics;
        ajaxData["FooterText"] = dataObj.FooterText;
        ajaxData["WebsiteUrl"] = dataObj.WebsiteUrl;
        ajaxData["MWebsiteUrl"] = dataObj.MWebsiteUrl;
        ajaxData["WebsiteStyleSCID"] = dataObj.WebsiteStyleSCID;
        ajaxData["LogoImg"] = dataObj.LogoImg;
        ajaxData["LogoFileName"] = dataObj.LogoFileName;
        ajaxData["LogoFileExtension"] = dataObj.LogoFileExtension;
        ajaxData["FaviconImg"] = dataObj.FaviconImg;
        ajaxData["FaviconFileName"] = dataObj.FaviconFileName;
        ajaxData["FaviconFileExtension"] = dataObj.FaviconFileExtension;
        ajaxData["LivecharUrl"] = dataObj.LivecharUrl;
        ajaxData["LivechatCode"] = dataObj.LivechatCode;
        ajaxData["Email"] = dataObj.Email;
        ajaxData["Skype"] = dataObj.Skype;
        ajaxData["Wechat"] = dataObj.Wechat;
        ajaxData["Facebook"] = dataObj.Facebook;
        ajaxData["Instagram"] = dataObj.Instagram;
        ajaxData["Phone"] = dataObj.Phone;
        ajaxData["Line"] = dataObj.Line;
        ajaxData["Twitter"] = dataObj.Twitter;
        ajaxData["Whatsapp"] = dataObj.Whatsapp;
        ajaxData["Google"] = dataObj.Google;

        return _callRepository(deferred, ajaxData);
    };

    factory.add = _add;
    factory.find = _find;
    factory.update = _update;
    factory.delete = _delete;
    return factory;
}]);