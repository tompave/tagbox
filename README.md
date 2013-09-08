#tagbox

A simple jQuery plugin to painlessly create input boxes for tag lists like the ones used on StackOverflow or Linkedin.  

![example screenshot](/pics/screenshot.png)

-------

##How To

###what you need

Just import jQuery (either `1.10` or `2.0`), the plugin javascript file, and the related stylesheet (a default CSS file is inlcuded). __jQueryUI is NOT required!__  

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


###required HTML

To use the plugin, you'll need a `<form>` containing the `<div>` you plan to use as the tag input.

```html
<form id="the_parent_form" accept-charset="UTF-8" action="/form_action" method="post">
  <!-- other inputs and elements... -->
  <div id="tag_box"></div>
  <!-- other inputs and elements... -->
</form>
```

Once you have that, you can just call:

```javascript
  $("#tag_box").tag_box();
```

###Options

You can pass to the function an optional object with some configuration. Here are the defaults:

```javascript
  $("#tag_box").tag_box({
    typeTargetNameAndId : "type_target",
    tagInputsArrayName : "tag_list"
  });
```


