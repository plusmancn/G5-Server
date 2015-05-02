var mou_remotePub = require('cloud/mou_remotePub');

exports.appVerLatest = function(request,response){
    var platform = request.params.platform;

    if (platform == 'ios') {
        var responseData = {
            platform:platform,
            version:1,
        }
    }else if(platform == 'android'){
        var responseData = {
            platform:platform,
            version:2,
            versionName:'1.0.1',
            fileurl:'http://www.huiyouxing.com/downLoadGuide.html?layout=true'
        }
    }

    response.success(responseData);
}

exports.verLatest = function(request, response){

    var platform = request.params.platform;
    var appid = request.params.appid;

    if (appid == undefined || platform == undefined) {
        var JsonRes = {
            'errorCode':1,
            'errorMessage':'参数不完整',
        }

        response.success(JsonRes);
    };

    mou_remotePub.versionLatest(platform,appid).then(function(res){

        if (res.get('version') == 0) {
            var JsonRes = {
                'errorCode':1,
                'errorMessage':'没有找到网页缓存包',
            }
        }else{
            var JsonRes = {
                "errorCode":0,
                "errorMessage":'获取版本成功',
                "data":{
                    "version":res.get('version'),
                    "zipUrl":res.get('zipUrl'),
                    "zipSize":(res.get('zipSize')/1000000).toLocaleString().substr(0,4) + 'M',
                    "isForceUpdate":res.get('isForceUpdate')
                }
            }    
        }

        response.success(JsonRes);
    });
}

exports.verAdd = function(request,response){

    if (request.params.securityCode != 'hackerliuPub') {
        var JsonRes = {
            "errorCode":1001,
            "errorMessage":'安全验证码错误',
        }

        response.success(JsonRes);

    }else{
        var params = {
            zipUrl:request.params.zipUrl,
            zipSize:request.params.zipSize,
            platform:request.params.platform,
            isForceUpdate:parseInt(request.params.isForceUpdate),
            changeLog:request.params.changeLog,
            appid:request.params.appid
        }

        mou_remotePub.versionAdd(params).then(function(){

            var JsonRes = {
                "errorCode":0,
                "errorMessage":'添加版本成功',
            }

            response.success(JsonRes);
        });
    }

    
}