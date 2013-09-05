$(function(){

    // var jq_tagsFormInput = $("#tag_list");
    // var jq_tagBox = $("#tag_box");
    // var jq_hiddenInput = $("#hidden_input");

    setupSimulatedFocus();
    setupInputKeyPressHandling();

});





/**
 *  When the fake textarea is clicked, pass focus to the hidden text-field.
 *  Also, bind to the focus and blur events of the text-field to update the
 *  fake textarea appearance, hence simulating focus
 */
function setupSimulatedFocus(){
    var jq_tagBox = $("#tag_box");
    var jq_hiddenInput = $("#hidden_input");

    jq_tagBox.click(function(event){
        jq_hiddenInput.focus();
    });

    jq_hiddenInput.focus(function(event){
        jq_tagBox.addClass("has_focus");
    });
    jq_hiddenInput.blur(function(event){
        jq_tagBox.removeClass("has_focus");
    });
}






/**
 *
 */
function setupInputKeyPressHandling(){
    var jq_hiddenInput = $("#hidden_input");

    //handle input: create tag if key==(enter, tab, comma), adjust width
    jq_hiddenInput.keydown(function(event){
        var key = event.which
        if (key === 13 || key === 9 || key === 44 || key === 188){ //enter, tab or comma
            event.preventDefault();
            verifyAndCreateTag();
        }
        else
            adjustHiddenInputWidth();
    });

    //adjust width on keyup as well, to cover any case (crossbrowser)
    //also, fires the ajax request
    jq_hiddenInput.keyup(function(event){
        adjustHiddenInputWidth();
        //handleAutocompletionRemote();        
    });
}


/**
 *
 */
function handleAutocompletionRemote(){
    var jq_hiddenInput = $("#hidden_input");
    var text = jq_hiddenInput.val();

    if(text.length > 2) {
        var api_url = window.location.protocol + "//" +
                    window.location.host +
                    "/suggestions.js?prompt=" +
                    encodeURIComponent(text);
        $.ajax({url:api_url});
    }
    else
        $("#suggestions_box").remove();
}


/**
 *  encapsulates logic to adjust the hidden input's width
 */
function adjustHiddenInputWidth() {
    var jq_hiddenInput = $("#hidden_input");
    var len = jq_hiddenInput.val().length;

    jq_hiddenInput.css("width", len*11);

    if(parseInt(jq_hiddenInput.css("width")) < 60){
        jq_hiddenInput.css("width", "60px")
    }
}


/**
 *  decides whether to create a tag and fires the process
 */
function verifyAndCreateTag() {
    var jq_hiddenInput = $("#hidden_input");
    var text = jq_hiddenInput.val();

    if(text.length > 0)
        insertTag(text);
}


/**
 *  
 */
function insertTag(text) {
    var jq_tagsFormInput = $("#tag_list");
    var jq_hiddenInput = $("#hidden_input");
    var jq_newTag = $(tagHtmlString(text));

    jq_newTag.insertBefore(jq_hiddenInput);

    jq_hiddenInput.val("").css("width", "60px");

    //registers a handler to remove the tag
    jq_newTag.find(".tag_dismiss").click(function(){
        jq_newTag.remove();
        var old_text = jq_tagsFormInput.val();
        var pattern = text + "$%";
        var corrected_value = old_text.replace(pattern, "");
        jq_tagsFormInput.val(corrected_value);
    });
    //adds the skill string to the hidden input in the form.
    //I'm using "$%" to separate entries. I'll parse and split the string server-side
    var new_value = jq_tagsFormInput.val() + text + "$%";
    jq_tagsFormInput.val(new_value);
}


/**
 *  builds the html string for the tag
 */
function tagHtmlString(text) {
    var tag_str =   "<div class='tag_element'><span class='tag_label'>" + text +
                    "</span><a href='#' title='remove' class='tag_dismiss'>&times;</a></div>";
    return tag_str;
}