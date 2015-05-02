;(function(){

    function callCloudFunc (func,params,callBack) {
        params.func = func;
        $.post('/callCloudFunc',params,function(res){
            if (typeof(callBack) == 'function') {
                callBack(res);
            };
        },'JSON');
    }

    window.G5Util = {
        callCloudFunc:callCloudFunc,
    }
})();