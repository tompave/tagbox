(function ($) {
 
    var theForm;
    var theBox;
    var theTypeTarget;
    var settings;

    $.fn.tagbox = function(options) {

        var defaults = {
            typeTargetNameAndId : "type_target",
            tagInputsArrayName : "tag_list",
            includeExampleTag : true
        };
        settings = $.extend(defaults, options);

        theBox = this;
        theForm = theBox.parents("form");
        theTypeTarget = setupTypeTarget();

        setupTypeTargetKeyPressHandling();

        setupExampleTagElement();
        setupSimulatedFocus();
        setupDimissTagListener();

        return this;
    };




    /**
     *
     */
    function setupExampleTagElement(){
        if(settings.includeExampleTag){
            var exampleTagElement = $(buildExampleTagElement());
            theBox.prepend(exampleTagElement);
        }
    }


    /**
     *  When the fake textarea is clicked, pass focus to the hidden text-field.
     *  Also, bind to the focus and blur events of the text-field to update the
     *  fake textarea appearance, hence simulating focus
     */
    function setupSimulatedFocus(){
        theBox.click(function(event){
            theTypeTarget.focus();
        });
        theTypeTarget.focus(function(event){
            theBox.addClass("has_focus");
        });
        theTypeTarget.blur(function(event){
            theBox.removeClass("has_focus");
        });
    }







    /**
     *
     */
    function setupTypeTarget(){
        var typeTarget = $(buildTypeTarget());
        theBox.append(typeTarget);

        return typeTarget;
    }
    /**
     *
     */
    function setupTypeTargetKeyPressHandling(){
        //handle input: create tag if key==(enter, tab, comma, space), adjust width
        theTypeTarget.keydown(function(event){
            var key = event.which
            if (key === 13 || key === 9 || key === 44 || key === 188 || key === 32){
                event.preventDefault();
                verifyAndCreateTag();
            }
            else
                adjustTypeTargetWidth();
        });

        //adjust width on keyup as well, to cover any case (crossbrowser)
        theTypeTarget.keyup(function(event){
            adjustTypeTargetWidth();
        });
    }




    /**
     *  
     */
    function setupDimissTagListener() {
        theBox.on("click",
                 ".tag_element > .tag_dismiss",
                 null,
                 function(event){
                    event.preventDefault();
                    var theTagElement = $(this).parent();
                    removeTagElementAndHiddenInput(theTagElement);
                 });
    }






    /**
     *  to adjust the hidden input's width
     */
    function adjustTypeTargetWidth() {
        var len = theTypeTarget.val().length;

        theTypeTarget.css("width", len*11);

        if(parseInt(theTypeTarget.css("width")) < 40){
            theTypeTarget.css("width", "40px")
        }
    }




    /**
     *  if something has been typed in the input, create a new tag
     */
    function verifyAndCreateTag() {
        var text = theTypeTarget.val();

        if(text.length > 0)
            insertTagElement(text);
    }




    /**
     *  
     */
    function insertTagElement(text) {
        var jq_newTag = $(buildTagHtmlString(text));
        jq_newTag.insertBefore(theTypeTarget);

        // resetting the input
        theTypeTarget.val("").css("width", "60px");
     
        insertTagHiddenField(text);
    }


    /**
     *  
     */
    function insertTagHiddenField(text) {
        jq_newField = $(buildHiddenInputHtmlString(text));
        theForm.prepend(jq_newField);
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
        var input_str =  '<input name="' + settings.tagInputsArrayName + '[]" type="hidden" value="' + text + '">';
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
        var sel = '[value="' + tagName + '"]';
        $(sel).remove();
    }


    /**
     *  builds the html string for the example tag
     */
    function buildExampleTagElement() {
        var tagStr = '<div class="tag_element"><span class="tag_label">example</span><a href="#" title="remove" class="tag_dismiss">&times;</a></div>';
        return tagStr;
    }


    /**
     *  builds the html string for the example tag
     */
    function buildTypeTarget() {
        var tagStr = '<input name="' + settings.typeTargetNameAndId + '" id="' + settings.typeTargetNameAndId + '" type="text" maxlength="40">';
        return tagStr;
    }

    
}(jQuery));








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
