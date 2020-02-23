$(document).ready(function () {
    var arrayPositions=[];
    var electionId = $("#electionId").text();

    function genRandToken(range) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

        for (var i = 0; i < range; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    function addToCandidatesTable(candidateName, candidateId, position, accessToken){

    }
    function addToPositionTable(positionName) {
        var action_cons = "<i class=\"material-icons delete\">delete_forever</i>"
        var row ="<tr > <th scope=\"row\">"+positionName+"</th> <td>--actions--</td> </tr>"
        row = row.replace("--actions--",action_cons);

        console.log($("tbody#positionTable"),"kkkk")
        $("tbody#positionTable").append(row)
    }

    function loadPositions(){
        $.ajax({
            type:"GET",
            url:"/positions?electionId="+electionId,
            success:function (msg) {
                // msg=JSON.parse(msg)
                if(msg.success){
                    console.log(msg.response.length)
                    for (var i = 0; i < msg.response.length; i++) {

                        var posName = msg.response[i].positionName;
                        arrayPositions.push(posName)
                        addToPositionTable(posName)

                    }
                }
            }

        })
    }

    console.log(electionId)
    function loadElection(){

    }

    $("#positionName").on('keypress',function (e) {
        var str = $(e.currentTarget).val()
        console.log( arrayPositions.includes(str))
        if(e.keyCode===13 && str!=="" && ! arrayPositions.includes(str)){

            $.ajax({
                url:"/positions",
                type:"POST",
                data:{electionId:electionId,positionName:str},
                success:function (msg) {
                    msg=JSON.parse(msg)
                    if(msg.success){
                    //    add to table

                        arrayPositions.push(str)
                        addToPositionTable(str)
                        console.log(arrayPositions)



                    }
                }
            })
        }
    })
    $("#add").on('click',function () {
        var input ="<li>\n" +
            "                                    <ul class=\"param\" style=\"display: inline-block;float: right;list-style-type: none\">\n" +
            "                                        <li class=\"input\">\n" +
            "                                            <input type=\"text\" class=\"form-control\">\n" +
            "                                        <li/>\n" +
            "                                        <li>\n" +
            "                                            <i class=\"material-icons rmv-btn\">highlight_off</i>\n" +
            "                                        </li>\n" +
            "\n" +
            "                                    </ul>\n" +
            "                                    </li>"

        $("#voterparams").append(input)

    })
    $(this).on('click','.rmv-btn',function () {
        $(this).parent().parent().remove()
    })
    $(this).on('input','#slimselectinput',function (ev) {
        var str = $(this).val();
        var optionTag="<option value=''></option>"
        var prevStr = str.slice(0, -1);


    })

    $("#addCandidate").on('shown.bs.modal',function () {
        console.log("opened")
        $.each(arrayPositions,function (key,value) {
            $("#positions").append($("<option value=''></option>").attr('value',value).text(value))

        })
    })
    $("#buttonAddCandidate").on('click',function (e) {
        $("input#electionId").val(electionId)
        var name = $("input#name").val();
        var position = $("input#positionName").val();
        var candidateId = $("input#candidateId").val();
        var accessToken = genRandToken(12)
        var position  =$("select#positions").selected();
        if(name!=="" && candidateId!=="" && candidateId.includes("@") && position!=="select"){
            $.ajax({
                url:"/candidate/add",
                data:{electionId:electionId,accessToken:accessToken,candidateId:candidateId,fullname:name,position:position},
                success:function(msg){
                //    add user to table on success
                }
            })
        }
        $("input#accessToken").val(accessToken)


        // return false
    })



    loadPositions()

})