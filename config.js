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
	.constant('PROJECT_IMAGE_URL', '/projects')
	.constant('SLIDER', {
		"animation_speed": "5000"
	});