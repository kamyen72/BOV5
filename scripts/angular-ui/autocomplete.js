﻿/* --- Made by justgoscha and licensed under MIT license --- */

var app = angular.module('autocomplete', []);

app.directive('autocomplete', function () {
	var index = -1;

	return {
		restrict: 'E',
		scope: {
			searchParam: '=ngModel',
			suggestions: '=data',
			onType: '=onType',
			onSelect: '=onSelect',
			autocompleteRequired: '=',
			noAutoSort: '=noAutoSort',
			setDisable: '=ngDisabled',
		},
		controller: ['$scope', function ($scope) {

			$scope.$watch('setDisable', function () {
				$scope.isDisable = $scope.setDisable;
			});

			// the index of the suggestions that's currently selected
			$scope.selectedIndex = -1;

			$scope.initLock = true;

			// set new index
			$scope.setIndex = function (i) {
				$scope.selectedIndex = parseInt(i);
			};

			this.setIndex = function (i) {
				$scope.setIndex(i);
				$scope.$apply();
			};

			$scope.getIndex = function (i) {
				return $scope.selectedIndex;
			};

			// watches if the parameter filter should be changed
			var watching = true;

			// autocompleting drop down on/off
			$scope.completing = false;

			// starts autocompleting on typing in something
			$scope.$watch('searchParam.text', function (newValue, oldValue) {

				if (oldValue === newValue || (!oldValue && $scope.initLock)) {
					return;
				}

			    // 20170713 Yark加入，AutoComplete text為空時，進行重置
				if ($scope.searchparam && $scope.searchParam.text == '') {
					$scope.searchParam = {
						text: ""
					};
				}

				if (watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
					$scope.completing = true;
					$scope.searchFilter = $scope.searchParam;
					$scope.selectedIndex = -1;
				}

				// function thats passed to on-type attribute gets executed
				if ($scope.onType)
					$scope.onType($scope.searchParam);
			});

			// for hovering over suggestions
			this.preSelect = function (suggestion) {

				watching = false;

				// this line determines if it is shown
				// in the input field before it's selected:
				//$scope.searchParam = $.extend(true, {}, suggestion);;

				$scope.$apply();
				watching = true;

			};

			$scope.preSelect = this.preSelect;

			this.preSelectOff = function () {
				watching = true;
			};

			$scope.preSelectOff = this.preSelectOff;

			// selecting a suggestion with RIGHT ARROW or ENTER
			$scope.select = function (suggestion) {
				if (suggestion) {
					// 20170713 Yark修改為取得物件進行變更為新物件
					$scope.searchParam = $.extend(true, {}, suggestion);
					$scope.searchFilter = $.extend(true, {}, suggestion);

					if ($scope.onSelect)
						$scope.onSelect($.extend(true, {}, suggestion));
				}
				watching = false;
				$scope.completing = false;
				setTimeout(function () { watching = true; }, 1000);
				$scope.setIndex(-1);
			};


		}],
		link: function (scope, element, attrs) {
			console.log(scope.noAutoSort)

			setTimeout(function () {
				scope.initLock = false;
				scope.$apply();
			}, 250);

			var attr = '';

			// Default atts
			scope.attrs = {
				"placeholder": "start typing...",
				"class": "",
				"id": "",
				"inputclass": "",
				"inputid": ""
			};

			for (var a in attrs) {
				attr = a.replace('attr', '').toLowerCase();
				// add attribute overriding defaults
				// and preventing duplication
				if (a.indexOf('attr') === 0) {
					scope.attrs[attr] = attrs[a];
				}
			}

			if (attrs.clickActivation) {
				element[0].onclick = function (e) {
					if (!scope.searchParam) {
						setTimeout(function () {
							scope.completing = true;
							scope.$apply();
						}, 200);
					}
				};
			}

			var key = { left: 37, up: 38, right: 39, down: 40, enter: 13, esc: 27, tab: 9 };

			document.addEventListener("keydown", function (e) {
				var keycode = e.keyCode || e.which;

				switch (keycode) {
					case key.esc:
						// disable suggestions on escape
						scope.select();
						scope.setIndex(-1);
						scope.$apply();
						e.preventDefault();
				}
			}, true);

			document.addEventListener("blur", function (e) {
				// disable suggestions on blur
				// we do a timeout to prevent hiding it before a click event is registered
				setTimeout(function () {
					scope.select();
					scope.setIndex(-1);
					scope.$apply();
				}, 150);
			}, true);

			element[0].addEventListener("keydown", function (e) {
				var keycode = e.keyCode || e.which;

				var l = angular.element(this).find('li').length;

				// this allows submitting forms by pressing Enter in the autocompleted field
				if (!scope.completing || l == 0) return;

				// implementation of the up and down movement in the list of suggestions
				switch (keycode) {
					case key.up:

						index = scope.getIndex() - 1;
						if (index < -1) {
							index = l - 1;
						} else if (index >= l) {
							index = -1;
							scope.setIndex(index);
							scope.preSelectOff();
							break;
						}
						scope.setIndex(index);

						if (index !== -1)
							scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

						scope.$apply();

						break;
					case key.down:
						index = scope.getIndex() + 1;
						if (index < -1) {
							index = l - 1;
						} else if (index >= l) {
							index = -1;
							scope.setIndex(index);
							scope.preSelectOff();
							scope.$apply();
							break;
						}
						scope.setIndex(index);

						if (index !== -1)
							scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

						break;
					case key.left:
						break;
					case key.right:
					case key.enter:
					case key.tab:

						index = scope.getIndex();
						// scope.preSelectOff();
						if (index !== -1) {
							scope.select(angular.element(angular.element(this).find('li')[index]).text());
							if (keycode == key.enter) {
								e.preventDefault();
							}
						} else {
							if (keycode == key.enter) {
								scope.select();
							}
						}
						scope.setIndex(-1);
						scope.$apply();

						break;
					case key.esc:
						// disable suggestions on escape
						scope.select();
						scope.setIndex(-1);
						scope.$apply();
						e.preventDefault();
						break;
					default:
						return;
				}

			});
		},
		template: `
        <div class="autocomplete {{ attrs.class }}" id="{{ attrs.id }}">
          <!-- b00303037: remove id="{{ attrs.inputid }}" from input attribute -->
          <input
			ng-disabled="isDisable"
            type="text"
            ng-model="searchParam.text"
            placeholder="{{ attrs.placeholder }}"
            class="form-control {{ attrs.inputclass }}"
            tabindex="{{ attrs.tabindex }}"
            name="{{ attrs.name }}"
            ng-required="{{ autocompleteRequired }}" />
          <ul ng-if="!noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">
            <li
              suggestion
              ng-repeat="suggestion in suggestions | filter:searchFilter | orderBy:\'toString()\' track by $index"
              index="{{ $index }}"
              val="{{ suggestion }}"
              ng-class="{ active: ($index === selectedIndex) }"
              ng-click="select(suggestion)"
              ng-bind-html="suggestion | highlight:searchParam">{{suggestion.text}}</li>
          </ul>
          <ul ng-if="noAutoSort" ng-show="completing && (suggestions | filter:searchFilter).length > 0">
            <li
              suggestion
              ng-repeat="suggestion in suggestions | filter:searchFilter track by $index"
              index="{{ $index }}"
              val="{{ suggestion }}"
              ng-class="{ active: ($index === selectedIndex) }"
              ng-click="select(suggestion)"
              ng-bind-html="suggestion | highlight:searchParam">{{suggestion.text}}</li>
          </ul>
        </div>`
	};
});

app.filter('highlight', ['$sce', function ($sce) {
	return function (input, searchParam) {
		if (typeof input === 'function') return '';
		if (searchParam) {
			var words = '';

			words = '(' +
				  searchParam.text.split(/\ /).join(' |') + '|' +
				  searchParam.text.split(/\ /).join('|') +
				')',
				exp = new RegExp(words, 'gi');

			// 20170713 Yark註解，此段回填會造成效能問題，且在input中已有ng-model因此不需使用
			//if (words.length) {
			//	input.text = input.text.replace(exp, "<span class=\"highlight\">$1</span>");
			//}
		}

		return $sce.trustAsHtml(input.text);
	};
}]);

app.directive('suggestion', function () {
	return {
		restrict: 'A',
		require: '^autocomplete', // ^look for controller on parents element
		link: function (scope, element, attrs, autoCtrl) {
			element.bind('mouseenter', function () {
				autoCtrl.preSelect(attrs.val);
				autoCtrl.setIndex(attrs.index);
			});

			element.bind('mouseleave', function () {
				autoCtrl.preSelectOff();
			});
		}
	};
});