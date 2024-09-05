'use strict';
app.controller('gameRoomTypeController', [
	'$scope',
	'$rootScope',
	'$location',
	'$timeout',
	'localStorageService',
	'blockUI',
	'ngAuthSettings',
	'authService',
	'gameRoomService',
	'lotteryService',
	'betLimitSettingService',
	function ($scope, $rootScope, $location, $timeout, localStorageService, blockUI, ngAuthSettings, authService,
		gameRoomService, lotteryService, betLimitSettingService) {
		blockUI.start();

		$scope.dataSource = {
			pageStatus: 'lotteryTypeView',
			searchCondition: { CurrentPage: 1, PageSize: 500 },
			gameRoomTypeListData: [],
			gameRoomTypeInfo: {},
			lotteryClassListData: [],
			lotteryClassInfo: {},
			lotteryTypeListData: [],
			lotteryTypeInfo: { vwLotteryTypeLimit: [], Color: {value:'magnumYellow', code: '#e9bb29' }, SelOpenDayOfWeek: [{value:7, selected:false},{value:1, selected:false}, {value:2, selected:false},{value:3, selected:false},{value:4, selected:false},
				{value:5, selected:false},{value:6, selected:false} ], image: [] },
			lotteryInfoListData: [],
			lotteryInfo: { vwLotteryInfoLimit: [] },
			defaultSpecial4DLotteryType: {},
			special4DLotteryType: {},
			betLimitList: [],
			platform: {},
			PagerObj: {
				CurrentPage: 1,
				PageSize: 10,
				TotalItems: 0,
				PageArray: [],
				PageRangeMax: 10,
				PageRangeMin: 1,
				thisPage: 1
			},
			PagerObj2: {
				CurrentPage: 1,
				PageSize: 10,
				TotalItems: 0,
				PageArray: [],
				PageRangeMax: 10,
				PageRangeMin: 1,
				thisPage: 1
			},
			PagerObj3: {
				CurrentPage: 1,
				PageSize: 10,
				TotalItems: 0,
				PageArray: [],
				PageRangeMax: 10,
				PageRangeMin: 1,
				thisPage: 1
			},
			PagerObj4: {
				CurrentPage: 1,
				PageSize: 10,
				TotalItems: 0,
				PageArray: [],
				PageRangeMax: 10,
				PageRangeMin: 1,
				thisPage: 1
			},
			openData: {},
			EditPassword: {
				isShow: true,
				type: null,
				Pwd: null,
				ConfirmPwd: null
			},
			callBack: null,
			parameter: {},
			// agent4dColor: ['magnumYellow', 'dirwanBlue', 'totoRed', 'sandakanColor', 'SydneyOrange', 'poolsBlue', 'constellationGreen', 'constellationBlue', 'constellationPurple']
			agent4dColor: [{value:'magnumYellow', code: '#e9bb29' }, {value:'dirwanBlue', code: '#1c1684' }, {value:'totoRed', code: '#ff5f5f' }, {value:'sandakanColor', code: '#008a10' },
		 					{value:'SydneyOrange', code: '#f47520' }, {value:'poolsBlue', code: '#004a90' }, {value:'constellationGreen', code: 'rgb(1, 60, 45)' }, {value:'constellationBlue', code: 'rgb(4, 62, 178)' },
							{value:'constellationPurple', code: 'rgb(108, 4, 178)' }],
			IsSpecialAgent: false
		};

		$scope.init = function () {
			const userInfo = localStorageService.get('UserInfo');
			$scope.dataSource.IsSpecialAgent = userInfo.IsSpecialAgent;
			// alert(JSON.stringify(localStorageService.get('PlatformSetting')));
			$scope.dataSource.platform = localStorageService.get('PlatformSetting');
			// console.log($scope.dataSource.platform)
			$scope.searchLotteryClass();
			$scope.getDefaultSpecial4DLotteryType();
			$scope.getSpecial4DLotteryType();
			//$scope.searchGameRoomType();
			//$scope.searchBetLimit();
		};

		$timeout($scope.init, 100);

		$scope.updateEditPassword = function (form) {
			if ($rootScope.valid(form) || !$scope.dataSource.EditPassword.type) {
				$scope.searchLotteryType();
				return;
			}

			$scope.checkGamePwd();
		};

		$scope.closePwd = function () {
			$scope.searchLotteryType();
		};

		$scope.checkGamePwd = function () {
			$scope.dataSource.openData.GamePwd = $scope.dataSource.EditPassword.Pwd;

			lotteryService.checkGamePwd($scope.dataSource.openData).then(
				function success(response) {
					if (response.data.APIRes.ResCode === '000') {
						//
						$scope.dataSource.callBack($scope.dataSource.parameter);
					}
					else {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
						$rootScope.$broadcast('changeModalMsg');
						return;
					}
				},
				function error(response) {
					console.log(response);
				});
		};

		$scope.checkPwd = function (callBack, parameter) {
			$scope.dataSource.parameter = parameter !== undefined ? parameter : {};
			$scope.dataSource.callBack = callBack;//callBack;

			//if ($scope.dataSource.EditPassword.isShow) {
			//	$scope.dataSource.EditPassword.type = 'GameSetting';
			//	$scope.dataSource.EditPassword.Pwd = null;
			//	$scope.dataSource.EditPassword.ConfirmPwd = null;
			//	$('#ShowPasswordDialog').click();
			//}

            //Boss說移除密碼
            callBack(parameter);
		};

		$scope.searchBetLimit = function () {
			betLimitSettingService.find({ CurrentPage: 1, PageSize: 10000 })
				.then(
					function success(response, status, headers, config) {
						//alert(JSON.stringify(response.data.Rows.ListData));
						if (response.data.APIRes.ResCode === '000') {
							$scope.dataSource.betLimitList = response.data.Rows.ListData;
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(data, status, headers, config) {
					});
		};

		$scope.searchGameRoomType = function () {
			$scope.dataSource.searchCondition.CurrentPage = $scope.dataSource.PagerObj.CurrentPage;
			$scope.dataSource.searchCondition.PageSize = $scope.dataSource.PagerObj.PageSize;

			gameRoomService.find($scope.dataSource.searchCondition)
				.then(
					function success(response, status, headers, config) {
						if (response.data.APIRes.ResCode === '000') {
							$scope.dataSource.gameRoomTypeListData = response.data.Rows.ListData;
							//頁籤
							$scope.dataSource.PagerObj = response.data.Rows.PagerObj;
							$scope.dataSource.PagerObj["thisPage"] = $scope.dataSource.PagerObj.CurrentPage;
							$scope.dataSource.PagerObj["thisPageSize"] = $scope.dataSource.PagerObj.PageSize;
							$scope.dataSource.PagerObj["PageArray"] = [];
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
						blockUI.stop();
					},
					function error(data, status, headers, config) {
						blockUI.stop();
					});
		};

		$scope.addOrEditGameRoomType = function (form) {
			if ($rootScope.valid(form)) return;

			if ($scope.dataSource.gameRoomTypeInfo.GameRoomID) {
				gameRoomService.update($scope.dataSource.gameRoomTypeInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							$scope.searchGameRoomType();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(data, status, headers, config) {
					});
			} else {
				gameRoomService.add($scope.dataSource.gameRoomTypeInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							$scope.searchGameRoomType();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(data, status, headers, config) {
					});
			}
		};

		$scope.deleteGameRoomType = function (gameRoomTypeInfo) {
			$scope.dataSource.gameRoomTypeInfo = gameRoomTypeInfo;
			ngAuthSettings.modalMsg.title = 'Confirm';
			ngAuthSettings.modalMsg.msg = 'ConfirmDelete';
			ngAuthSettings.modalMsg.type = '000';
			ngAuthSettings.modalMsg.callBack = 'confirmDelGameRoomType';
			$rootScope.$broadcast('changeModalMsg', true);
		};

		$scope.$on('confirmDelGameRoomType', function (event) {
			gameRoomService.delete($scope.dataSource.gameRoomTypeInfo).then(
				function success(response) {
					if (response.data.APIRes.ResCode === '000') {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
						ngAuthSettings.modalMsg.callBack = 'showSearch';

						$rootScope.$broadcast('changeModalMsg');
						$scope.searchGameRoomType();
					}
					else {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

						$rootScope.$broadcast('changeModalMsg');

						$scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
						return;
					}
				},
				function error(data, status, headers, config) {
				});
		});

		$scope.changeAndSaveGameRoomType = function (gameRoomType) {
			$scope.dataSource.gameRoomTypeInfo = gameRoomType;
			$scope.addOrEditGameRoomType();
		};

		$scope.showGameRoomAdd = function () {
			$scope.dataSource.gameRoomTypeInfo = {};
			$('#ShowGameRoomDialog').click();
		};

		$scope.showGameRoomEdit = function (gameRoom) {
			$scope.dataSource.gameRoomTypeInfo = gameRoom;
			$('#ShowGameRoomDialog').click();
		};

		$scope.showLotteryClass = function (gameRoom) {
			$scope.dataSource.gameRoomTypeInfo = gameRoom;
			$scope.dataSource.pageStatus = 'lotteryClassView';
			$scope.dataSource.lotteryClassListData = [];
			$scope.dataSource.lotteryClassInfo = {};
			$scope.dataSource.lotteryTypeListData = [];
			$scope.dataSource.lotteryTypeInfo = {};
			$scope.dataSource.lotteryInfoListData = [];
			$scope.dataSource.lotteryInfo = {};
			$scope.searchLotteryClass();
		};

		$scope.searchLotteryClass = function () {
			$scope.dataSource.searchCondition.CurrentPage = $scope.dataSource.PagerObj2.CurrentPage;
			$scope.dataSource.searchCondition.PageSize = $scope.dataSource.PagerObj2.PageSize;
			$scope.dataSource.searchCondition.GameRoomID = $scope.dataSource.gameRoomTypeInfo.GameRoomID;

			lotteryService.findLotteryClass($scope.dataSource.searchCondition)
				.then(
					function success(response, status, headers, config) {
						if (response.data.APIRes.ResCode === '000') {
							console.log(response.data.Rows.ListData);
							
							$scope.dataSource.lotteryClassListData = response.data.Rows.ListData.filter(p=>p.LotteryClassID !== 6);
							$scope.dataSource.lotteryClassListData.unshift({ LotteryClassID: -1, LotteryClassName: 'All', GameRoomID: 1 });
                            
							// 將AgentGame切分出來
							const fourDlotteryClass = $scope.dataSource.lotteryClassListData.find(p=>p.LotteryClassID===5);
							fourDlotteryClass.IsAgentGame = false;
							fourDlotteryClass.lotteryTypes = fourDlotteryClass.lotteryTypes.filter(p=>p.IsAgentGame === false);

							const agentLotteryTypes = fourDlotteryClass.lotteryTypes.filter(p=>p.IsAgentGame === true);
							$scope.dataSource.lotteryClassListData.push({ LotteryClassID: 5, LotteryClassName: 'Special 4D', GameRoomID: 1, lotteryTypes: agentLotteryTypes, IsAgentGame: true });

							// if($scope.dataSource.IsSpecialAgent) {
							if (true) {
								$scope.dataSource.lotteryClassListData = $scope.dataSource.lotteryClassListData.filter(p=>p.IsAgentGame === true);
							}

							$scope.dataSource.lotteryClassInfo = $scope.dataSource.lotteryClassListData[0];
							console.log($scope.dataSource.lotteryClassInfo)
							//頁籤
							$scope.dataSource.PagerObj2 = response.data.Rows.PagerObj;
							$scope.dataSource.PagerObj2["thisPage"] = $scope.dataSource.PagerObj2.CurrentPage;
							$scope.dataSource.PagerObj2["thisPageSize"] = $scope.dataSource.PagerObj2.PageSize;
							$scope.dataSource.PagerObj2["PageArray"] = [];
							 
							$scope.searchLotteryType();
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
						blockUI.stop();
					},
					function error(data, status, headers, config) {
						blockUI.stop();
					});
		};

		$scope.addOrEditLotteryClass = function (form) {
			if ($rootScope.valid(form)) return;
			
			if ($scope.dataSource.lotteryClassInfo.LotteryClassID) {
				lotteryService.updateLotteryClass($scope.dataSource.lotteryClassInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							//$scope.searchLotteryClass();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(data, status, headers, config) {
					});
			} else {
				lotteryService.addLotteryClass($scope.dataSource.lotteryClassInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							//$scope.searchLotteryClass();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(response) {

					});
			}
		};

		$scope.deleteLotteryClass = function (lotteryClassInfo) {
			$scope.dataSource.lotteryClassInfo = lotteryClassInfo;
			ngAuthSettings.modalMsg.title = 'Confirm';
			ngAuthSettings.modalMsg.msg = 'ConfirmDelete';
			ngAuthSettings.modalMsg.type = '000';
			ngAuthSettings.modalMsg.callBack = 'confirmDelLotteryClassInfo';
			$rootScope.$broadcast('changeModalMsg', true);
		};

		$scope.$on('confirmDelLotteryClassInfo', function (event) {
			lotteryService.delLotteryClass($scope.dataSource.lotteryClassInfo).then(
				function success(response) {
					if (response.data.APIRes.ResCode === '000') {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
						ngAuthSettings.modalMsg.callBack = 'showSearch';

						$rootScope.$broadcast('changeModalMsg');
						$scope.searchLotteryClass();
					}
					else {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

						$rootScope.$broadcast('changeModalMsg');

						$scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
						return;
					}
				},
				function error(data, status, headers, config) {
				});
		});

        $scope.changeAndSaveLotteryClass = function (lotteryClass) {
			$scope.dataSource.lotteryClassInfo = lotteryClass;
			$scope.addOrEditLotteryClass();
		};

		$scope.showLotteryClassAdd = function () {
			$scope.dataSource.lotteryClassInfo = {};
			$('#ShowLotteryClassDialog').click();
		};

		$scope.showLotteryClassEdit = function (lotteryClass) {
			$scope.dataSource.lotteryClassInfo = lotteryClass;
			$('#ShowLotteryClassDialog').click();
		};


		$scope.showLotteryType = function (lotteryClass) {
			$scope.dataSource.lotteryClassInfo = lotteryClass;
			$scope.dataSource.pageStatus = 'lotteryTypeView';

			$scope.dataSource.lotteryTypeListData = [];
			$scope.dataSource.lotteryTypeInfo = {};
			$scope.dataSource.lotteryInfoListData = [];
			$scope.dataSource.lotteryInfo = {};
			$scope.searchLotteryType();
		};

		$scope.searchLotteryType = function () {
			//blockUI.start();
			$scope.dataSource.searchCondition.CurrentPage = $scope.dataSource.PagerObj3.CurrentPage;
			$scope.dataSource.searchCondition.PageSize = $scope.dataSource.PagerObj3.PageSize;
			$scope.dataSource.searchCondition.LotteryClassID = $scope.dataSource.lotteryClassInfo.LotteryClassID;
			$scope.dataSource.searchCondition.IsAgentGame = $scope.dataSource.lotteryClassInfo.IsAgentGame;

			console.log($scope.dataSource.searchCondition)
			lotteryService.findLotteryType($scope.dataSource.searchCondition)
				.then(
					function success(response, status, headers, config) {
						blockUI.stop();
						if (response.data.APIRes.ResCode === '000') {
							console.log(response.data.Rows.ListData);
							$scope.dataSource.lotteryTypeListData = response.data.Rows.ListData;
							//頁籤
							$scope.dataSource.PagerObj3 = response.data.Rows.PagerObj;
							$scope.dataSource.PagerObj3["thisPage"] = $scope.dataSource.PagerObj3.CurrentPage;
							$scope.dataSource.PagerObj3["thisPageSize"] = $scope.dataSource.PagerObj3.PageSize;
							$scope.dataSource.PagerObj3["PageArray"] = [];
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
						//blockUI.stop();
					},
					function error(data, status, headers, config) {
						//blockUI.stop();
					});
		};

		$scope.getDefaultSpecial4DLotteryType = function () {
			lotteryService.getDefaultSpecial4DLotteryType()
				.then(
					function success(response, status, headers, config) {
						blockUI.stop();
						if (response.data.APIRes.ResCode === '000') {
							$scope.dataSource.defaultSpecial4DLotteryType = response.data.Rows.QryData;
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
							$rootScope.$broadcast('changeModalMsg');
						}
						//blockUI.stop();
					},
					function error(data, status, headers, config) {
						//blockUI.stop();
					});
		};

		$scope.getSpecial4DLotteryType = function () {
			lotteryService.getSpecial4DLotteryType()
				.then(
					function success(response, status, headers, config) {
						blockUI.stop();
						if (response.data.APIRes.ResCode === '000') {
							$scope.dataSource.special4DLotteryType = response.data.Rows.QryData;
							console.log($scope.dataSource.special4DLotteryType)
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
							$rootScope.$broadcast('changeModalMsg');
						}
						//blockUI.stop();
					},
					function error(data, status, headers, config) {
						//blockUI.stop();
					});
		};

		$scope.addOrEditLotteryType = function (form) {
			if ($rootScope.valid(form)) return;
			
			blockUI.start();
			//$scope.dataSource.lotteryTypeInfo.LotteryClassID = $scope.dataSource.lotteryClassInfo.LotteryClassID;
			//$scope.dataSource.lotteryTypeInfo.LimitMapData = $scope.dataSource.lotteryTypeInfo.vwLotteryTypeLimit.filter(p => p.LimitID > 0).map(p => {
			//	return {
			//		ID: p.LotteryBetLimitMapID, LimitID: p.LimitID, LotteryClassID: p.LotteryClassID, LotteryTypeID: p.LotteryTypeID,
			//		LotteryInfoID: p.LotteryInfoID, ParentID: p.ParentlotteryClassListDataID
			//	};
			//});

			$scope.dataSource.lotteryTypeInfo.LotteryClassID = 5;
			$scope.dataSource.lotteryTypeInfo.IsOfficial = true;
			$scope.dataSource.lotteryTypeInfo.IsAgentGame = true;

			if($scope.dataSource.lotteryTypeInfo.image && $scope.dataSource.lotteryTypeInfo.image.length > 0) {
				$scope.dataSource.lotteryTypeInfo.Base64Img = $scope.dataSource.lotteryTypeInfo.image[0]["file"];
				$scope.dataSource.lotteryTypeInfo.FileName = $scope.dataSource.lotteryTypeInfo.image[0]["name"];
				$scope.dataSource.lotteryTypeInfo.FileExtension = $scope.dataSource.lotteryTypeInfo.image[0]["extension"];
			}

			if($scope.dataSource.lotteryTypeInfo.SelOpenDayOfWeek) {
				$scope.dataSource.lotteryTypeInfo.OpenDayOfWeek = $scope.dataSource.lotteryTypeInfo.SelOpenDayOfWeek.filter(p => p.selected).map(p => p.value).join(',');
			}

			if($scope.dataSource.lotteryTypeInfo.selHour >= 0 && $scope.dataSource.lotteryTypeInfo.selMinute){
				$scope.dataSource.lotteryTypeInfo.CurrentLotteryTime = $scope.dataSource.lotteryTypeInfo.selHour + ':' + $scope.dataSource.lotteryTypeInfo.selMinute;
			}

			if($scope.dataSource.lotteryTypeInfo.SelColor) {
				$scope.dataSource.lotteryTypeInfo.Color = $scope.dataSource.lotteryTypeInfo.SelColor.value;
			}

			if ($scope.dataSource.lotteryTypeInfo.LotteryTypeID) {
				var errMsg = '';
				if ($scope.dataSource.lotteryTypeInfo.image && $scope.dataSource.lotteryTypeInfo.image.length > 0) {
					if (document.getElementById('uploadImage').naturalHeight != 120 || document.getElementById('uploadImage').naturalWidth != 120) {
						errMsg += 'Image size must be 120x120 <br />'
					}
				}

				if(errMsg) {
					ngAuthSettings.modalMsg.title = "Message";
					ngAuthSettings.modalMsg.msg = errMsg;
	
					$rootScope.$broadcast('changeModalMsg');
					blockUI.stop();
					return;
				}


				lotteryService.updateLotteryType($scope.dataSource.lotteryTypeInfo).then(
					function success(response) {
						blockUI.stop();
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;// + ' － front end will be updated in 60sec';
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}

						$scope.searchLotteryType();
					},
					function error(data, status, headers, config) {
						blockUI.stop();
					});
			} else {
				var errMsg = ''
				if (!$scope.dataSource.lotteryTypeInfo.image || $scope.dataSource.lotteryTypeInfo.image.length <= 0) {
					errMsg += "Please Select 4D Image <br />";
				} else{
					if (document.getElementById('uploadImage').naturalHeight != 120 || document.getElementById('uploadImage').naturalWidth != 120) {
						errMsg += 'Image size must be 120x120 <br />'
					}
				}

				if(!$scope.dataSource.lotteryTypeInfo.CurrentLotteryTime){
					errMsg += "Please Select Current Lottery Time <br />";
				}

				if(!$scope.dataSource.lotteryTypeInfo.OpenDayOfWeek){
					errMsg += "Please Select Open Day Of Week <br />";
				}

				if(errMsg) {
					ngAuthSettings.modalMsg.title = "Message";
					ngAuthSettings.modalMsg.msg = errMsg;
	
					$rootScope.$broadcast('changeModalMsg');
					blockUI.stop();
					return;
				}

				lotteryService.addLotteryType($scope.dataSource.lotteryTypeInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;// + ' － front end will be updated in 60sec';
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							$scope.getSpecial4DLotteryType();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}

						$scope.searchLotteryType();
					},
					function error(data, status, headers, config) {
						blockUI.stop();
					});
			}
		};

		$scope.deleteLotteryType = function (lotteryTypeInfo) {
			$scope.dataSource.lotteryTypeInfo = lotteryTypeInfo;
			ngAuthSettings.modalMsg.title = 'Confirm';
			ngAuthSettings.modalMsg.msg = 'ConfirmDelete';
			ngAuthSettings.modalMsg.type = '000';
			ngAuthSettings.modalMsg.callBack = 'confirmDelLotteryType';
			$rootScope.$broadcast('changeModalMsg', true);
		};

		$scope.$on('confirmDelLotteryType', function (event) {
			lotteryService.delLotteryType($scope.dataSource.lotteryTypeInfo).then(
				function success(response) {
					if (response.data.APIRes.ResCode === '000') {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;// + ' － front end will be updated in 60sec';
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
						ngAuthSettings.modalMsg.callBack = 'showSearch';

						$rootScope.$broadcast('changeModalMsg');
						$scope.searchLotteryType();
					}
					else {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

						$rootScope.$broadcast('changeModalMsg');

						$scope.dataSource.errorMsg = response.data.APIRes.ResMessage;
						return;
					}
				},
				function error(data, status, headers, config) {
				});
		});

		$scope.changeAndSaveLotteryType = function (lotteryType) {
			$scope.dataSource.lotteryTypeInfo = lotteryType;
			$scope.addOrEditLotteryType();
		};

		$scope.showLotteryTypeAdd = function () { 
			const specialNumber = $scope.dataSource.special4DLotteryType.LotteryTypeID > 0 ? 
				parseInt($scope.dataSource.special4DLotteryType.LotteryTypeName.substring($scope.dataSource.special4DLotteryType.LotteryTypeName.length-3)) : 0;
			const specialLotteryTypeName = $scope.dataSource.platform.APICode + (specialNumber + 1).toString().padStart(3,'0')
			// const default4D = $scope.dataSource.lotteryTypeListData.find(p=>p.LotteryTypeID === 45);
			const default4D = $scope.dataSource.defaultSpecial4DLotteryType;
			
			// 清除directive的image
			$scope.$broadcast("clearImage");
			
			$scope.dataSource.lotteryTypeInfo = { 
				vwLotteryTypeLimit: [], 
				LotteryClassID: 5,
				LotteryTypeName: specialLotteryTypeName,
				LotteryTypeCode: specialLotteryTypeName,
				PeriodInterval: default4D.PeriodInterval,
				MaxBonusMoneyPool: default4D.MaxBonusMoneyPool,
				DrawBonusPercentage: default4D.DrawBonusPercentage,
				CompanyWinPercentage: default4D.CompanyWinPercentage,
				UserWinPercentage: default4D.UserWinPercentage,
				CompanyPresetCompensation: default4D.CompanyPresetCompensation,
				AIType: default4D.AIType,
				IsAgentGame: true,
				Status: true,
				SelColor: $scope.dataSource.agent4dColor[0],
				selHour: 0,
				selMinute: '00',
				SelOpenDayOfWeek: [{value:0, selected:false},{value:1, selected:false}, {value:2, selected:false},{value:3, selected:false},{value:4, selected:false},
					{value:5, selected:false},{value:6, selected:false} ]
			};
			$('#ShowLotteryTypeDialog').click();
		};

		$scope.showLotteryTypeEdit = function (lotteryType) {
			$scope.dataSource.lotteryTypeInfo = lotteryType;
			
			if($scope.dataSource.lotteryTypeInfo.URL.includes('color')){
				$scope.dataSource.lotteryTypeInfo.SelColor = $scope.dataSource.agent4dColor.find(f=>f.value == $scope.dataSource.lotteryTypeInfo.URL.split('?')[1].replace('color=',''));
			}
			if($scope.dataSource.lotteryTypeInfo.OpenDayOfWeek){
				$scope.dataSource.lotteryTypeInfo.SelOpenDayOfWeek = [];
				const OpenDayOfWeek = $scope.dataSource.lotteryTypeInfo.OpenDayOfWeek.split(',');
				debugger
				for(let i=0; i<7; i++){
					if(OpenDayOfWeek.includes(i.toString())) $scope.dataSource.lotteryTypeInfo.SelOpenDayOfWeek.push({value:i, selected:true})
					else $scope.dataSource.lotteryTypeInfo.SelOpenDayOfWeek.push({value:i, selected:false})
				}
			}
			if($scope.dataSource.lotteryTypeInfo.CurrentLotteryTime){
				$scope.dataSource.lotteryTypeInfo.selHour = parseInt($scope.dataSource.lotteryTypeInfo.CurrentLotteryTime.split(':')[0]);
				$scope.dataSource.lotteryTypeInfo.selMinute = $scope.dataSource.lotteryTypeInfo.CurrentLotteryTime.split(':')[1];
			}
			
			// 清除directive的image
			$scope.$broadcast("clearImage");
			$('#ShowLotteryTypeDialog').click();
		};


		$scope.showLotteryInfo = function (lotteryType) {
			$scope.dataSource.lotteryTypeInfo = lotteryType;
			$scope.dataSource.pageStatus = 'lotteryInfoView';

			$scope.dataSource.lotteryInfoListData = [];
			$scope.dataSource.lotteryInfo = {};
			$scope.searchLotteryInfo();
		};

		$scope.searchLotteryInfo = function () {
			$scope.dataSource.searchCondition.CurrentPage = $scope.dataSource.PagerObj4.CurrentPage;
			$scope.dataSource.searchCondition.PageSize = $scope.dataSource.PagerObj4.PageSize;
			$scope.dataSource.searchCondition.LotteryTypeID = $scope.dataSource.lotteryTypeInfo.LotteryTypeID;
			$scope.dataSource.searchCondition.Status = false;

			lotteryService.findLotteryInfo($scope.dataSource.searchCondition)
				.then(
					function success(response, status, headers, config) {
						if (response.data.APIRes.ResCode === '000') {
							console.log(response.data.Rows.ListData);
							$scope.dataSource.lotteryInfoListData = response.data.Rows.ListData;
							$scope.dataSource.lotteryInfoListData.forEach(p => {
								var selectArray = JSON.parse(p.SelectArray).map(m => {
									var result = '';
									if (m.odds) return m.text + ':' + m.odds;
									else return '';
								});
								selectArray = selectArray.filter(s => s !== '');
								p.ShowOdds = selectArray.join(',');
							});
							//頁籤
							$scope.dataSource.PagerObj4 = response.data.Rows.PagerObj;
							$scope.dataSource.PagerObj4["thisPage"] = $scope.dataSource.PagerObj4.CurrentPage;
							$scope.dataSource.PagerObj4["thisPageSize"] = $scope.dataSource.PagerObj4.PageSize;
							$scope.dataSource.PagerObj4["PageArray"] = [];
						} else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
						blockUI.stop();
					},
					function error(data, status, headers, config) {
						blockUI.stop();
					});
		};

		$scope.addOrEditLotteryInfo = function (form) {
			if ($rootScope.valid(form)) return;

			//$scope.dataSource.lotteryInfo.LotteryClassID = $scope.dataSource.lotteryClassInfo.LotteryClassID;
			$scope.dataSource.lotteryInfo.LotteryTypeID = $scope.dataSource.lotteryTypeInfo.LotteryTypeID;
			$scope.dataSource.lotteryInfo.DisCount = $scope.dataSource.lotteryInfo.DisCount / 100;
			if ($scope.dataSource.lotteryInfo.SelectArrayModel) {
				$scope.dataSource.lotteryInfo.SelectArrayModel.forEach(p => {
					if ($scope.dataSource.lotteryInfo.OneOdd) p.odds = $scope.dataSource.lotteryInfo.SelectArrayModel[0].odds;
					if (!p.odds) delete p["odds"];
					delete p["$$hashKey"];
				});
				$scope.dataSource.lotteryInfo.SelectArray = JSON.stringify($scope.dataSource.lotteryInfo.SelectArrayModel);
			}
			//$scope.dataSource.lotteryInfo.LimitMapData = $scope.dataSource.lotteryInfo.vwLotteryInfoLimit.filter(p => p.LimitID > 0).map(p => {
			//	return {
			//		ID: p.LotteryBetLimitMapID, LimitID: p.LimitID, LotteryClassID: p.LotteryClassID, LotteryTypeID: p.LotteryTypeID,
			//		LotteryInfoID: p.LotteryInfoID, ParentID: p.ParentID
			//	};
			//});

			if ($scope.dataSource.lotteryInfo.LotteryInfoID) {
				lotteryService.updateLotteryInfo($scope.dataSource.lotteryInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							$scope.searchLotteryInfo();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(response) {
						console.log(response);
					});
			} else {
				lotteryService.addLotteryInfo($scope.dataSource.lotteryInfo).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							$scope.searchLotteryInfo();
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
						}
					},
					function error(response) {

					});
			}
		};

		$scope.deleteLotteryInfo = function (lotteryInfo) {
			$scope.dataSource.lotteryInfo = lotteryInfo;
			ngAuthSettings.modalMsg.title = 'Confirm';
			ngAuthSettings.modalMsg.msg = 'ConfirmDelete';
			ngAuthSettings.modalMsg.type = '000';
			ngAuthSettings.modalMsg.callBack = 'confirmDelLotteryInfo';
			$rootScope.$broadcast('changeModalMsg', true);
		};

		$scope.$on('confirmDelLotteryInfo', function (event) {
			lotteryService.delLotteryInfo($scope.dataSource.lotteryInfo).then(
				function success(response) {
					if (response.data.APIRes.ResCode === '000') {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;
						ngAuthSettings.modalMsg.callBack = 'showSearch';

						$rootScope.$broadcast('changeModalMsg');
						$scope.searchLotteryInfo();
					}
					else {
						ngAuthSettings.modalMsg.title = "Message";
						ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
						ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

						$rootScope.$broadcast('changeModalMsg');
						return;
					}
				},
				function error(response) {
					console.log(response);
				});
		});

		$scope.changeAndSaveLotteryInfo = function (lotteryInfo) {
			$scope.dataSource.lotteryInfo = lotteryInfo;
			$scope.addOrEditLotteryInfo();
		};

		$scope.showLotteryInfoAdd = function () {
			$scope.dataSource.lotteryInfo = {
				vwLotteryInfoLimit: [], SelectArrayModel: {}
			};
			$('#ShowLotteryInfoDialog').click();
		};

		$scope.showLotteryInfoEdit = function (lotteryInfo) {
			$scope.dataSource.lotteryInfo = {};
			$.extend($scope.dataSource.lotteryInfo, lotteryInfo);

			if ($scope.dataSource.lotteryInfo.SelectArray) $scope.dataSource.lotteryInfo.SelectArrayModel = JSON.parse($scope.dataSource.lotteryInfo.SelectArray);
			if ($scope.dataSource.lotteryInfo.DisCount) $scope.dataSource.lotteryInfo.DisCount = ($scope.dataSource.lotteryInfo.DisCount * 100).toFixed(0);
			$('#ShowLotteryInfoDialog').click();
		};

		$scope.addBetLimit = function (betLimitArray) {
			//$('#ShowBetLimitDialog').click();
			betLimitArray.push({
				LotteryClassID: $scope.dataSource.lotteryClassInfo.LotteryClassID ? $scope.dataSource.lotteryClassInfo.LotteryClassID : 0,
				LotteryTypeID: $scope.dataSource.lotteryTypeInfo.LotteryTypeID ? $scope.dataSource.lotteryTypeInfo.LotteryTypeID : 0,
				LotteryInfoID: $scope.dataSource.lotteryInfo.LotteryInfoID ? $scope.dataSource.lotteryInfo.LotteryInfoID : 0
			});
		};

		$scope.deleteBetLimit = function (betLimitArray, betLimit) {
			if (betLimit.LotteryBetLimitMapID > 0) {
				betLimitSettingService.deleteMap(betLimit).then(
					function success(response) {
						if (response.data.APIRes.ResCode === '000') {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');

							var idx = betLimitArray.indexOf(betLimit);
							if (idx > -1) {
								betLimitArray.splice(idx, 1);
							}
						}
						else {
							ngAuthSettings.modalMsg.title = "Message";
							ngAuthSettings.modalMsg.msg = response.data.APIRes.ResMessage;
							ngAuthSettings.modalMsg.type = response.data.APIRes.ResCode;

							$rootScope.$broadcast('changeModalMsg');
							return;
						}
					},
					function error(response) {
						console.log(response);
					});
			} else {
				var idx = betLimitArray.indexOf(betLimit);
				if (idx > -1) {
					betLimitArray.splice(idx, 1);
				}
			}
		};

		//換頁
		$scope.PageChanged = function (page) {
			$scope.dataSource.PagerObj.CurrentPage = page;
			$scope.searchGameRoomType();
		};

		//換頁
		$scope.PageChanged2 = function (page) {
			$scope.dataSource.PagerObj2.CurrentPage = page;
			$scope.searchLotteryClass();
		};

		//換頁
		$scope.PageChanged3 = function (page) {
			$scope.dataSource.PagerObj3.CurrentPage = page;
			$scope.searchLotteryType();
		};

		//換頁
		$scope.PageChanged4 = function (page) {
			$scope.dataSource.PagerObj4.CurrentPage = page;
			$scope.searchLotteryInfo();
		};

	}]);