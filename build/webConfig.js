// 此為本機環境設制
// var serviceBase = 'https://localhost:44306';
var serviceBase = 'https://753stg.online/GameDealer.API';
//var serviceBase = '../GHL.API';
//var serviceBase = 'http://www.goldenhippo.net:8300/GHL.API/';
//var serviceBase = 'http://192.82.60.55:8350/GHL.API/';
// 因目前測試proxy會自動將記錄值清空，找到解決後再進行修改
//var serviceBase = 'http://localhost/CPCManager/proxy.aspx';
var apip = 'CopyRight.GoldenHippo@20191010'; //若客戶沒有此安全機制則不必驗證APID

var IS_MASTER = false;
var IS_GAMEDEALER = true;
var IS_STAGING = false;
// 此為線上環境設制
//var serviceBase = 'http://localhost/CPCManager/proxy.aspx';

var STORAGE_PREFIX = 'Wama88BackStage';
localStorage.setItem('STORAGE_PREFIX', STORAGE_PREFIX);