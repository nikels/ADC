;(function($){
	
	$.fn.rollover = function(config){

		config = $.extend({
			extention: '.jpg',
			replacement: '_over.jpg',
			init: function(i, item){
				
				var preload = new Image(),
					src = $(item).attr('src');
				
				// preload
				preload.src = src.replace(config.extention, config.replacement);
				
				// save values for roll over/out
				$(item).data('rollover', preload.src);
				$(item).data('rollout', src);
				
				// mouse events
				// rollover			
				$(item).bind('mouseover', config.rollover);
				// rollout				
				$(item).bind('mouseout', config.rollout);
				
				// error handling
				$(preload).bind('error', config.error);
			},
			rollover: function(){
				$(this).attr('src', $(this).data('rollover'));
			},
			rollout: function(){
				$(this).attr('src', $(this).data('rollout'));
			},
			error: function(e){
			
				var src = $(e.target).attr('src'),
					img = $('img[src="'+src.replace(config.replacement, config.extention+'"]'));
				
				// Unbind mouseover/out
				img.unbind('mouseover', config.rollover);
				img.unbind('mouseout', config.rollout);
			}
		}, config);
		
		return $(this).each(config.init);
	};
	
})(jQuery);