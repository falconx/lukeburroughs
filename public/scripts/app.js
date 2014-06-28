// TODO: Escape key binding to remove overlay

angular.module('lukeburroughs', [
	'ngRoute',
	'ngAnimate',
	'ngTouch'
])

.constant('AppConfig', {
	'homepage': {
		'slides': [{
			'src': 'dist/images/homepage/001.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/002.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/003.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/004.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/005.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/006.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/007.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/008.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/009.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/010.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/011.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/012.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/013.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/014.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/015.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		},
		{
			'src': 'dist/images/homepage/016.jpg',
			'alt': 'Design&Build',
			'class': 'overlay-homepage'
		}]
	},
	'email_address': 'luke.burroughs@btinternet.com',
	'animation': {
		'toggle_speed': 500
	},
	'defaults': {
		'toggle_open': false,
		'spinner_config': {
			'lines': 13, // The number of lines to draw
			'length': 0, // The length of each line
			'width': 5, // The line thickness
			'radius': 18, // The radius of the inner circle
			'corners': 0.9, // Corner roundness (0..1)
			'rotate': 0, // The rotation offset
			'direction': 1, // 1: clockwise, -1: counterclockwise
			'color': '#ff2a7c', // #rgb or #rrggbb or array of colors
			'speed': 1.1, // Rounds per second
			'trail': 59, // Afterglow percentage
			'shadow': false, // Whether to render a shadow
			'hwaccel': false, // Whether to use hardware acceleration
			'className': 'spinner', // The CSS class to assign to the spinner
			'zIndex': 2e9, // The z-index (defaults to 2000000000)
			'top': '50%', // Top position relative to parent
			'left': '50%' // Left position relative to parent
		}
	},
	'translations': {
		'toggle_text': {
			'open': 'Show Info',
			'close': 'Hide Info'
		},
		'contact_form': {
			'message_missing': 'Missing something?',
			'message_placeholder': 'hello'
		}
	}
})

/**
 * Routing
 */
.config(function( $routeProvider ) {
	$routeProvider
		.when('/', {
			templateUrl: 'templates/index.html'
		})
		.when('/project/:name', {
			controller: 'projectController',
			templateUrl: 'templates/project.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})

.factory('Spinner', function( $rootScope, $timeout ) {
	var factory = {};

	factory.spin = function() {
		// Broadcast on next cycle to ensure all our elements have been initialised
		$timeout(function() {
			$rootScope.$broadcast('spinner:spin');
		});
	};

	factory.stop = function() {
		// Broadcast on next cycle to ensure all our elements have been initialised
		$timeout(function() {
			$rootScope.$broadcast('spinner:stop');
		});
	};

	return factory;
})

.factory('Project', function( $http, Spinner ) {
	var factory = {
			projects: []
		};

	// Show spinner until we have fetched our projects
	Spinner.spin();

	$http.get('projects.json')
		.success(function( data ) {
			angular.forEach(data, function( project ) {
				// Point slide src to project's asset directory
				angular.forEach(project.slides, function( slide ) {
					slide.src = 'dist/projects/' + project.id + '/' + slide.image;
				});

				// Add project to binded project list
				factory.projects.push( project );
			});

			Spinner.stop();
		});

	factory.get = function( projectId )  {
		return _.findWhere(factory.projects, { id: projectId });
	};

	return factory;
})

.directive('spinner', function() {
	return {
		restrict: 'E',
		scope: true,
		link: function( scope, element, attrs ) {
			scope.spinner = null;

			scope.spin = function() {
				if( scope.spinner ) {
					scope.spinner.spin( element[0] );
				}
			};

			scope.$watch(attrs.config, function( config ) {
				scope.spinner = new Spinner( config );
				scope.spin();
			}, true);

			scope.stop = function() {
				if( scope.spinner ) {
					scope.spinner.stop();
				}
			};

			scope.$on('spinner:spin', function() {
				scope.spin();
			});

			scope.$on('spinner:stop', function() {
				scope.stop();
			});

			scope.$on('$destroy', function() {
				scope.stop();
				scope.spinner = null;
			});
		}
	};
})

/**
 * Pads a number with preceeding zeroes e.g. 5 becomes 005
 */
.filter('padNumber', function() {
	return function pad( input, length ) {
		input = input.toString();
		return input.length < length ? pad("0" + input, length) : input;
    };
})

/**
 * jQuery wrapped slipe up/down animation
 */
.animation('.slide-toggle', function( $rootScope, AppConfig ) {
	return {
		addClass: function( el, className, done ) {
			if( $rootScope.enableAnimations ) {
				el.show().slideUp( AppConfig.animation.toggle_speed, done );
			} else {
				el.hide();
			}
		},
		removeClass: function( el, className, done ) {
			if( $rootScope.enableAnimations ) {
				el.hide().slideDown( AppConfig.animation.toggle_speed, done );
			} else {
				el.show();
			}
		}
	};
})

.directive('slideshow', function( $window, $timeout, $swipe, Spinner ) {
	return {
		restrict: 'E',
		templateUrl: 'templates/directives/slideshow.html',
		scope: {
			slides: '=',
			onchange: '&'
		},
		link: function( scope, element, attrs ) {
			Spinner.spin();

			$timeout(function() {
				cbpBGSlideshow.init();
			});

			element.on('slide-init', function( evt ) {
				Spinner.stop();
			});

			element.on('slide-init slide-change', function( evt, slide ) {
				scope.onchange({ slide: slide });
			});

			$swipe.bind(element, {
				'start': function( coords ) {
					start = coords;
				},
				'end': function( coords ) {
					var delta = coords.x - start.x;

					if( delta < 0 ) {
						$('.cbp-biprev', element).trigger('click');
					} else if( delta > 0 ) {
						$('.cbp-binext', element).trigger('click');
					}
				}
			});

			angular.element( $window ).on('keydown', function() {
				switch( event.keyCode ) {
					// Left
					case 37:
						$('.cbp-biprev', element).trigger('click');
						break;

					// Right
					case 39:
						$('.cbp-binext', element).trigger('click');
						break;

					// Escape
					case 27:
						// TODO: Remove overlay
						break;
				}
			});
		}
	};
})

.directive('overlay', function( $window, $timeout, $compile, $http, Spinner ) {	
	return {
		restrict: 'E',
		templateUrl: 'templates/directives/overlay.html',
		scope: {
			name: '=',
			show: '='
		},
		link: function( scope, element, attrs ) {
			var templatePath = 'templates/overlays/',
				templateMap = {
					build: 'build.html',
					contact: 'contact.html',
					manifesto: 'manifesto.html'
				};

			scope.show = angular.isDefined( scope.show ) ? scope.show : false;

			// Load base template with include directive to our mapped template
			$http.get('templates/directives/overlay.html')
				.success(function( data ) {
					element.html( data );
					$compile( element.contents() )(scope);
				});

			scope.close = function() {
				scope.show = false;
			};

			scope.$watch('name', function( newVal, oldVal ) {
				if( newVal ) {
					scope.template = templatePath + templateMap[ newVal ];

					// Bit of a hack to get the animation to work on tab change. Hide and re-show the
					// ng-include content to trigger the animation.
					scope.show = false;

					// Show spinner until new content is loaded
					Spinner.spin();

					$timeout(function() {
						scope.show = true;

						// Wait until the overlay is visible before we measure the document height
						$timeout(function() {
							scope.updateHeight();
							Spinner.stop();
						});
					});
				}
			});

			/**
			 * Re-calculates and updates the overlays height based on the document
			 */
			scope.updateHeight = function() {
				element.children('.overlay').height( $(document).height() );
			};

			angular.element( $window ).on('resize', function() {
				if( scope.show ) {
					scope.updateHeight();
				}
			});
		}
	};
})

.directive('toggle', function( AppConfig ) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			open: '=isOpen',
			textColour: '='
		},
		templateUrl: 'templates/directives/toggle.html',
		link: function( scope, element, attrs ) {
			scope.isOpen = angular.isDefined( attrs.open ) ? attrs.open : AppConfig.defaults.toggle_open;

			// Set open and closed toggle label text
			scope.textOpen = (attrs.textOpen) ? attrs.textOpen : AppConfig.translations.toggle_text.open;
			scope.textClose = (attrs.textClose) ? attrs.textClose : AppConfig.translations.toggle_text.close;
			scope.text = (scope.isOpen) ? scope.textClose : scope.textOpen;

			scope.toggle = function() {
				scope.isOpen = !scope.isOpen;
			};

			scope.$watch('isOpen', function( newVal, oldVal ) {
				scope.text = (scope.isOpen) ? scope.textClose : scope.textOpen;
			});
		}
	};
})

.controller('mainController', function( $scope, $rootScope, $timeout, $animate, Project, AppConfig ) {
	$scope.projects = Project.projects;
	$scope.slides = AppConfig.homepage.slides;
	$scope.spinnerConfig = AppConfig.defaults.spinner_config;

	// Turn off custom animation until our app is ready
	$rootScope.enableAnimations = false;

	// Enable custom animation once our content is loaded
	$scope.$on('$viewContentLoaded', function() {
		$rootScope.enableAnimations = true;
	});

	// Reset colours upon route change
	$scope.$on('$routeChangeSuccess', function( evt, current, previous ) {
		$scope.colours = null;
	});

	/**
	 * Shows the specified overlay by name
	 */
	$scope.show = function( overlayName ) {
		$scope.overlay = {
			name: overlayName,
			show: true
		};
	};

	/**
	 * Updates text and background colours on slide update
	 */
	$scope.$on('slide-change', function( evt, slide ) {
		$scope.$apply(function() {
			$scope.colours = {
				'color': slide.colour,
				'background-color': slide.background
			};
		});
	});

	// Display loading overlay background based on spinner state

	$scope.$on('spinner:spin', function() {
		$scope.loading = true;
	});

	$scope.$on('spinner:stop', function() {
		$scope.loading = false;
	});
})

.controller('contactFormController', function( $scope, $window, AppConfig ) {
	$scope.contact = {
		name: '',
		details: '',
		message: ''
	};

	$scope.messagePlaceholder = AppConfig.translations.contact_form.message_placeholder;

	$scope.send = function( contact ) {
		if( contact.message !== AppConfig.translations.contact_form.message_missing ) {
			if( !contact.message ) {
				contact.message = AppConfig.translations.contact_form.message_missing;
			} else if( $scope.contactForm.$valid ) {
				// Open email client with composed message
				var body = "My name is " + contact.name + ", you can contact me back at " + contact.details + "%0D%0A%0D%0A" + contact.message.split('\n').join("%0D%0A");
				$window.open('mailto:' + AppConfig.email_address + '?body=' + body, '_blank');
			}
		}
	};
})

.controller('navController', function( $scope, $rootScope, $routeParams, Project ) {
	// Listen for route changes as the controller is outside of ng-view
	$rootScope.$on('$routeChangeSuccess', function( evt, current, previous ) {
		$scope.project = null;

		if( $routeParams.name ) {
			// Set the current project based on route argument
			$scope.project = Project.get( $routeParams.name );

			// Expand projects list for project pages
			// By default it will be close on non-project pages but maintain it's open state between routes
			if( !!$scope.project ) {
				$scope.showProjectList = true;
			}

			// Don't show all projects by default for project pages, otherwise show
			$scope.listAllProjects = !$scope.project;
		}
	});
})

.controller('projectController', function( $scope, $location, $routeParams, Project ) {
	if( $routeParams.name ) {
		$scope.project = Project.get( $routeParams.name );
	}

	/**
	 * Slide change and initialisation callback
	 */
	$scope.changeSlide = function( slide ) {
		if( slide && $scope.project ) {
			var slideIndex = $(slide).index(),
				currentSlide = $scope.project.slides[ slideIndex ];

			// Updates the text and background colour according to the current slide config
			$scope.$emit('slide-change', currentSlide);
		}
	};
});