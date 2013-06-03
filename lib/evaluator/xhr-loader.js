'use strict';
/* jshint browser: true, node: false */

var loader = {};

loader.load = function(url, callback, context) {
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState !== 4) {
			return;
		}

		if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
			callback.call(context, null, xhr.responseText);
		} else {
			callback.call(context, new Error('Failed to request file ' + url + ': ' + xhr.status));
		}
	};

	// disable cache
	url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();

	try {
		xhr.open('GET', url, true);
		xhr.send(null);
	} catch (error) {
		callback.call(context, error);
	}
};