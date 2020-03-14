var mysql = require("mysql");
var nodemailer = require('nodemailer')
var misc = require('./misc');
var email_temp = require("./emailTemplates")
var g = misc.genElectionId("wiseemsads",function (c) {
    return g
})


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'w1se097768638810',
    database: "tci"

});

connection.connect(function(err) {
    if (err) throw err;

});
var html_temp="<head>\n" +
    "    <title>Verification</title>\n" +
    "    <meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\">\n" +
    "    <meta content=\"width=device-width\" name=\"viewport\">\n" +
    "    <style type=\"text/css\">\n" +
    "        @font-face {\n" +
    "            font-family: &#x27;Postmates Std&#x27;;\n" +
    "            font-weight: 600;\n" +
    "            font-style: normal;\n" +
    "            src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);\n" +
    "        }\n" +
    "\n" +
    "        @font-face {\n" +
    "            font-family: &#x27;Postmates Std&#x27;;\n" +
    "            font-weight: 500;\n" +
    "            font-style: normal;\n" +
    "            src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);\n" +
    "        }\n" +
    "\n" +
    "        @font-face {\n" +
    "            font-family: &#x27;Postmates Std&#x27;;\n" +
    "            font-weight: 400;\n" +
    "            font-style: normal;\n" +
    "            src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);\n" +
    "        }\n" +
    "    </style>\n" +
    "    <style media=\"screen and (max-width: 680px)\">\n" +
    "        @media screen and (max-width: 680px) {\n" +
    "            .page-center {\n" +
    "                padding-left: 0 !important;\n" +
    "                padding-right: 0 !important;\n" +
    "            }\n" +
    "\n" +
    "            .footer-center {\n" +
    "                padding-left: 20px !important;\n" +
    "                padding-right: 20px !important;\n" +
    "            }\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "<body style=\"background-color: #f4f4f5;\">\n" +
    "<table cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;\">\n" +
    "    <tbody><tr>\n" +
    "        <td style=\"text-align: center;\">\n" +
    "            <table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" id=\"body\" style=\"background-color: #fff; width: 100%; max-width: 680px; height: 100%;\">\n" +
    "                <tbody><tr>\n" +
    "                    <td>\n" +
    "                        <table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" class=\"page-center\" style=\"text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;\">\n" +
    "                            <tbody><tr>\n" +
    "                                <td style=\"padding-top: 24px;\">\n" +
    "                                    <img src=\"http://www.screenableinc.com/logo.png\" style=\"width: 56px;\">\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td colspan=\"2\" style=\"padding-top: 72px; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #000000; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 48px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: -2.6px; line-height: 52px; mso-line-height-rule: exactly; text-decoration: none;\">Verify your account</td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td style=\"padding-top: 48px; padding-bottom: 48px;\">\n" +
    "                                    <table cellpadding=\"0\" cellspacing=\"0\" style=\"width: 100%\">\n" +
    "                                        <tbody><tr>\n" +
    "                                            <td style=\"width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81\"></td>\n" +
    "                                        </tr>\n" +
    "                                        </tbody></table>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td style=\"-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;\">\n" +
    "                                    $$name <br>  Thank You for joining Speed Elect,<br>Your verification code is $$$\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td style=\"padding-top: 24px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095a2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 16px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: -0.18px; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;\">\n" +
    "                                    Please tap the button below to go to verification page.\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            <tr>\n" +
    "                                <td>\n" +
    "                                    <a data-click-track-id=\"37\" href=\"https://www.screenableinc.com/\" style=\"margin-top: 36px; -ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #ffffff; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 12px; font-smoothing: always; font-style: normal; font-weight: 600; letter-spacing: 0.7px; line-height: 48px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 220px; background-color: #00cc99; border-radius: 28px; display: block; text-align: center; text-transform: uppercase\" target=\"_blank\">\n" +
    "                                        Verify account\n" +
    "                                    </a>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                            </tbody></table>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                </tbody></table>\n" +
    "             </td>\n" +
    "    </tr>\n" +
    "    </tbody></table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</body>"
