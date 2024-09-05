'use strict';

app.controller('NotFindController', [
    '$scope',
    '$rootScope',
    '$location',
    '$timeout',
    'blockUI',
    'ngAuthSettings',
    'authService',
    function ($scope, $rootScope, $location, $timeout, blockUI, ngAuthSettings, authService) {
        blockUI.start();

        $scope.dataSource = {
            Language: [
                { text: '中文', values: 'zh-TW' },
                { text: 'English', values: 'En' }
            ],// 語系切換使用
            firstNowIndex: -1,// 第一層位置
            secondNowIndex: -1,// 第二層位置
            contisionCodeSet: [
                { text: '是', values: 'true' },
                { text: '否', values: 'false' },
            ],
            modalMsg: {}
        };

        //初始化載入
        $scope.initSearchSet = function () {
            // 有初始化才必需填入
        };

        // initial
        $scope.init = function () {
            $timeout(function () {
                blockUI.stop();
            }, 1000);
        };

        $timeout(function () { $scope.init(); }, 10);
    }]);