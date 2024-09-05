'use strict';
app.factory('thirdPartyService', ['$q', 'RepositoryHelper', function ($q, RepositoryHelper) {
    var factory = {};

    var _callRepository = function (deferred, ajaxData, config) {
        return RepositoryHelper.post(ajaxData, config);
    };

    var _callThirdPartyRepository = function (deferred, ajaxData, config) {
        return RepositoryHelper.getThirdParty(ajaxData, config);
    };

    var _findLotteryClass = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = dataObj.DateS;
        ajaxData["DateE"] = dataObj.DateE;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["GameRoomID"] = dataObj.GameRoomID; 
        ajaxData["ApiPath"] = '/api/Lottery/FindLotteryClassLobby';

        return _callRepository(deferred, ajaxData, config);
    };

    var _findSlotMPlayer = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = dataObj.DateS;
        ajaxData["DateE"] = dataObj.DateE;
        ajaxData["Status"] = dataObj.Status;
        ajaxData["SlotTypeID"] = dataObj.SlotTypeID;
        ajaxData["UserName"] = dataObj.UserName;
        ajaxData["ApiPath"] = '/api/MPlayer/FindSlotMPlayer';

        return _callRepository(deferred, ajaxData, config);
    };

    var _findSlotMPlayerDetail = function (dataObj, config) {
        let deferred = $q.defer();
        let ajaxData = {};
        ajaxData["CurrentPage"] = dataObj.CurrentPage;
        ajaxData["PageSize"] = dataObj.PageSize;
        ajaxData["DateS"] = dataObj.DateS;
        ajaxData["DateE"] = dataObj.DateE;
        ajaxData["SlotTypeID"] = dataObj.SlotTypeID;
        ajaxData["MemberID"] = dataObj.MemberID;
        ajaxData["ApiPath"] = '/api/MPlayer/FindSlotMPlayerDetail';

        return _callRepository(deferred, ajaxData, config);
    };

    factory.findLotteryClass = _findLotteryClass;
    factory.findSlotMPlayer = _findSlotMPlayer;
    factory.findSlotMPlayerDetail = _findSlotMPlayerDetail;

    return factory;
}]);

//(function () {
//    const fn = "GameService";
//    const cachemapkey = fn + ".cachemap";
//    app.factory(fn, ['$q', '$http', '$timeout', '$interval', 'GameProviderEnum', 'localStorageService', 'RepositoryHelper',
//        function ($q, $http, $timeout, $interval, GameProviderEnum, localStorageService, RepositoryHelper) {

//            //console.log("init game service and localstorage[{0}]".format(localStorageService.getStorageType()));

//            var cachemap = localStorageService.get(cachemapkey)
//            if (!cachemap) {
//                cachemap = {
//                    getGameList: [],
//                };
//                localStorageService.set(cachemapkey, cachemap);
//            }

//            function setStorage(collkey, key, data) {
//                localStorageService.set(key, data);
//                var coll = cachemap[collkey];
//                if (!coll.includes(key)) {
//                    coll.push(key);
//                    localStorageService.set(cachemapkey, cachemap);
//                }
//            }

//            $interval(function () {
//                for (var key in cachemap) {
//                    var arr = cachemap[key];
//                    //console.log(key + "=>" + JSON.stringify(arr));
//                    for (var i = 0; i < arr.length; i++) {
//                        localStorageService.remove(arr[i]);
                        
//                    }
//                    if (arr.length > 0) console.log("clear localstorage for " + JSON.stringify(arr));
//                    arr.splice(0, arr.length);
//                }
//            }, 1000 * 60 * 5);

//            return {
//                getGamingLink: function (providerId, gameId) {
//                    var userName = localStorageService.get("UserName");
//                    var deferred = $q.defer();
//                    var url = game_api_base_url + "/GetGameUrl/OpenThirdPartyUrl/{0}/{1}/{2}".format(providerId, gameId, userName);
//                    var req = {
//                        method: 'GET',
//                        url: url,
//                        headers: {
//                            //'Content-Type': 'application/json'
//                        },
//                        //data: {},
//                        //responseType : "json"
//                    };

