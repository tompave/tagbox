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
    var escapedString = html_code.replace(/<input id/g, "\n\t&lt;input id");

    escapedString = escapedString.replace(/<div class=\"tag_element/g,'\n\t&lt;div class="tag_element');
    escapedString = escapedString.replace(/</g,"&lt;").replace(/>/g,"&gt;");


    jq_liveCodePreview.html(escapedString);
}