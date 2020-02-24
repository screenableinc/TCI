$(document).ready(function () {


    $(".electionRow").click(function (ev) {
        console.log(ev)
    })


    $("#createElection").click(function (ev) {
        var electionName=$("#name").val();
        var electionDescr=$("#description").val();

        $.ajax({
            type:"POST",
            url:"elections/create",
            data:{name:electionName,description:electionDescr},
            success:function (res) {
                if(res.success){
                    appendRow(res.electionId,electionName,electionDescr)

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
                        appendRow(electionId,electionName,description)
                    }
                }
            }
        })
    }

    function appendRow(electionId,electionName,description) {

        var row = $("<tr></tr>")
        var electionIdE=$("<td>"+electionId+"</td>");
        var electionNameE=$("<td>"+electionName+"</td>");
        var electionDescrE=$("<td>"+description+"</td>");
        var actions = $("<td></td>");
        var actionDelete = $("<span><i class=\"material-icons cancel\">cancel</i></span>");
        row.on("click",function () {
            window.location.href = "/elections/manage?electionId="+electionId;
        })
        actionDelete.on('click',function () {
        //    ask are you sure?
        })
        actions.append(actionDelete)
        $([electionIdE,electionNameE,electionDescrE,actions]).each(function () {
            row.append(this)
        })








        $('#elections').append(row)

    }



    loadElections();

})