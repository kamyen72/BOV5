'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;

	var userServiceUri = ngAuthSettings.userServiceUri;
	var authServiceFactory = {};

	var _authentication = {
		loginDate: null,
		isAuth: false,
		useRefreshTokens: false,
		comID: "",
		comName: "",
		hrDeptID: "",
		fullDeptName: "",
		deptName: "",
		hrDept0000ID: "",
		dept0000Name: "",
		hrDept000ID: "",
		dept000Name: "",
		hrDept00ID: "",
		dept00Name: "",
		uid: "",
		empID: "",
		userID: "",
		userName: "",
		titleID: "",
		titleName: "",
		buildingID: "",
		buildingName: "",
		officeID: "",
		officeName: "",
		phoneNo: "",
		email: "",
		mobile: "",
		ext: ""
	};

	var _externalAuthData = {
		provider: "",
		userName: "",
		externalAccessToken: ""
	};

	var _saveRegistration = function (registration) {

		_logOut();

		return $http.post(userServiceUri + './api/account/register', registration).then(function (response) {
			return response;
		});

	};

	var _login = function (ajaxData) {
		var deferred = $q.defer();
		$http.post(userServiceUri + './api/User/GetUser', ajaxData).success(function (response) {
			var authorizationData = {};
			var user = response.User;
			authorizationData.loginDate = new Date().getDate();
			authorizationData.comID = user.ComID;
			authorizationData.comName = user.ComName;
			authorizationData.hrDeptID = user.HRDeptID;
			authorizationData.deptName = user.DeptName;
			authorizationData.fullDeptName = user.FullDeptName;
			authorizationData.hrDept0000ID = user.HRDept0000ID;
			authorizationData.dept0000Name = user.Dept0000Name;
			authorizationData.hrDept000ID = user.HRDept000ID;
			authorizationData.dept000Name = user.Dept000Name;
			authorizationData.hrDept00ID = user.HRDept00ID;
			authorizationData.dept00Name = user.Dept00Name;
			authorizationData.uid = user.UID;
			authorizationData.empID = user.EmpID;
			authorizationData.userID = user.UserID;
			authorizationData.userName = user.UserName;
			authorizationData.titleID = user.TitleID;
			authorizationData.titleName = user.TitleName;
			authorizationData.buildingID = user.BuildingID;
			authorizationData.buildingName = user.BuildingName;
			authorizationData.officeID = user.OfficeID;
			authorizationData.officeName = user.OfficeName;
			authorizationData.phoneNo = user.PhoneNo;
			authorizationData.email = user.Email;
			authorizationData.mobile = user.Mobile;
			authorizationData.ext = user.Ext;
			localStorageService.set('authorizationData', authorizationData);

			_authentication.loginDate = authorizationData.loginDate;
			_authentication.isAuth = true;
			_authentication.useRefreshTokens = false;
			_authentication.comID = authorizationData.comID;
			_authentication.comName = authorizationData.comName;
			_authentication.hrDeptID = authorizationData.hrDeptID;
			_authentication.deptName = authorizationData.deptName;
			_authentication.fullDeptName = authorizationData.fullDeptName;
			_authentication.hrDept0000ID = authorizationData.hrDept0000ID;
			_authentication.dept0000Name = authorizationData.dept0000Name;
			_authentication.hrDept000ID = authorizationData.hrDept000ID;
			_authentication.dept000Name = authorizationData.dept000Name;
			_authentication.hrDept00ID = authorizationData.hrDept00ID;
			_authentication.dept00Name = authorizationData.dept00Name;
			_authentication.uid = authorizationData.uid;
			_authentication.empID = authorizationData.empID;
			_authentication.userID = authorizationData.userID;
			_authentication.userName = authorizationData.userName;
			_authentication.titleID = authorizationData.titleID;
			_authentication.titleName = authorizationData.titleName;
			_authentication.buildingID = authorizationData.buildingID;
			_authentication.buildingName = authorizationData.buildingName;
			_authentication.officeID = authorizationData.officeID;
			_authentication.officeName = authorizationData.officeName;
			_authentication.phoneNo = authorizationData.phoneNo;
			_authentication.email = authorizationData.email;
			_authentication.mobile = authorizationData.mobile;
			_authentication.ext = authorizationData.ext;
			deferred.resolve(response);
		}).error(function (err, status) {
			deferred.reject(err);
		});

		return deferred.promise;
	};

	var _logOut = function () {
		localStorageService.remove('authorizationData');
		_authentication.loginDate = null;
		_authentication.isAuth = false;
		_authentication.useRefreshTokens = false;
		_authentication.comID = "";
		_authentication.comName = "";
		_authentication.hrDeptID = "";
		_authentication.fullDeptName = "";
		_authentication.deptName = "";
		_authentication.hrDept0000ID = "";
		_authentication.dept0000Name = "";
		_authentication.hrDept000ID = "";
		_authentication.dept000Name = "";
		_authentication.hrDept00ID = "";
		_authentication.dept00Name = "";
		_authentication.uid = "";
		_authentication.empID = "";
		_authentication.userID = "";
		_authentication.userName = "";
		_authentication.titleID = "";
		_authentication.titleName = "";
		_authentication.buildingID = "";
		_authentication.buildingName = "";
		_authentication.officeID = "";
		_authentication.officeName = "";
		_authentication.phoneNo = "";
		_authentication.email = "";
		_authentication.mobile = "";
		_authentication.ext = "";
	};

	var _fillAuthData = function () {
		var authData = localStorageService.get('authorizationData');
		if (authData) {
			_authentication.isAuth = true;
			_authentication.useRefreshTokens = authData.useRefreshTokens;
			_authentication.comID = authData.comID;
			_authentication.comName = authData.comName;
			_authentication.hrDeptID = authData.hrDeptID;
			_authentication.deptName = authData.deptName;
			_authentication.fullDeptName = authData.fullDeptName;
			_authentication.hrDept0000ID = authData.hrDept0000ID;
			_authentication.dept0000Name = authData.dept0000Name;
			_authentication.hrDept000ID = authData.hrDept000ID;
			_authentication.dept000Name = authData.dept000Name;
			_authentication.hrDept00ID = authData.hrDept00ID;
			_authentication.dept00Name = authData.dept00Name;
			_authentication.uid = authData.uid;
			_authentication.empID = authData.empID;
			_authentication.userID = authData.userID;
			_authentication.userName = authData.userName;
			_authentication.titleID = authData.titleID;
			_authentication.titleName = authData.titleName;
			_authentication.buildingID = authData.buildingID;
			_authentication.buildingName = authData.buildingName;
			_authentication.officeID = authData.officeID;
			_authentication.officeName = authData.officeName;
			_authentication.phoneNo = authData.phoneNo;
			_authentication.email = authData.email;
			_authentication.mobile = authData.mobile;
			_authentication.ext = authData.ext;
		}
		else {
			// 測試資料
			_authentication.comID = true;
			_authentication.comID = 1;
			_authentication.comName = '台灣大哥大股份有限公司';
			_authentication.hrDeptID = "IQB100";
			_authentication.hrDeptName = '通路暨金流技術處 / 通路服務系統部 / 管理資訊系統課';
			//_authentication.empID = "5510048";
			_authentication.empID = "5505761";
			//_authentication.uid = 121394;
			_authentication.uid = 108645;
			//_authentication.uid = 123091;
			_authentication.userID = "Vikky";
			_authentication.userName = "周*雯 ";
			_authentication.phoneNo = "10930";
			_authentication.useRefreshTokens = true;
		}
	};

	authServiceFactory.login = _login;
	authServiceFactory.logOut = _logOut;
	authServiceFactory.fillAuthData = _fillAuthData;
	authServiceFactory.authentication = _authentication;

	return authServiceFactory;
}]);