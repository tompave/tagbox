
var suggestions = ["Lion", "Tiger", "Rabbit", "Baboon", "Zebra", "Pig", "Cow", "Hamster"];
/**
 *
 */
function searchSuggestions(){
    var jq_typeTarget = $("#type_target");
    var text = jq_typeTarget.val();

    if(text.length > 0) {
        var api_url = window.location.protocol + "//" +
                    window.location.host +
                    "/suggestions.js?prompt=" +
                    encodeURIComponent(text);
        $.ajax({url:api_url});
    }
    else
        $("#suggestions_box").remove();
}