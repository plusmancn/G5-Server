var fs = require('fs');

exports.packageUpload_Get = function(req,res){
    res.render('pc/packageUpload',{});
}

exports.fileUpload_Post = function(req,res){

    var buffer = fs.readFileSync(req.files.qqfile.path);

    var avFile = new AV.File(req.body.qqfilename,buffer);

    avFile.save().then(function() {

        var responseData = {
            success:true,
            zipUrl:avFile.url(),
            zipSize:req.body.qqtotalfilesize,
            zipUUID:req.body.qquuid,
            fileType:req.body.qqfilename.split('.').pop(),
            fileName:req.body.qqfilename
        }

        res.send(responseData);
    },function(err){
        var responseData = {
            success:false,
        }
        
        res.send(responseData);
    });
}