function targetExistsCheck(targetParam, targetValue,targetTable, callback) {
    var sql = "SELECT * FROM "+targetTable+" WHERE "+ targetParam+" = '"+targetValue+"'";
    console.log(sql)
    connection.query(sql,function (err, result) {
        if (err){
            return callback({success:false,data:err.errno,from:sql})
        }else {
            if (result.length===0){
                return callback({success: false,data:"doesn't exist"})
            }else {
                return callback({success: true,data:result})
            }
        }
    })
}
function checkTokenValidity(token, callback){
    targetExistsCheck('sessionID',token,'users',function (res) {
        if(res.success===true){
            return callback(res)
        }else {
            return callback(res)
        }
    })
}
function deleteElection(electionId,ownerID,callback) {
    var sql = "DELETE FROM elections WHERE electionID = '"+ electionId +"' AND ownerID = '"+ ownerID +"'";
    connection.query(sql, function (err, result) {
        if(err){
            return callback({success:false, response:err})
        }else {
            return callback({success:true, response:result})
        }
    })
}
function getElections(ownerID,callback) {
    var sql = "SELECT * from elections WHERE ownerID = '"+ownerID+"'";
    connection.query(sql, function (err, result) {
        if(err){
            return callback({success:false,response:err})
        }else{
            return callback({success:true,response:result})
        }
    })
}
function getPositons(electionId,callback) {
    var sql = "SELECT * FROM positions WHERE electionID = '"+electionId+"'"
    connection.query(sql, function (err, result) {
        if(err){
            return callback({success:false,response:err})

        }else {
            return callback({success:true,response:result})
        }
    })
}

function emailCandidate(candidateId,accessToken,name,position,electtionName,callback) {
    var html = email_temp.candidateJoinEmail.replace("$$name",name).replace("$$electionName",electtionName)
        .replace("$$position",position).replace("$$accessToken",accessToken)
    sendMail(candidateId,html,function (msg) {
        return callback(msg)
    })
}
function getElection(ownerID,electionID,callback){
    var sql =  "SELECT * FROM elections WHERE electionID='"+electionID+"' AND ownerID = '"+ownerID+"'";

    connection.query(sql, function (err, result) {
        if(err){
            return callback({success:false,response:err})
        }else{
            return callback({success:true,response:result})
        }
    })
}
function createElection(ownerID,name,description,accessToken,callback) {
    var sql = "INSERT INTO elections (electionID, name, description,ownerID,accessToken) VALUES (?)"
    misc.genElectionId(ownerID,function (id) {
        connection.query(sql,[[id,name,description,ownerID,accessToken]],function (err,result) {
            if (err){

                return callback({success:false,response:err});
            }else {
                return callback({success:true,response:result,electionId:id});
            }
        })
    })

}
function getCandidates(electionID,callback) {
    var sql = "SELECT * FROM candidates WHERE electionID='"+electionID+"'";
    connection.query(sql, function (err,result) {
        if(err){
            return callback ({success:false,response:err})
        }else {
            return callback({success:true,response:result})
        }
    })
}

function authDeviceCredentials(electionId, accessToken,callback) {
    var sql = "SELECT * FROM elections WHERE electionID = '"+electionId+"' AND accessToken = '"+accessToken+"'";
    connection.query(sql,function (err, result) {
        if(err) {return callback({success:false, response:err})}
        else {
            if(result.length===0){
                return callback({success:false, response:result})
            }else {
                return callback({success:true, response:result})
            }
        }
    })
}

