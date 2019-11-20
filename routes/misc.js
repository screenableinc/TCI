
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