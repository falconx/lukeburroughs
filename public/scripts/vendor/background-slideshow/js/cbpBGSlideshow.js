/**
 * cbpBGSlideshow.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpBGSlideshow = (function() {

	var $slideshow = $( '#cbp-bislideshow' ),
		$items = $slideshow.children( 'li' ),
		itemsCount = $items.length,
		$controls = $( '#cbp-bicontrols' ),
		navigation = {
			$navPrev : $controls.find( 'span.cbp-biprev' ),
			$navNext : $controls.find( 'span.cbp-binext' ),
			$navPlayPause : $controls.find( 'span.cbp-bipause' )
		},

		// current item´s index
		current = 0,

		// timeout
		slideshowtime,

		// true if the slideshow is active
		isSlideshowActive = true,

		// Determines whether we can change slide yet
		canSlide = true,
		
		// it takes 5 seconds to change the background image
		interval = 5000;

	function init( config ) {

		$slideshow = $( '#cbp-bislideshow' );
		$items = $slideshow.children( 'li' );
		itemsCount = $items.length;
		$controls = $( '#cbp-bicontrols' );
		canSlide = true,
		navigation = {
			$navPrev : $controls.find( 'span.cbp-biprev' ),
			$navNext : $controls.find( 'span.cbp-binext' ),
			$navPlayPause : $controls.find( 'span.cbp-bipause' )
		};

		// preload the images
		var imgLoad = imagesLoaded( $slideshow );

		var loaded_first = false;

		imgLoad.on('always', function() {
			if( !loaded_first ) {
				if( Modernizr.backgroundsize ) {
					$items.each( function() {
						var $item = $( this );
						$item.css( 'background-image', 'url(' + $item.find( 'img' ).attr( 'src' ) + ')' );
					} );
				}
				else {
					$slideshow.find( 'img' ).show();
					// for older browsers add fallback here (image size and centering)
				}

				// show first item
				$items.eq( current ).css( 'opacity', 1 );

				// initialize/bind the events
				initEvents();

				// start the slideshow
				startSlideshow();

				// custom trigger to notify us of a slide initialisation
				$slideshow.trigger('slide-init', $items.eq(current));

				loaded_first = true;
			}
		});
		
	}

	function initEvents() {

		navigation.$navPlayPause.on( 'click', function() {

			var $control = $( this );
			if( $control.hasClass( 'cbp-biplay' ) ) {
				$control.removeClass( 'cbp-biplay' ).addClass( 'cbp-bipause' );
				startSlideshow();
			}
			else {
				$control.removeClass( 'cbp-bipause' ).addClass( 'cbp-biplay' );
				stopSlideshow();
			}

		} );

		navigation.$navPrev.on( 'click', function() { 
			navigate( 'prev' ); 
			if( isSlideshowActive ) { 
				stopSlideshow(); 
			} 
		} );

		navigation.$navNext.on( 'click', function() { 
			navigate( 'next' ); 
			if( isSlideshowActive ) { 
				stopSlideshow(); 
			}
		} );

	}

	function navigate( direction ) {

		if( canSlide ) {
			canSlide = false;

			// current item
			var $oldItem = $items.eq( current );
			
			if( direction === 'next' ) {
				current = current < itemsCount - 1 ? ++current : 0;
			} else if( direction === 'prev' ) {
				current = current > 0 ? --current : itemsCount - 1;
			}

			// new item
			var $newItem = $items.eq( current );

			// slide transition
			$oldItem.css( 'opacity', 0 );
			$newItem.animate({ 'opacity': 1 }, function() {
				setTimeout(function() {
					canSlide = true;
				}, 1000);
			});

			// custom trigger to notify us of a slide change
			$slideshow.trigger('slide-change', $items.eq(current));
		}

	}

	function startSlideshow() {

		isSlideshowActive = true;
		clearTimeout( slideshowtime );
		slideshowtime = setTimeout( function() {
			navigate( 'next' );
			startSlideshow();
		}, interval );

	}

	function stopSlideshow() {

		isSlideshowActive = false;
		clearTimeout( slideshowtime );

	}

	return { init : init };

})();