function registerUser(email, password, f_name, l_name,callback) {
    targetExistsCheck('email', email, 'users',function (res){
        if(res.success===false){
            misc.genRandToken(20, function (token) {
                var sql = "INSERT INTO users (email, verification_code, verified, password, firstname, lastname) VALUES ('"+email+"', '"+token+"', "+false+", '"+password+"', '"+f_name+"', '"+l_name+"')";
                var fullname = f_name+" "+l_name;
                connection.query(sql, function (err, result) {
                    if(err){
                        return callback({success:false,msg:err})
                    } else {
                        var html = html_temp.replace("$$$",token).replace("$$name", fullname)// plain text body

                        sendMail(email,html,function (res) {
                            if(res.success){
                                return callback({success:true})
                            }else {
                                return callback({success:false})
                            }
                        })
                    }
                });
            })
        }else {
            return callback({success:false,msg:"User Exists"})
        }
    })


}
function loginUser(email, password,callback){
    targetExistsCheck('email', email, 'users',function (res) {
        if (res.success===false){
        //    user does not exist
        } else {
            // user does exist check password
            targetExistsCheck('password', password, 'users', function (res) {
                if(res.success===false){
                //    password false
                //     return password failed
                    return callback({success:false})
                }else {
                    // create cookie and redirect

                    misc.genRandToken(12,function (token) {
                        var sql = "UPDATE users SET sessionID = '"+token+"' WHERE email = '"+email+"'";
                        sqlInsert(sql,function (res) {
                            if(res.success===true){
                                return callback({success:true,token:token})
                            }else{
                                return callback(res)
                            }
                        })
                    })
                }
            })

        }
    })
}
function loginCandidate(candidateID, accessToken,callback){
    targetExistsCheck('candidateID', candidateID, 'candidates',function (res) {
        if (res.success===false){
            //    user does not exist
        } else {
            // user does exist check password
            targetExistsCheck('accessToken', accessToken, 'candidates', function (res) {
                if(res.success===false){
                    //    password false
                    //     return password failed
                    return callback({success:false})
                }else {
                    // create cookie and redirect

                    misc.genRandToken(12,function (token) {
                        var sql = "UPDATE candidates SET sessionID = '"+token+"' WHERE candidateID = '"+candidateID+"'";
                        sqlInsert(sql,function (res) {
                            if(res.success===true){
                                return callback({success:true,token:token})
                            }else{
                                return callback(res)
                            }
                        })
                    })
                }
            })

        }
    })
}
function sqlInsert(sql, callback) {
    connection.query(sql,function (err, result) {
        if(err){
            return callback({success:false, src:"sqlInsert",msg:err})
        }else {
            return callback({success:true, src:"sqlInsert"})
        }
    })

}
function addCandidate(electionID,candidateID,accessToken,positionName,fullName,callback) {
    var sql = "INSERT INTO candidates (candidateID,electionID,accessToken,positionName,fullname) VALUES (?)"
    connection.query(sql,[[candidateID,electionID,accessToken,positionName,fullName]],function (err,result) {
        if(err){
            return callback({success:false,response:err})
        }else {
            return callback({success:true, response:result})
        }
    })
}
function addPosition(electionID,positionName,callback) {
    var sql = "INSERT INTO positions (electionID, positionName) VALUES (?)"
    connection.query(sql,[[electionID,positionName]],function (err,result) {
        if(err){
            console.log(err)
            return callback({success:false,response:err})
        }else {
            console.log(result)
            return callback({success:true, response:result})
        }
    })
}
function sendMail(email,html, callback) {
    var transporter = nodemailer.createTransport({
        host: 'premium76.web-hosting.com',
        port: 465,

        auth: {
            user: 'accounts@screenableinc.com',
            pass: 'Q6d7X.Uxz^LN'
        }
    });

    var mailOptions = {
        from: 'accounts@screenableinc.com', // sender address
        to: email, // list of receivers
        subject: 'Verification Code', // Subject line
        html: html};

    transporter.sendMail(mailOptions, function (err, info) {
        if(err){
            console.log(err)
            return callback({success:false,error:err})}
        else
            callback({success:true, msg:info});
    });
}
function reg_user(username, password, callback) {

}

module.exports={
    sendMail:sendMail,
    registerUser:registerUser,
    loginUser:loginUser,
    checkTokenValidity:checkTokenValidity,
    createElection:createElection,
    getElections:getElections,
    getElection:getElection,
    getPositons:getPositons,
    getCandidates:getCandidates,
    addCandidate:addCandidate,
    addPosition:addPosition,
    emailCandidate:emailCandidate,
    deleteElection:deleteElection,
    authDeviceCredentials:authDeviceCredentials,
    loginCandidate:loginCandidate
}