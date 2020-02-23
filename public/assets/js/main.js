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
        var markup = "<tr id='--electionId--' > <th scope=\"row\">--electionId--</th> <td>--electionName--</td> <td>--description--</td> <td>--actions--</td> </tr>"
        var action_cons = "<i class=\"material-icons delete\">settings</i>\n" +
            "                        <i class=\"material-icons delete\">delete_forever</i>"
        markup= markup.replace("--actions--",action_cons).replace("--electionId--",electionId)
            .replace("--electionName--",electionName).replace("--description--",description)
            .replace("--electionId--",electionId)





        $('#elections').append(markup)
        $(".delete").on('click',function (ev) {
            var rel = $(ev.currentTarget).parent().parent();
            console.log(rel.attr("id"))
        })
    }



    loadElections();

})