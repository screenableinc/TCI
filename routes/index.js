var express = require('express');
var router = express.Router();
var databaseConnect = require('./databaseConnect')


/* GET home page. */
router.get('/dashboard', function(req, res, next) {
    var token=req.signedCookies.userAuth
    if(token===undefined){
        res.redirect('/login')
    }else {
    //    check validity

        databaseConnect.checkTokenValidity(token.token,function (msg) {
            if (msg.success===true){
                var f_name = msg.data[0]['firstname']
                var l_name = msg.data[0]['lastname']
                var greeting  = "HI! "+ f_name;
                res.render('index',{greeting: greeting})
            } else{
                res.redirect('/login')
            }
        })

        // res.send(req.signedCookies.userAuth)

    }


    // console.log(req.headers.cookie.split('userAuth=',-1)[1])
  // res.render('index', { title: 'Express' });
});

router.get('/manage', function(req, res, next) {
  res.render('candidate', { title: '' });

});
router.get('/login', function(req, res, next) {
    res.render('login', { title: '' });

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
    databaseConnect.loginUser(email,password,function (msg) {

        if(msg.success===true){
            res.cookie('userAuth',{token:msg.token,email:email}, { maxAge: 14400000, httpOnly: true ,signed:true})
            res.redirect('/dashboard')
        }else{
            console.log(msg)
            res.send(msg)
        }

    })



})
router.get('/election', function(req, res, next) {
  res.render('election', { title: '' });

});
router.post('/election/create', function(req, res, next) {

    var election_name = req.body.election_name;

    var token=req.signedCookies.userAuth
    if(token===undefined){
        res.redirect('/login')
    }else {
        //    check validity

        databaseConnect.checkTokenValidity(token.token,function (msg) {
            if (msg.success===true){
                var f_name = msg.data[0]['firstname']
                var l_name = msg.data[0]['lastname']
                var greeting  = "HI! "+ f_name;
                res.render('index',{greeting: greeting})
            } else{
                res.redirect('/login')
            }
        })

        // res.send(req.signedCookies.userAuth)

    }

    res.send("");

});
router.get('/live', function(req, res, next) {
    res.render('live', { lg: '3', candidate_name:'uihkhjkh',position:'President' });

});
router.get('/verification', function(req, res, next) {
    res.render('thank you',{})

});

module.exports = router;
