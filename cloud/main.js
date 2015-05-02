require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:

// 远程版本更新
var Manager_remotePub = require('cloud/Manager_remotePub');
AV.Cloud.define('verLatest',Manager_remotePub.verLatest);
AV.Cloud.define('verAdd',Manager_remotePub.verAdd);
AV.Cloud.define('appVerLatest',Manager_remotePub.appVerLatest);
