var config = require('cloud/config/config');


var versions = AV.Object.extend(config.dbs.G5_versions);

/**
 * 添加版本记录
 */
function versionAdd(params) {
    var promise = new AV.Promise();

    versionLatest(params.platform,params.appid).then(function(res){
        return AV.Promise.as(res.get('version'));
    }).then(function(version){
        var versionsNew = new versions();
        params.version = version + 1;
        
        if (typeof(params.zipSize) == "") {
            params.zipSize = 0;
        }; 
        if (typeof(params.zipSize) != 'number') {
            params.zipSize = parseInt(params.zipSize);
        };

        versionsNew.save(params).then(function(){
            promise.resolve(true);
        });

    });

    return promise;
}



/**
 * 获取最新版本
 */
function versionLatest(platform,appid){
    var promise = new AV.Promise();

    var vQ = new AV.Query(versions);

    vQ.descending('createdAt');
    vQ.equalTo('platform',platform);
    vQ.equalTo('appid',appid);
    vQ.limit(1);

    vQ.find().then(function(res){

        if (res.length == 0) {
            res = new versions();
            res.set('version',0);
            promise.resolve(res);
        }else{
            promise.resolve(res[0]);
        }

    });

    return promise;
}


exports.versionLatest = versionLatest;
exports.versionAdd = versionAdd;