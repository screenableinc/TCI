var express = require('express');
var router = express.Router();
var databaseConnect = require('./databaseConnect')


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.headers.cookie.user)
  res.render('index', { title: 'Express' });
});

router.get('/manage', function(req, res, next) {
  res.render('candidate', { title: '' });

});
router.get('/login', function(req, res, next) {
    res.render('candidate', { title: '' });

});
router.get('/register', function(req, res, next) {
    res.render('register', { title: '' });

});
router.post('/register',function (req,res,next) {
    var password = req.body.password
    var email = req.body.email
    var f_name = req.body.f_name;
    var l_name = req.body.l_name;
    databaseConnect.registerUser(email,password, f_name, l_name,function (msg) {
        res.send(msg)
    })



})
router.post('/login',function (req,res,next) {
    var password = req.body.password
    var email = req.body.email
    databaseConnect.lo(email,password,function (msg) {
        res.send(msg)
    })



})
router.get('/election', function(req, res, next) {
  res.render('election', { title: '' });

});
router.get('/live', function(req, res, next) {
    res.render('live', { lg: '3', candidate_name:'uihkhjkh',position:'President' });

});
router.get('/verification', function(req, res, next) {
    res.render('thank you',{})

});

module.exports = router;
