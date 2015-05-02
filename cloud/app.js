// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件

// 首页
app.get('/',function(req,res){
    res.render('pc/index',{});
});

// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
var app_remoteUpdate = require('cloud/app_remoteUpdate')
app.get('/packageUpload',function(req,res){
    app_remoteUpdate.packageUpload_Get(req,res);
})

app.post('/fileUpload',function(req,res){
    app_remoteUpdate.fileUpload_Post(req,res);
});

// 云函数post调用
app.post('/callCloudFunc',function(req,res){
    var info = req.body;
    var func = info.func;
    delete info['func'];

    AV.Cloud.run(func, info, {
        success: function(result) {
            res.send(result);
        },
        error: function(error) {
            res.send(error);
        }
    });
})

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();   