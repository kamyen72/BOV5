// Service proxy位置
//var serviceBase = 'http://220.135.120.11/HKPK10.API';

//var app = angular.module('HRSApp', ['kendo.directives', 'blockUI', 'ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'kendo.window']);

var app = angular.module('BackDeskView', ['blockUI', 'ngRoute', 'LocalStorageModule', 'angular-loading-bar',
    'ngSanitize', 'autocomplete', 'ngCookies', 'pascalprecht.translate']);

// url route設定
app.config(['$routeProvider', '$translateProvider', 'localStorageServiceProvider',
        function ($routeProvider, $translateProvider, localStorageServiceProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: './content/Language/',
        suffix: '.json'
    }).registerAvailableLanguageKeys(['en-US', 'zh-TW', 'zh-CN'], {
        'en': 'en-US',
        'tw': 'zh-TW',
        'cn': 'zh-CN'
    }).preferredLanguage('en-US')
        .fallbackLanguage('en-US');

    localStorageServiceProvider.setPrefix(STORAGE_PREFIX);

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "./app/Views/home.html",
        allowAnonymous: true
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "./app/Views/login.html",
        allowAnonymous: true
    });

    $routeProvider.when("/personProfile", {
        controller: "memberManageController",
        templateUrl: "./app/Views/memberManage.html",
        allowAnonymous: true
    });

    $routeProvider.when("/memberManage", {
        controller: "memberManageController",
        templateUrl: "./app/Views/memberManage.html",
        allowAnonymous: true
    });

    $routeProvider.when("/subAdminManage", {
        controller: "subAdminManageController",
        templateUrl: "./app/Views/subAdminManage.html",
        allowAnonymous: true
    });

    $routeProvider.when("/memberOnline", {
        controller: "memberOnlineController",
        templateUrl: "./app/Views/memberOnline.html",
        allowAnonymous: true
    });

    $routeProvider.when("/checkMemberIP", {
        controller: "checkMemberIPController",
        templateUrl: "./app/Views/checkMemberIP.html",
        allowAnonymous: true
    });

    $routeProvider.when("/memberGroup", {
        controller: "memberGroupController",
        templateUrl: "./app/Views/memberGroup.html",
        allowAnonymous: true
    });

    $routeProvider.when("/functionGroup", {
        controller: "functionGroupController",
        templateUrl: "./app/Views/functionGroup.html",
        allowAnonymous: true
    });

    $routeProvider.when("/apiDefault", {
        controller: "apiDefaultController",
        templateUrl: "./app/Views/apiDefault.html",
        allowAnonymous: true
    });

    $routeProvider.when("/agencyFee", {
        controller: "agencyFeenController",
        templateUrl: "./app/Views/agencyFee.html",
        allowAnonymous: true
    });

    $routeProvider.when("/promotionSettings", {
        controller: "promotionSettingsController",
        templateUrl: "./app/Views/promotionSettings.html",
        allowAnonymous: true
    });

    $routeProvider.when("/winLoseReport", {
        controller: "winLoseReportController",
        templateUrl: "./app/Views/winLoseReport.html",
        allowAnonymous: true
    });

    $routeProvider.when("/betReport", {
        controller: "betReportController",
        templateUrl: "./app/Views/betReport.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/slotReport", {
        controller: "slotReportController",
        templateUrl: "./app/Views/slotReport.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/userLevelSummary", {
        controller: "userLevelSummaryController",
        templateUrl: "./app/Views/userLevelSummary.html",
        allowAnonymous: true
    });

    $routeProvider.when("/userLevelSetting", {
        controller: "userLevelSettingController",
        templateUrl: "./app/Views/userLevelSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/systemConfig", {
        controller: "systemConfigController",
        templateUrl: "./app/Views/systemConfig.html",
        allowAnonymous: true
    });

    $routeProvider.when("/mCompany", {
        controller: "mCompanyController",
        templateUrl: "./app/Views/mCompany.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/gameDealerCompany", {
        controller: "gameDealerCompanyController",
        templateUrl: "./app/Views/gameDealerCompany.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/transactionsHistory", {
        controller: "transactionsHistoryController",
        templateUrl: "./app/Views/transactionsHistory.html",
        allowAnonymous: true
    });

    $routeProvider.when("/referralSetting", {
        controller: "referralSettingController",
        templateUrl: "./app/Views/referralSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/referralLog", {
        controller: "referralLogController",
        templateUrl: "./app/Views/referralLog.html",
        allowAnonymous: true
    });

    $routeProvider.when("/bulletin", {
        controller: "bulletinSettingController",
        templateUrl: "./app/Views/bulletinSetting.html",
        allowAnonymous: false
    });

    $routeProvider.when("/banner", {
        controller: "bannerSettingController",
        templateUrl: "./app/Views/bannerSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/adjustment", {
        controller: "adjustmentController",
        templateUrl: "./app/Views/adjustment.html",
        allowAnonymous: true
    });

    $routeProvider.when("/errorCode", {
        controller: "errorCodeController",
        templateUrl: "./app/Views/errorCode.html",
        allowAnonymous: true
    });

    $routeProvider.when("/gameRoomType", {
        controller: "gameRoomTypeController",
        templateUrl: "./app/Views/gameRoomType.html",
        allowAnonymous: true
    });

    $routeProvider.when("/acceptedBank", {
        controller: "acceptedBankController",
        templateUrl: "./app/Views/acceptedBank.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cBankSetting", {
        controller: "cBankSettingController",
        templateUrl: "./app/Views/cBankSetting.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/cBankGroup", {
        controller: "cBankGroupController",
        templateUrl: "./app/Views/cBankGroup.html",
        allowAnonymous: true
    }); 

    $routeProvider.when("/cashBackSetting", {
        controller: "cashBackSettingController",
        templateUrl: "./app/Views/cashBackSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cashRebateSetting", {
        controller: "cashRebateSettingController",
        templateUrl: "./app/Views/cashRebateSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cashBack", {
        controller: "cashBackController",
        templateUrl: "./app/Views/cashBack.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cashRebate", {
        controller: "cashRebateController",
        templateUrl: "./app/Views/cashRebate.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cashBackLog", {
        controller: "cashBackLogController",
        templateUrl: "./app/Views/cashBackLog.html",
        allowAnonymous: true
    });

    $routeProvider.when("/cashRebateLog", {
        controller: "cashRebateLogController",
        templateUrl: "./app/Views/cashRebateLog.html",
        allowAnonymous: true
    });

    $routeProvider.when("/seoSetting", {
        controller: "seoSettingController",
        templateUrl: "./app/Views/seoSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/webSiteSetting", {
        controller: "webSiteSettingController",
        templateUrl: "./app/Views/webSiteSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/instantTransaction", {
        controller: "instantTransactionController",
        templateUrl: "./app/Views/instantTransaction.html",
        allowAnonymous: true
    });

    $routeProvider.when("/languageSetting", {
        controller: "languageSettingController",
        templateUrl: "./app/Views/languageSetting.html",
        allowAnonymous: true
    });

    $routeProvider.when("/manualOpenLottery", {
        controller: "manualOpenLotteryController",
        templateUrl: "./app/Views/manualOpenLottery.html",
        allowAnonymous: true
    });

    $routeProvider.when("/outstandingReport", {
        controller: "outstandingReportController",
        templateUrl: "./app/Views/outstandingReport.html",
        allowAnonymous: true
    });

    $routeProvider.when("/NotFind", {
        controller: "NotFindController",
        templateUrl: "./app/Views/NotFind.html",
        allowAnonymous: true
    });

    $routeProvider.otherwise({ redirectTo: "/login" });
}]);

// angular基本設定宣告
app.constant('ngAuthSettings', {
    //apip: apip,
    //apID: apID,
    apiServiceBaseUri: serviceBase,
    //authorizationData: {},
    //authenticationUri: authenticationUri,
    //clientID: clientID,
    //clientKey: clientKey
    language: 'zh-TW',
    menuShow: 'false',
    topBarShow: 'false',
    leftBarShow: 'false',
    headers: '',
    modalMsg: {
        title: '標題',
        msg: '',
        clickValue: false,
        callBack: '',
        type: ''
    },
    fileinde: {},
    userInfo: {},
    platformList: [],
    platformCode: '',
    apiType: 'API', // Platform & API
});

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    //$httpProvider.interceptors.push(function ($q) {
    //    return {
    //        'isLoggedIn': function (config) {
    //            return config || $q.when(config);
    //        }
    //        //'request': function (config) {
    //        //    return config || $q.when(config);
    //        //},
    //        //'response': function (response) {
    //        //    return response || $q.when(response);
    //        //}
    //    };
    //});
}]);

app.config(['blockUIConfig', function (blockUIConfig) {
    blockUIConfig.autoBlock = false;
}]);

app.filter('userName', function () {
	return function(userName){
        let account = '';
        let platformCode = '';
        if(userName) {
            let userNameSplit = (userName || '').split('_');
            if (!IS_MASTER && userNameSplit.length > 1) {
                account = userNameSplit[1];
                platformCode = userNameSplit[0];
            } else {
                account = userName;
                platformCode = '';
            }
        }
		return account;
	};
});
//app.run(['authService', function (authService) {
//	authService.fillAuthData();
//}]);

app.run(['authInterceptorService', '$rootScope',
    function (authInterceptorService, $rootScope) {
        // 在換頁時進行Service檢查
        $rootScope.$on('$routeChangeStart', function (event) {
            $rootScope.isLogin = authInterceptorService.isLogin(event);
        });
    }]);

// 共用function
(function ($) {
    $.extend({
        hideScrollBar: function () {
            $("body").css({
                overflow: "hidden"
            });

            if (window.innerHeight < $("body").height()) {
                $("#wrapper").css({
                    "margin-left": "-17px"
                });
            }
        },
        showScrollBar: function () {
            $("body").css({
                overflow: "auto"
            });

            $("#wrapper").css({
                "margin-left": "0px"
            });
        }
    });
})(jQuery);
