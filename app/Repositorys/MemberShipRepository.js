'use strict';
app.factory('MemberShipRepository', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
    var factory = {};

    function checkResposeLogin(resCode) {
        if (resCode === '200') {
            $location.path('login');
        }
    }

    var _findSiteMap = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/MemberShip/FindSiteMap';

        //return $http.post(ngAuthSettings.apiServiceBaseUri, ajaxData).then(
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _findUser = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/FindMember';
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _findAgentMember = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/FindAgentMember';
        ajaxData["ApiPath"] = '/api/MemberShip/FindAgentMember';
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _getUser = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/GetMember';
        ajaxData["ApiPath"] = '/api/MemberShip/GetMember';
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _findLoginHistory = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/findLoginHistory';
        ajaxData["ApiPath"] = '/api/MemberShip/findLoginHistory';
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _forgetPwd = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/MemberShip/ForgetPwd';
        //return $http.post(ngAuthSettings.apiServiceBaseUri, ajaxData).then(
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _login = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/Login';
        //return $http.post(ngAuthSettings.apiServiceBaseUri, ajaxData).then(
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _logout = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Logout';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/Logout';

        //return $http.post(ngAuthSettings.apiServiceBaseUri, ajaxData).then(
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _addMember = function (ajaxData) {
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/AddMember';
        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _updateUser = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/UpdateMember';

        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _delMember = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/Login';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/DelMember';

        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _changePwdMember = function (ajaxData) {
        //ajaxData["ApiPath"] = '/proxy/api/MemberShip/ChangePwdMember';
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/ChangePwdMember';

        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _changeGameDealerPwdMemberByBack = function (ajaxData) {
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/ChangePwdMemberByBack';

        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };

    var _genValidatorCode = function () {
        var ajaxData = {};
        ajaxData["ApiPath"] = '/api/GameDealerMemberShip/GenValidatorCode';

        return $http.post(ngAuthSettings.apiServiceBaseUri + ajaxData["ApiPath"], ajaxData).then(
            function success(response, status) {
                checkResposeLogin(response.data.APIRes.ResCode);
                return response;
            },
            function error(data, status) {
                return data;
            }
        );
    };    

    factory.findSiteMap = _findSiteMap;
    factory.findUser = _findUser; 
    factory.findAgentMember = _findAgentMember;
    factory.getUser = _getUser; 
    factory.findLoginHistory = _findLoginHistory;
    factory.forgetPwd = _forgetPwd;
    factory.login = _login;
    factory.logout = _logout;
    factory.addMember = _addMember;
    factory.updateUser = _updateUser;
    factory.delMember = _delMember;
    factory.changePwdMember = _changePwdMember;
    factory.changeGameDealerPwdMemberByBack = _changeGameDealerPwdMemberByBack;
    factory.genValidatorCode = _genValidatorCode;
    return factory;
}]);