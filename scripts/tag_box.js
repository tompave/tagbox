$(function(){
    setupSimulatedFocus();
    setupTypeTargetKeyPressHandling();
    setupDimissTagListener();
});



/**
 *  When the fake textarea is clicked, pass focus to the hidden text-field.
 *  Also, bind to the focus and blur events of the text-field to update the
 *  fake textarea appearance, hence simulating focus
 */
function setupSimulatedFocus(){
    var jq_tagBox = $("#tag_box");
    var jq_typeTarget = $("#type_target");

    jq_tagBox.click(function(event){
        jq_typeTarget.focus();
    });

    jq_typeTarget.focus(function(event){
        jq_tagBox.addClass("has_focus");
    });
    jq_typeTarget.blur(function(event){
        jq_tagBox.removeClass("has_focus");
    });
}





/**
 *
 */
function setupTypeTargetKeyPressHandling(){
    var jq_typeTarget = $("#type_target");

    //handle input: create tag if key==(enter, tab, comma, space), adjust width
    jq_typeTarget.keydown(function(event){
        var key = event.which
        if (key === 13 || key === 9 || key === 44 || key === 188 || key === 32){
            event.preventDefault();
            verifyAndCreateTag();
        }
        else
            adjustTypeTargetWidth();
    });

    //adjust width on keyup as well, to cover any case (crossbrowser)
    jq_typeTarget.keyup(function(event){
        adjustTypeTargetWidth();
        //searchSuggestions();
    });
}




/**
 *  
 */
function setupDimissTagListener() {
    $("#tag_box").on("click",
                     ".tag_element > .tag_dismiss",
                     null,
                     function(event){
                        event.preventDefault();
                        removeTagElementAndHiddenInput($(this).parent());
                     });
}






/**
 *  to adjust the hidden input's width
 */
function adjustTypeTargetWidth() {
    var jq_typeTarget = $("#type_target");
    var len = jq_typeTarget.val().length;

    jq_typeTarget.css("width", len*11);

    if(parseInt(jq_typeTarget.css("width")) < 40){
        jq_typeTarget.css("width", "40px")
    }
}




/**
 *  if something has been typed in the input, create a new tag
 */
function verifyAndCreateTag() {
    var jq_typeTarget = $("#type_target");
    var text = jq_typeTarget.val();

    if(text.length > 0)
        insertTagElement(text);
}




/**
 *  
 */
function insertTagElement(text) {
    var jq_typeTarget = $("#type_target");

    var jq_newTag = $(buildTagHtmlString(text));
    jq_newTag.insertBefore(jq_typeTarget);

    // resetting the input
    jq_typeTarget.val("").css("width", "60px");
 
    insertTagHiddenField(text);
}


/**
 *  
 */
function insertTagHiddenField(text) {
    jq_newField = $(buildHiddenInputHtmlString(text));
    $("#the_form").prepend(jq_newField);
}






/**
 *  builds the html string for the tag element
 */
function buildTagHtmlString(text) {
    var tag_str = "<div class='tag_element'><span class='tag_label'>" + text +
        "</span><a href='#' title='remove' class='tag_dismiss'>&times;</a></div>";
    return tag_str;
}


/**
 *  builds the html string for a hidden form input
 */
function buildHiddenInputHtmlString(text) {
    var input_str =  "<input id='" + text + "' name='tag_list[]' type='hidden' value='" + text + "'>";
    return input_str;
}



/**
 *  
 */
function removeTagElementAndHiddenInput(jq_tag){
    var tagName = jq_tag.find(".tag_label").html();
    // remove the tag from the tag box
    jq_tag.remove();
    // remove the hidden input
    $("input#"+tagName).remove();
}




// -- DEPRECATED

/**
 *  adds the tag string to the "chained" hidden input (if used)
 *  I'm using "$%" to separate entries. I'll parse and split the string server-side
 */
// function addNewTagToHiddenStringField(text) {
//     var jq_tagsFormInput = $("#tag_list");
//     var new_value = jq_tagsFormInput.val() + text + "$%";
//     jq_tagsFormInput.val(new_value);
// }


/**
 *  removes the tag string from the "chained" hidden input (if used)
 */
 // function removeDeletedTagFromHiddenStringField(text) {
 //    var jq_tagsFormInput = $("#tag_list");
 //    var originalValue = jq_tagsFormInput.val();
 //    var pattern = text + "$%";
 //    var newValue = originalValue.replace(pattern, "");
 //    jq_tagsFormInput.val(newValue);
 // }
