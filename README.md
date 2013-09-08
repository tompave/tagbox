#tagbox

A simple jQuery plugin to painlessly create input boxes for tag lists like the ones used on StackOverflow or Linkedin.  
__jQueryUI is NOT required!__  

![example screenshot](https://raw.github.com/tompave/tagbox/master/pics/screenshot.png)

##Demo
A demo with live HTML preview is available [here](http://staticfiles.wonderingmachine.com/portfolio/tagbox/example.html).

##How To

###What you'll need

Just import jQuery (either `1.10` or `2.0`), the plugin javascript file and the related stylesheet (a default CSS file is inlcuded).   

```html
<head>
  <link rel="stylesheet" type="text/css" href="style/layout.css"> <!-- your general CSS -->
  <link rel="stylesheet" type="text/css" href="style/tag_box.css"> <!-- tagbox related CSS -->

  <script type="text/javascript" src="scripts/jquery-2.0.3.min.js"></script>
  <script type="text/javascript" src="scripts/tagbox.min.js"></script> <!-- the plugin -->
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
$("#tag_box").tagbox();
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

You can pass the function an optional object with some configuration values. Here are the defaults:

```javascript
$("#tag_box").tagbox({
  typeTargetNameAndId : "type_target",
  tagInputsArrayName : "tag_list",
  includeExampleTag : true
});
```


###Style

The plugin comes with a default stylesheet for the tag widget (SCSS).  
Of course you can use your own.


##How it works

The plugin listens for keypress events and reacts on `enter`, `,`, `space` or `tab`.  
When one of these keys is pressed, it creates a new graphical _tag\_element_ in the tag box, and inserts in the form a new hidden input for the new inserted value. The hidden inputs have a collective name (can be configured) and will be received by the server as an array of values.  
Removing a graphical _tag\_element_ also removes the corresponding hidden input.  


##Contribute

With this plugin I wanted to keep things simple, but I'd like to hear suggestions about features and configuration options.  
If you want you can send me a pull request:

* fork on GitHub
* `git clone` your fork on your computer
* `git checkout -b your_new_feature_branch`
* implement your modifications
* `git add .` and `git commit`
* `git push`
* create a pull request on GitHub

