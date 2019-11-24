var databaseConnect = require('./databaseConnect')
function genElectionId(email, callback){
    genRandToken(Math.floor(Math.random() * 10)+7, function (token) {
        var election_id = email+"_"+token;
        return callback (election_id);
    })
}

function genKeys(username, positionName, type, num_of_pos, election_name,number_of_parties,parties,pos_names) {
    var election_id=username+"_"+election_name+"_"+genRandToken(12)
    if(type===1){

    }else if(type===2){

    }
}

function validate(token, callback){



    if(token===undefined){
        return callback({success:false})
    }else {
        //    check validity

        databaseConnect.checkTokenValidity(token,function (msg) {
            if (msg.success===true){
                return callback({success: true,data:msg.data})
            } else{
                return callback({success:false})
            }
        })

        // res.send(req.signedCookies.userAuth)

    }
}
function genRandToken(range, callback) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

    for (var i = 0; i < range; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return callback(text);
}
module.exports = {
    genElectionId:genElectionId,
    genRandToken:genRandToken
}