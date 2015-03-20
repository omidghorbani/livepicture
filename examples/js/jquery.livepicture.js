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
	var Selector=this;
	
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
					if (data[key].obj){data[key].obj.css({"background-position": bp});}
				}
			});
			
			$(window).resize(function()
			{
				for (var key in data) {
					data[key].obj.css({
						"background-size": (data[key].l_width / $(Selector).width() * 100 * data[key].l_zoom)+"% "+(data[key].l_height / $(Selector).height() * 100 * data[key].l_zoom)+"%"
					});
				}
			});	


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