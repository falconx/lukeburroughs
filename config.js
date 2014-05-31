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
	.constant('DEFAULT_TOGGLE_OPEN', false);