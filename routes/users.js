var express = require('express');
var router = express.Router();
var formidable= require('formidable');
var multer  = require('multer');
var upload = multer({ dest: __dirname + '/../uploads/'})
var databaseConnect = require('./databaseConnect')
/* GET users listing. */
var storage = multer.diskStorage(
    {
      destination: './pictures/profile/',
      filename: function ( req, file, cb ) {
        //req.body is empty...
          console.log(req,file,cb)
        //How could I get the new_file_name property sent from client here?
        cb( null, "classmate.apk");
      }
    }
);
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/profile/upload',upload.single('file'),function (req, res, next) {
    databaseConnect.checkTokenValidity(req.signedCookies.userAuth,function (msg) {
        if(msg.success){
        //    validated...proceed

        }else{

        }
    })
})

module.exports = router;
