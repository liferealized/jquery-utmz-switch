// JavaScript Document
;(function($) {

	$.fn.utmzSwitch = function(options) {
		
		var defaults = {  text: 'You need to pass in some text!' };
		
		options = $.extend(defaults, options);
		
		var readCookie = function (name) {
			var nameEQ = name + "=",
				ca = document.cookie.split(';');
			
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			
			return null;
		};
		
		var extractUtmzData = function(data) {
			
			var i = 0,
				splitStore = "",
				nameStore = "",
				returnObject = {};
				
			data = data.split('|');
				
			for (var i=0; i < data.length; i++) {
				
				splitStore = data[i].split("=");
				
				if (splitStore.length == 2) {
					
					if (splitStore[0].indexOf('.') != -1) {
						
						// we have a variables name with . in it so grab the very last item	
						nameStore = splitStore[0].split('.');
						splitStore[0] = nameStore[nameStore.length - 1];
					}
					returnObject[splitStore[0]] = splitStore[1];
				}
			}
				
			return returnObject;
		};
		
		this.each(function(i) {
						   
			var $this = $(this),
				utmzData = readCookie('__utmz');
				
			// only allow the plugin to work on form and if the __umtz cookie is available
			if (utmzData) {
				
				// get the data from our cookie and do the proper manapulation to get a nice object
				utmzData = extractUtmzData(utmzData);
				
				// if we have a campaign id, it means this guest is tied to an adwords campaign
				if (utmzData.utmgclid !== undefined && utmzData.utmgclid !== null) {
					$this.text(options.text);
				}
			}
		});
	};

})(jQuery);

