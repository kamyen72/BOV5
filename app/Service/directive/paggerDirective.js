app.directive("pagination",  ['$parse', '$q', function ($parse, $q) {
    function CalculatorPageArray(thisPageObj) {
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
            if (thisPageObj.CurrentPage > 0) {
                thisPageObj.PageRangeMin = thisPageObj.CurrentPage;
                thisPageObj.PageRangeMax = thisPageObj.CurrentPage + 9;
            }
            else {
                thisPageObj.PageRangeMin = 1;
                thisPageObj.PageRangeMax = 1 + 9;
            }
            
        }
    }
    return {
        restrict: "E",
        replace: true,
        scope: {
            options: "=",
            pageChanged: "&"
        },
        template: `
             <section>
                <div class="col-12 mt-4 text-center">
                    <div>
                        {{ 'Show' | translate }}
                        <select ng-model="options.PageSize" ng-change="_PageChanged(1)">
                            <option ng-value="10">10</option>
                            <option ng-value="20">20</option>
                            <option ng-value="50">50</option>
                            <option ng-value="100">100</option>
                        </select> 
                        {{ 'Entries' | translate }}
                    </div>
                    <div class="tab-btns flex">
                        <button class="btn rectangle-btn" type="button"
                                ng-if="options.CurrentPage > options.PageArray[0]"
                                ng-click="_PageChanged(1)">
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            <span class="sr-only">Previous</span>
                        </button>
                        <button ng-class="{'btn rectangle-btn active': (page == options.CurrentPage),
                                              'btn rectangle-btn': !(page == options.CurrentPage)}"
                                ng-if="page < options.PageRangeMax && page >= (options.PageRangeMin - 1)"
                                ng-repeat="page in options.PageArray"
                                ng-click="_PageChanged(page)" type="button">
                            {{page}}
                        </button>
                        <button class="btn rectangle-btn" type="button"
                                ng-if="options.CurrentPage < options.PageArray[(options.PageArray.length - 1)]"
                                ng-click="_PageChanged(options.PageArray[(options.PageArray.length - 1)])">
                            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            <span class="sr-only">Next</span>
                        </button>
                    </div>
                </div>
            </section>`,
        controller: ['$scope', '$attrs',function ($scope, $attrs) {

            $scope._PageChanged = function (page) {
                var thisPageObj = $scope.options;

                if (page > 0) {
                    if (page <= thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)]) {
                        thisPageObj.CurrentPage = page;
                    }
                    else {
                        thisPageObj.CurrentPage = thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)];
                        thisPageObj.thisPage = thisPageObj.PageArray[(thisPageObj.PageArray.length - 1)];
                    }
                    thisPageObj.PageRangeMin = page;
                    thisPageObj.PageRangeMax = page + 9;
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
                    $scope.pageChanged();
                }
            };
        }],
        link: function (scope, element, attrs) {
            scope.$watch("options", function () {
                if (scope.options.TotalItems > 0) {
                    CalculatorPageArray(scope.options);
                }

            });
        }
    };
}]);