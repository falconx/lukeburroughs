angular.module('config', [])
	.constant('HOMEPAGE', {
		"slides": [
			{
				"src": "images/homepage/rewirebg.jpg",
				"alt": "Re-wire",
				"class": "overlay-rewire"
			},
			{
				"src": "images/homepage/remixbg.jpg",
				"alt": "Re-mix",
				"class": "overlay-remix"
			}
		]
	})
	.constant('ANIMATION_TOGGLE_SPEED', 500)
	.constant('DEFAULT_TOGGLE_TEXT', {
		"open": "Show Info",
		"close": "Hide Info"
	})
	.constant('DEFAULT_TOGGLE_OPEN', false)
	.constant('SPINNER_DEFAULTS', {
		lines: 13, // The number of lines to draw
		length: 0, // The length of each line
		width: 5, // The line thickness
		radius: 18, // The radius of the inner circle
		corners: 0.9, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#ff2a7c', // #rgb or #rrggbb or array of colors
		speed: 1.1, // Rounds per second
		trail: 59, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent
	});