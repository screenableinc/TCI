$(document).ready(function () {
    function genRandToken(range) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        for (var i = 0; i < range; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $(".electionRow").click(function (ev) {
        console.log(ev)
    })


    $("#createElection").click(function (ev) {
        var electionName=$("#name").val();
        var electionDescr=$("#description").val();
        var accessToken = genRandToken(50)

        $.ajax({
            type:"POST",
            url:"elections/create",
            data:{name:electionName,description:electionDescr,accessToken:accessToken},
            success:function (res) {
                if(res.success){
                    appendRow(res.electionId,electionName,electionDescr,accessToken)

                }
            },
            dataType:"JSON"


        })
    })
    function loadElections(){
        console.log("started")
        $.ajax({
            type:"GET",
            url:"/elections/all",
            success:function (res) {
                if(res.success){
                    for (var i = 0; i < res.response.length; i++) {

                        var electionId = res.response[i].electionID;
                        console.log(electionId)
                        var description = res.response[i].description;
                        var electionName = res.response[i].name;
                        var accessToken = res.response[i].accessToken;
                        appendRow(electionId,electionName,description,accessToken)
                    }
                }
            }
        })
    }

    function appendRow(electionId,electionName,description,accessToken) {

        var row = $("<tr></tr>")
        var electionIdE=$("<td>"+electionId+"</td>");
        var electionNameE=$("<td>"+electionName+"</td>");
        var electionDescrE=$("<td>"+description+"</td>");
        var accessToken=$("<td>"+accessToken+"</td>");
        var actions = $("<td></td>");
        var actionDelete = $("<span><i class=\"material-icons cancel\">cancel</i></span>");
        row.on("click",function () {
            window.location.href = "/elections/manage?electionId="+electionId;
        })
        actionDelete.on('click',function () {
        //    ask are you sure? later
            $.ajax({
                url:"/elections/manage/delete",
                type:"POST",
                data:{electionId:electionId},
                success:function(msg){
                    console.log(msg)

                    if(msg.success){
                        row.remove()
                    }
                }

            })
        })
        actions.append(actionDelete)
        $([electionIdE,electionNameE,electionDescrE,accessToken,actions]).each(function () {
            row.append(this)
        })








        $('#elections').append(row)

    }



    loadElections();

})