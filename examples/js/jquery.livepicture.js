(function($){ 
	// defaults setting
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

	var data={};
	
	var methods = {

		init:function(params) {
			var options = $.extend({}, defaults, params);
			
			var c=0;
			this.children('div').each(function()
			{	
				var new_obj = {
					obj: $(this),
					bg_color: $(this).attr('bg_color')===undefined || $(this).attr('bg_color')=="" ? options.bg_color : $(this).attr('bg_color'), 
					bg_repeat: $(this).attr('bg_repeat')===undefined || $(this).attr('bg_repeat')=="" ? options.bg_repeat : $(this).attr('bg_repeat'),
					bg_img: $(this).children('img').attr('src')===undefined || $(this).children('img').attr('src')=="" ? "" : $(this).children('img').attr('src'),
					bg_img_url: $(this).children('img').attr('src')===undefined || $(this).children('img').attr('src')=="" ? "" : "url("+$(this).children('img').attr('src')+")",
					l_width: $(this).attr('l_width')===undefined || $(this).attr('l_width')=="" ? $(this).children('img').width() : $(this).attr('l_width'),
					l_height: $(this).attr('l_height')===undefined || $(this).attr('l_height')=="" ? $(this).children('img').height() : $(this).attr('l_height'),
					l_zoom: $(this).attr('l_zoom')===undefined || $(this).attr('l_zoom')=="" ? options.l_zoom : $(this).attr('l_zoom'),
					l_left: $(this).attr('l_left')===undefined || $(this).attr('l_left')=="" ? options.l_left : $(this).attr('l_left'),
					l_top: $(this).attr('l_top')===undefined || $(this).attr('l_top')=="" ? options.l_top : $(this).attr('l_top'),
					z_index: options.z_index+c,
					x_move: $(this).attr('x_move')===undefined || $(this).attr('x_move')=="" ? options.x_move : $(this).attr('x_move'),
					y_move: $(this).attr('y_move')===undefined || $(this).attr('y_move')=="" ? options.y_move : $(this).attr('y_move')
				};
				data["layer"+c]=new_obj; 
				c++;
			});
			
			this.css({"height" : options.height, "width" : options.width});
	
			for (var key in data) {
				data[key].obj.children('img').remove();
				data[key].obj.attr("id", key).addClass('lp_layer').css({
					"background-color" : data[key].bg_color,
					"background-repeat" : data[key].bg_repeat,
					"background-image" : data[key].bg_img_url,
					"width" : "100%",
					"height" : "100%",
					"background-size": (data[key].l_width / this.width() * 100 * data[key].l_zoom)+"% "+(data[key].l_height / this.height() * 100 * data[key].l_zoom)+"%",
					"background-position": data[key].l_left+"% "+data[key].l_top+"%",
					"z-index" : data[key].z_index,
					"position" : "absolute"
				});
			}
					
			$(document).mousemove(function(e){
				for (var key in data) {
					var relativeX = ( ($(window).width() / 2 - e.pageX) / $(window).width() * 100 * data[key].x_move)  + parseInt(data[key].l_left);
					var relativeY = ( ($(window).height() / 2 - e.pageY) / $(window).height() * 100 * data[key].y_move)  + parseInt(data[key].l_top);
					var bp=""+relativeX+"% "+relativeY+"%";
					data[key].obj.css({"background-position": bp});
				}
			});	


//			console.log(data);

			return this;
		},
		add_layer:function (params){
		
			var options = $.extend({}, defaults, params); 
			
			var c=0;	for (var key in data) {c++;}
			
			this.append('<div class="lp_layer"></div>');
			data["layer"+c]={}; 
			
			var new_obj = {
				obj: $(".lp_layer:last"),
				bg_color: params.bg_color===undefined || params.bg_color=="" ? options.bg_color : params.bg_color, 
				bg_repeat: params.bg_repeat===undefined || params.bg_repeat=="" ? options.bg_repeat : params.bg_repeat,
				bg_img: params.bg_img===undefined || params.bg_img=="" ? options.bg_img : params.bg_img, 
				bg_img_url: params.bg_img===undefined || params.bg_img=="" ? "" : "url("+params.bg_img+")", 
				l_width: params.l_width===undefined || params.l_width=="" ? "" : params.l_width,
				l_height: params.l_height===undefined || params.l_height=="" ? "" : params.l_height, 
				l_zoom: params.l_zoom===undefined || params.l_zoom=="" ? options.l_zoom : params.l_zoom, 
				l_left: params.l_left===undefined || params.l_left=="" ? options.l_left : params.l_left, 
				l_top: params.l_top===undefined || params.l_top=="" ? options.l_top : params.l_top, 
				z_index: options.z_index+c,
				x_move: params.x_move===undefined || params.x_move=="" ? options.x_move : params.x_move, 
				y_move: params.y_move===undefined || params.y_move=="" ? options.y_move : params.y_move
			};
			
			$(".lp_layer:last").html('<img src="'+new_obj.bg_img+'">');
			$(".lp_layer:last").children('img').load(function(){
				
				data["layer"+c]=new_obj; 
				var key="layer"+c;
				new_obj.l_width=$(this).width();
				new_obj.l_height=$(this).height();
				
				data[key].obj.attr("id", key).css({
					"background-color" : data[key].bg_color,
					"background-repeat" : data[key].bg_repeat,
					"background-image" : data[key].bg_img_url,
					"width" : "100%",
					"height" : "100%",
					"background-size": (data[key].l_width / $(window).width() * 100 * data[key].l_zoom)+"% "+(data[key].l_height / $(window).height() * 100 * data[key].l_zoom)+"%",
					"background-position": data[key].l_left+"% "+data[key].l_top+"%",
					"z-index" : data[key].z_index,
					"position" : "absolute"
				});
				
				$(this).remove();
				console.log(data);
			});

		}
	};
	 
	$.fn.Livepicture = function(method){

	    if ( methods[method] ) {
	        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	        return methods.init.apply( this, arguments );
	    } else {
	        $.error( 'Метод "' +  method + '" не найден в плагине jQuery.Livepicture' );
	    }
	};
})(jQuery);
/*

<script>

(function(){var a,b,c,d,e,f,g,h,i,j;a=window.device,window.device={},c=window.document.documentElement,j=window.navigator.userAgent.toLowerCase(),device.ios=function(){return device.iphone()||device.ipod()||device.ipad()},device.iphone=function(){return d("iphone")},device.ipod=function(){return d("ipod")},device.ipad=function(){return d("ipad")},device.android=function(){return d("android")},device.androidPhone=function(){return device.android()&&d("mobile")},device.androidTablet=function(){return device.android()&&!d("mobile")},device.blackberry=function(){return d("blackberry")||d("bb10")||d("rim")},device.blackberryPhone=function(){return device.blackberry()&&!d("tablet")},device.blackberryTablet=function(){return device.blackberry()&&d("tablet")},device.windows=function(){return d("windows")},device.windowsPhone=function(){return device.windows()&&d("phone")},device.windowsTablet=function(){return device.windows()&&d("touch")&&!device.windowsPhone()},device.fxos=function(){return(d("(mobile;")||d("(tablet;"))&&d("; rv:")},device.fxosPhone=function(){return device.fxos()&&d("mobile")},device.fxosTablet=function(){return device.fxos()&&d("tablet")},device.meego=function(){return d("meego")},device.cordova=function(){return window.cordova&&"file:"===location.protocol},device.nodeWebkit=function(){return"object"==typeof window.process},device.mobile=function(){return device.androidPhone()||device.iphone()||device.ipod()||device.windowsPhone()||device.blackberryPhone()||device.fxosPhone()||device.meego()},device.tablet=function(){return device.ipad()||device.androidTablet()||device.blackberryTablet()||device.windowsTablet()||device.fxosTablet()},device.desktop=function(){return!device.tablet()&&!device.mobile()},device.portrait=function(){return window.innerHeight/window.innerWidth>1},device.landscape=function(){return window.innerHeight/window.innerWidth<1},device.noConflict=function(){return window.device=a,this},d=function(a){return-1!==j.indexOf(a)},f=function(a){var b;return b=new RegExp(a,"i"),c.className.match(b)},b=function(a){return f(a)?void 0:c.className+=" "+a},h=function(a){return f(a)?c.className=c.className.replace(a,""):void 0},device.ios()?device.ipad()?b("ios ipad tablet"):device.iphone()?b("ios iphone mobile"):device.ipod()&&b("ios ipod mobile"):b(device.android()?device.androidTablet()?"android tablet":"android mobile":device.blackberry()?device.blackberryTablet()?"blackberry tablet":"blackberry mobile":device.windows()?device.windowsTablet()?"windows tablet":device.windowsPhone()?"windows mobile":"desktop":device.fxos()?device.fxosTablet()?"fxos tablet":"fxos mobile":device.meego()?"meego mobile":device.nodeWebkit()?"node-webkit":"desktop"),device.cordova()&&b("cordova"),e=function(){return device.landscape()?(h("portrait"),b("landscape")):(h("landscape"),b("portrait"))},i="onorientationchange"in window,g=i?"orientationchange":"resize",window.addEventListener?window.addEventListener(g,e,!1):window.attachEvent?window.attachEvent(g,e):window[g]=e,e()}).call(this);

function rs_w(rand)
{
$.ajax({ url: "/ajax/ajax-bg.html?w="+($(window).width()*1.2)+"&h="+($(window).height()*1.2)+"&r="+rand, global: false, type: "GET", async: true, success: function(data){

$('#bg')
    .animate({opacity: 0}, 0, function() {
        $(this)
            .css({'background-image': 'url('+data+')'})
            .animate({opacity: 1}, 500);
    });
}});
return true;
}

var min=1, max=10;
var rand = min + Math.random()*(max+1-min);
rand = rand^0;
rs_w(rand);

  if(device.mobile() || device.tablet())
  {
  	var dl=0;
		window.addEventListener('deviceorientation', function(eventData) 
		{
		  if (device.landscape())
		  {
			var tiltLR = (eventData.gamma-90)/180*$(window).height()*0.2;
			var tiltFB = (eventData.beta-180)/180*$(window).width()*0.15;
				if (dl==0){dl="l";}
				else
				{
					if(dl!="l"){rs_w(rand); dl=0;}
				}
		  }
		  else
		  {
			var tiltLR = (eventData.beta-180)/180*$(window).height()*0.2;
			var tiltFB = (eventData.gamma-90)/180*$(window).width()*0.8;
			if (tiltLR>0){tiltLR=0;}
			if (tiltFB>0){tiltFB=0;}
				if (dl==0){dl="p";}
				else
				{
					if(dl!="p"){rs_w(rand); dl=0;}
				}
		  }

		  $('#bg').css({left: tiltFB, top: tiltLR});
	  }, false);

	 // window.onresize = function(){rs_w(rand);} 
  } 
  else 
  {
	$(document).mousemove(function(e){
	  var offset = $(this).offset();
	  var relativeX = ((e.pageX)/$(window).width())*($(window).width()*0.2);
	  var relativeY = ((e.pageY)/$(window).height())*($(window).height()*0.2)*($(window).width()/$(window).height()*4/3);

	  $('#bg').css({left: -relativeX, top: -relativeY});
	  //console.log("X: " + relativeX + "  Y: " + relativeY);
	});
  }

</script>
*/