//                    RepositoryHelper.request(req).then(function (response) {

//                        if (response && response.data && response.data.url) {

//                            deferred.resolve(response.data.url);
//                        }
//                        else {
//                            throw new Error("unknow error on " + url);
//                            //deferred.reject({});
//                        }
//                    }).catch(function (e) {
//                        deferred.reject(e);
//                    });

//                    return deferred.promise;
//                },
//                //only test
//                getGameList: function (providerId) {
//                    var key = "_gamelist_" + providerId;
//                    var deferred = $q.defer();
//                    var data = localStorageService.get(key);

//                    if (data) {
//                        deferred.resolve(data);
//                    } else {

//                        $timeout(function () {

//                            if (GameProviderEnum.includes(providerId)) {
//                                console.log("generate a fake data");
//                                data = [
//                                    {
//                                        provider: providerId,
//                                        data: {
//                                            "gameID": "vs243mwarrior",
//                                            "gameName": "Monkey Warrior",
//                                            "gameTypeID": "vs",
//                                            "typeDescription": "Video Slots",
//                                            "technology": "html5",
//                                            "platform": "MOBILE,DOWNLOAD,WEB",
//                                            "demoGameAvailable": true,
//                                            "aspectRatio": "16:9",
//                                            "technologyID": "H5",
//                                            "gameIdNumeric": 1553615521,
//                                            "jurisdictions": ["99", "BG", "CO", "DK", "PT", "EE", "IT", "LV", "MT", "LT", "SE", "UK", "RO", "ES"],
//                                            "frbAvailable": true,
//                                            "variableFrbAvailable": true,
//                                            "lines": 25
//                                        }

//                                    },
//                                    {
//                                        provider: providerId,
//                                        data: {
//                                            "gameID": "vs117649starz",
//                                            "gameName": "行星宝石 Megaways",
//                                            "gameTypeID": "vs",
//                                            "typeDescription": "Video Slots",
//                                            "technology": "html5",
//                                            "platform": "MOBILE,DOWNLOAD,WEB",
//                                            "demoGameAvailable": true,
//                                            "aspectRatio": "16:9",
//                                            "technologyID": "H5",
//                                            "gameIdNumeric": 1553615521,
//                                            "jurisdictions": ["99", "BG", "CO", "DK", "PT", "EE", "IT", "LV", "MT", "LT", "SE", "UK", "RO", "ES"],
//                                            "frbAvailable": true,
//                                            "variableFrbAvailable": true,
//                                            "lines": 25
//                                        }
//                                    },
//                                    {
//                                        provider: providerId,
//                                        data: {
//                                            "gameID": "vs1money",
//                                            "gameName": "钱生钱",
//                                            "gameTypeID": "vs",
//                                            "typeDescription": "Video Slots",
//                                            "technology": "html5",
//                                            "platform": "MOBILE,DOWNLOAD,WEB",
//                                            "demoGameAvailable": true,
//                                            "aspectRatio": "16:9",
//                                            "technologyID": "H5",
//                                            "gameIdNumeric": 1553615521,
//                                            "jurisdictions": ["99", "BG", "CO", "DK", "PT", "EE", "IT", "LV", "MT", "LT", "SE", "UK", "RO", "ES"],
//                                            "frbAvailable": true,
//                                            "variableFrbAvailable": true,
//                                            "lines": 25
//                                        }
//                                    }

//                                ];
//                                setStorage('getGameList', key, data);
//                                deferred.resolve(data);
//                            } else {
//                                deferred.reject("service unknow provider " + providerId);
//                            }

//                        }, 1000);

//                    }

//                    return deferred.promise;
//                },
//            };
//        }]);

//}());