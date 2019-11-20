$(document).ready(function () {
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

})