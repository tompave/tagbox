#tagbox

A simple jQuery plugin to painlessly create input boxes for tag lists like the ones used on StackOverflow or Linkedin.  
__jQueryUI is NOT required!__  

![example screenshot](/pics/screenshot.png)


##How To

###What you'll need

Just import jQuery (either `1.10` or `2.0`), the plugin javascript file and the related stylesheet (a default CSS file is inlcuded).   

```html
<head>
  <link rel="stylesheet" type="text/css" href="style/layout.css"> <!-- your general CSS -->
  <link rel="stylesheet" type="text/css" href="style/tag_box.css"> <!-- tagbox related CSS -->

  <script type="text/javascript" src="scripts/jquery-2.0.3.min.js"></script>
  <script type="text/javascript" src="scripts/tag_box.min.js"></script> <!-- the plugin -->
  <script type="text/javascript" src="scripts/logic.js"></script> <!-- your custom script -->
</head>
```

(of course, you can package and minify everything in a single file)



To use the plugin, you'll need a `<form>` containing the `<div>` you plan to use as the tag input.

```html
<form id="the_parent_form" accept-charset="UTF-8" action="/form_action" method="post">
  <!-- other inputs and elements... -->
  <div id="tag_box"></div>
  <!-- other inputs and elements... -->
</form>
```

###Trigger the plugin

Once you have setup your `<form>` and your `<div>`, you can just call:

```javascript
  $("#tag_box").tag_box();
```

The result will be:

```html
<form id="the_parent_form" accept-charset="UTF-8" action="/form_action" method="post">
  <!-- other inputs and elements... -->
  <div id="tag_box">
    <div class="tag_element">
      <span class="tag_label">example</span>
      <a href="#" title="remove" class="tag_dismiss">&times;</a>
    </div>
      
    <input name="type_target" id="type_target" type="text" maxlength="40">
  </div>
  <!-- other inputs and elements... -->
</form>
```



###Options

You can pass to the function an optional object with some configuration. Here are the defaults:

```javascript
  $("#tag_box").tag_box({
    typeTargetNameAndId : "type_target",
    tagInputsArrayName : "tag_list",
    includeExampleTag : true
  });
```


