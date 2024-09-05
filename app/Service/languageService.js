'use strict';
app.factory('languageService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
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

    var _addFieldType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/language/AddFieldType';

        ajaxData["LanguageTypeID"] = dataObj.LanguageTypeID;
        ajaxData["DNS"] = dataObj.DNS;
        ajaxData["ControllerName"] = dataObj.ControllerName;
        ajaxData["ActionName"] = dataObj.ActionName;
        ajaxData["HasPageStatus"] = dataObj.HasPageStatus;
        ajaxData["PageStatus"] = dataObj.PageStatus;
        ajaxData["FamilyBigID"] = dataObj.FamilyBigID;
        ajaxData["FamilyMiddelID"] = dataObj.FamilyMiddelID;
        ajaxData["FamilySmallID"] = dataObj.FamilySmallID;
        ajaxData["FieldKey"] = dataObj.FieldKey;
        ajaxData["FieldValue"] = dataObj.FieldValue;
        ajaxData["FieldNotice"] = dataObj.FieldNotice;

        return _callRepository(deferred, ajaxData);
    };

    var _findFieldType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/language/FindFieldType';

        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["LanguageTypeID"] = dataObj.LanguageTypeID;
        ajaxData["DNS"] = dataObj.DNS;
        ajaxData["ControllerName"] = dataObj.ControllerName;
        ajaxData["FamilyBigID"] = dataObj.FamilyBigID;

        return _callRepository(deferred, ajaxData);
    };

    var _delFieldType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/language/DelFieldType';

        ajaxData["ID"] = dataObj.ID;

        return _callRepository(deferred, ajaxData);
    };

    var _updateFieldType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/language/UpdateFieldType';

        ajaxData["ID"] = dataObj.FieldTypeID;
        ajaxData["LanguageTypeID"] = dataObj.LanguageTypeID;
        ajaxData["DNS"] = dataObj.DNS;
        ajaxData["ControllerName"] = dataObj.ControllerName;
        ajaxData["ActionName"] = dataObj.ActionName;
        ajaxData["HasPageStatus"] = dataObj.HasPageStatus;
        ajaxData["PageStatus"] = dataObj.PageStatus;
        ajaxData["FamilyBigID"] = dataObj.FamilyBigID;
        ajaxData["FamilyMiddelID"] = dataObj.FamilyMiddelID;
        ajaxData["FamilySmallID"] = dataObj.FamilySmallID;
        ajaxData["FieldKey"] = dataObj.FieldKey;
        ajaxData["FieldValue"] = dataObj.FieldValue;
        ajaxData["FieldNotice"] = dataObj.FieldNotice;

        return _callRepository(deferred, ajaxData);
    };

    var _findLanguageType = function (dataObj) {
        var deferred = $q.defer();
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/language/FindLanguageType';

        return _callRepository(deferred, ajaxData);
    };

    factory.addFieldType = _addFieldType;
    factory.findFieldType = _findFieldType;
    factory.updateFieldType = _updateFieldType;
    factory.delFieldType = _delFieldType;
    factory.findLanguageType = _findLanguageType;
    return factory;
}]);