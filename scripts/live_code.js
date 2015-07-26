/**

This code is used in the example to display a preview of the html source code.
It is NOT related to the tagbox jQuery plugin and is not necessary in production.

Copyright (c) 2013 Tommaso Pavese (tommaso@pavese.info)

*/

$(function(e) {
    updatePreview();


    $("#type_target").keyup(function(event){
        updatePreview();
    });

    $("#tag_box").click(function(event){
        updatePreview();
    });

    $("#type_target").blur(function(event){
        updatePreview();
    });
});


function updatePreview() {
    var jq_liveCodePreview = $("#live_code_preview");
    var jq_formContainer = $("#form_container");

    var html_code = jq_formContainer.html();
    var escapedString = html_code.replace(/<input name/g, "\n\t&lt;input name");

    escapedString = escapedString.replace(/<div class=\"tag_element/g,'\n\t&lt;div class="tag_element');
    escapedString = escapedString.replace(/</g,"&lt;").replace(/>/g,"&gt;");

    jq_liveCodePreview.html(escapedString);
}
