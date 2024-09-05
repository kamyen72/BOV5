'use strict';
app.factory('pageHelper', ['$rootScope', 'ngAuthSettings', function ($rootScope, ngAuthSettings) {
    var factory = {};

    var PageSizeArray = [20, 50, 100];
    var PagerObj = {
        CurrentPage: 1,
        PageSize: 10,
        TotalItems: 0,
        PageArray: [],
        PageRangeMax: 10,
        PageRangeMin: 1,
        thisPage: 1
    };

    var _getPagerObj = function () {
        return PagerObj;
    };

    var _getPageSizeArray = function () {
        return PageSizeArray;
    };

    var _setPageObj = function (pageObj) {
        PagerObj = pageObj;
        PagerObj["thisPage"] = pageObj.CurrentPage;
        PagerObj["thisPageSize"] = pageObj.PageSize;
        PagerObj["PageArray"] = [];
    };

    //換頁
    var _pageChanged = function (page, $scope) {
        var thisPageObj = PagerObj;

        if (page > 0) {
            if (page <= thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)]) {
                thisPageObj.CurrentPage = page;
                thisPageObj.PageRangeMin = page;
                thisPageObj.PageRangeMax = page + 9;
            }
            else {
                thisPageObj.CurrentPage = thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)];
                thisPageObj.thisPage = thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)];
                thisPageObj.PageRangeMin = page;
                thisPageObj.PageRangeMax = page + 9;
            }
        }
        else {
            thisPageObj.CurrentPage = 1;
            thisPageObj.thisPage = 1;
            thisPageObj.PageRangeMin = 1;
            thisPageObj.PageRangeMax = 1 + 9;
        }

        // CurrentPage為空時要給預設值
        if (!thisPageObj.CurrentPage) {
            thisPageObj.CurrentPage = 1;
        }

        // 當前頁面與傳入換頁值不同時才進行查詢
        if (thisPageObj.thisPage !== thisPageObj.CurrentPage ||
            thisPageObj.thisPageSize !== thisPageObj.PageSize) {
            thisPageObj.thisPageSize = thisPageObj.PageSize;
            $scope.search();
        }

        return thisPageObj;
    };

    // 計算頁數按鈕
    var _calculatorPageArray = function () {
        var thisPageObj = PagerObj;

        // 要有筆數才進行計算頁次
        if (thisPageObj.TotalItems > 0) {
            var totalPage = Math.ceil(thisPageObj.TotalItems / thisPageObj.PageSize);
            thisPageObj.TotalPage = totalPage;
            thisPageObj.PageArray = [];
            for (var i = 1; i <= totalPage; i++) {
                thisPageObj.PageArray.push(i);
            }
            if (thisPageObj.CurrentPage > thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)]) {
                thisPageObj.CurrentPage = 1;
                thisPageObj.thisPage = 1;
            }
            _pageChanged(thisPageObj.CurrentPage);
        }

        return thisPageObj;
    };

    factory.getPagerObj = _getPagerObj;
    factory.getPageSizeArray = _getPageSizeArray;
    factory.setPageObj = _setPageObj;
    factory.pageChanged = _pageChanged;
    factory.calculatorPageArray = _calculatorPageArray;

    return factory;
}]);