# livepicture
jQuery plugin for creating moving pictures, from static images!

# Usage
In the &lt;head&gt; of your document, link both jQuery and jQuery.livepicture.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="js/jquery.livepicture.js"></script>
```

Then create a &lt;div&gt; with a selector to which you will apply the plugin.
```html
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.livepicture.js"></script>
</head>
<body>
  <div id="slider"></div>
</body>
```

After this you just need to call plugin:
```html
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.livepicture.js"></script>
</head>
<body>
  <div id="slider"></div>
</body>
<script> 
  var slider=$("#slider").Livepicture({height: '100%', width: '100%'}); //call plugin
</script>
```

This will initialize plugin, but you need add some pictures! You have two way to do this:
<br>1) Add it by html (you should add pictures in slider &lt;div&gt;):

```html
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.livepicture.js"></script>
</head>
<body>
  <div id="slider">
    <div x_move="1" y_move="-1">
      <img src="https://www.google.ru/images/srpr/logo11w.png" style="display:none" />
    </div> 
  </div>
</body>
<script> 
  var slider=$("#slider").Livepicture({height: '100%', width: '100%'}); //call plugin
</script>
```
<a href="http://lionscrayons.com/livepicture/gh_ex1.html" target="_blank">This code demo</a>
<br>
<a href="http://codepen.io/levpasha/pen/myaRLY" target="_blank">This code demo on codepen</a>

<br>2) Add it by js (using add_layer function):

```html
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.livepicture.js"></script>
</head>
<body>
  <div id="slider"></div>
</body>
<script> 
  var slider=$("#slider").Livepicture({height: '100%', width: '100%'}); //call plugin
  
  slider.Livepicture('add_layer', {
    'name' : 'google',
    'bg_img' : 'https://www.google.ru/images/srpr/logo11w.png',
    'x_move' : '-1',
    'y_move' : '1'
  });
</script>
```
<a href="http://lionscrayons.com/livepicture/gh_ex2.html" target="_blank">This code demo</a>
<br>
<a href="http://codepen.io/levpasha/pen/dPwNKw" target="_blank">This code demo on codepen</a>

# Setting (default):

```js
var defaults = {
	bg_color: 'transparent', // any type of color
	bg_repeat: 'no-repeat', //no-repeat | repeat | repeat-x | repeat-y
	l_zoom: 1, // 0 to infinity, unit of measure - number
	l_left: 50, // -infinity to infinity, unit of measure - %
	l_top: 50, // -infinity to infinity, unit of measure - %
	z_index: 100,
	x_move: 1, // -infinity to infinity, unit of measure - number
	y_move: 0, // -infinity to infinity, unit of measure - number
	height: 100, // 0 to infinity, unit of measure - %
	width: 100 // 0 to infinity, unit of measure - %
};
```

You can chage default setting in html or js:<br>
```html
...
<div bg_color="transparent" bg_repeat="repeat" l_zoom="1" l_left="-5" l_top="10" z_index="50" x_move="-1" y_move="-1" height="50" width="50">
  <img src="https://www.google.ru/images/srpr/logo11w.png" style="display:none" />
</div> 
...
```

```js
...
slider.Livepicture('add_layer', {
	'bg_color': 'transparent',
	'bg_repeat': 'repeat',
	'l_zoom': 1,
	'l_left': -5,
	'l_top': 10,
	'z_index': 50,
	'x_move': -1,
	'y_move': -1,
	'height': 50,
	'width': 50,
	'bg_img' : 'https://www.google.ru/images/srpr/logo11w.png',
});
...
```


# Demo
<a href="http://lionscrayons.com/livepicture/example_3.html" target="_blank">Demo 1</a>
<br>
<a href="http://codepen.io/levpasha/pen/XJopZz" target="_blank">Demo 1 on codepen</a>

<br><a href="http://lionscrayons.com/livepicture/example_2.html" target="_blank">Demo 2</a>
<br><a href="http://lionscrayons.com/livepicture/example_1.html" target="_blank">Demo 3</a>
