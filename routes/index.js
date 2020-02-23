var express = require('express');
var router = express.Router();
var databaseConnect = require('./databaseConnect')

//TODO::: i dont need do check token validity do i??

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



});
router.post('/candidate/add',function (req,res,next) {
    var token = req.signedCookies.userAuth
    var electionId = req.body.electionId
    var accessToken = req.body.accessToken
    var candidateId = req.body.candidateId;
    var fullname = req.body.fullname
    var position = req.body.position
    if (token===undefined){
        res.redirect('/login')
    }else {
        databaseConnect.addCandidate(electionId,candidateId,accessToken,position,function (msg) {
            res.send(JSON.stringify(msg))
        })
    }
})
router.get('/candidates', function (req, res, next) {
    var electionId = req.body.electionId;
    databaseConnect.getCandidates(electionId,function (msg) {
        res.send(JSON.stringify(msg))
    })
})

router.post('/positions',function (req,res,next) {
    console.log("here")
    var token = req.signedCookies.userAuth
    var electionId = req.body.electionId;
    var positionName = req.body.positionName;
    console.log(electionId)
    if (token===undefined){
        res.redirect('/login')
    }else {

        databaseConnect.addPosition(electionId,positionName,function (msg) {

            res.send(JSON.stringify(msg))
        })
    }
})

router.get('/positions',function (req, res, next) {
    var token = req.signedCookies.userAuth
    var electionId = req.query.electionId
    if (token===undefined){
        res.redirect('/login')
    }else {
        databaseConnect.getPositons(electionId,function (msg) {
            res.send(msg)
        })
    }
})

router.get('/elections/manage', function(req, res, next) {
    var token = req.signedCookies.userAuth
    var electionId = "wisesibindi@gmail.com_Kl8081f9oGW"
    if (token===undefined){
        res.redirect('/login')
    }else {
        databaseConnect.getElection(token.email,electionId,function (msg) {
            if (msg.success){
                var electionName = msg["response"][0].name;

                res.render('election',{electionName:electionName,electionId:electionId})

            }else{
                res.render('error',{})
            }



        })
    }

});
router.get('/elections/all', function (req, res, n) {
    var token = req.signedCookies.userAuth
    if (token===undefined){
        res.redirect('/login')
    }else {
        databaseConnect.checkTokenValidity(token.token,function (result) {
            if(result.success){
                databaseConnect.getElections(token.email,function (response) {
                    console.log(response)
                    res.send(response)
                })
            }
        })
    }
})
router.post('/elections/create', function(req, res, next) {

    var election_name = req.body.name;
    console.log(req.body)


    var description = req.body.description;

    var token=req.signedCookies.userAuth
    if(token===undefined){
        res.redirect('/login')
    }else {
        //    check validity

        databaseConnect.checkTokenValidity(token.token,function (msg) {
            if (msg.success){
                // okay now add election
                databaseConnect.createElection(token.email,election_name,description,function (response) {
                    console.log(response)
                    res.send(JSON.stringify(response))
                })

            } else{
                res.redirect('/login')
            }
        })

        // res.send(req.signedCookies.userAuth)

    }



});
router.get('/live', function(req, res, next) {
    res.render('live', { lg: '3', candidate_name:'uihkhjkh',position:'President' });

});
router.get('/verification', function(req, res, next) {
    res.render('thank you',{})

});

module.exports = router;
