(function($) {
	'use strict';

	var ImageTransition = window.ImageTransition || {};

	ImageTransition = function(elem, settings) {

		var _ = this;
		
		_.oldWindowW = $(window).width();
		
		_.settings = settings || {};

		_.$imageWrapper = $(elem);
		_.$image = _.$imageWrapper.find('div').eq(0); // takes the first element from its container
		_.$transitionContainer = _.settings.transitionContainer || null;

		_.transitionIsLaunched = false;

		// image wrapper initial position. We need this when .launchToggle() method is used
		 _.wrapperInitialPos = {
			'top': _.settings.initialY,
			'left': _.settings.initialX
		}
		console.log(_.wrapperInitialPos.left);
		// initialize and set props to our elements
		_.initialize();
		_.addEvents();
	};

	ImageTransition.prototype.addEvents = function() {

		var _ = this;

		$(window).on('resize', $.proxy(_.onResize, _));

	}

	ImageTransition.prototype.onResize = function(e) {

		var _ = this;
		
		var imageOffsetLeft = _.$transitionContainer.offset().left - _.$imageWrapper.offset().left;
		var imageOffsetTop = _.$transitionContainer.offset().top - _.$imageWrapper.offset().top;
		var imageWidth = _.$transitionContainer.outerWidth();
		var imageHeight = _.$transitionContainer.outerHeight();

		_.$image.css({
			 'left': imageOffsetLeft + 'px',
			 'top': imageOffsetTop + 'px',
			'width': imageWidth + 'px',
			'height': imageHeight + 'px',
			'position': 'absolute',
			'transition': ''
		});
		
		var newWindowW = $(window).width();
		
		var diff = _.oldWindowW - newWindowW;
	
		if (!_.transitionIsLaunched) {
			_.wrapperInitialPos.top = _.$imageWrapper.position().top;
			_.wrapperInitialPos.left = _.$imageWrapper.position().left;
		}
		
	}

	// applies all the dimensions to our elements we defined in our settings
	ImageTransition.prototype.initialize = function() {

		var _ = this;

		// the sequence is important here
		_.prepareTransitionContainer();
		_.setWrapperProps();
		_.positionImage();
	}

	ImageTransition.prototype.prepareTransitionContainer = function() {

		var _ = this;

		_.$transitionContainer.css('overflow', 'hidden');

	}

	ImageTransition.prototype.positionImage = function() {

		var _ = this;

		 var imageOffsetLeft =  _.$transitionContainer.offset().left -_.$imageWrapper.offset().left;
		 var imageOffsetTop = _.$transitionContainer.offset().top - _.$imageWrapper.offset().top;
		 var imageWidth = _.$transitionContainer.outerWidth();
		 var imageHeight = _.$transitionContainer.outerHeight();

		_.$image.css({
			'top': imageOffsetTop + 'px',
			'left': imageOffsetLeft + 'px',
			'width': imageWidth + 'px',
			'height': imageHeight + 'px'
		});

	}

	ImageTransition.prototype.setWrapperProps = function() {

		var _ = this;

		_.$imageWrapper.css({
			'transition': 'all ' + _.settings.transitionDuration + 's',
			'width': _.settings.initialWidth,
			'height': _.settings.initialHeight,
			'top': _.settings.initialY,
			'left': _.settings.initialX
		});

	}

	ImageTransition.prototype.launch = function() {

		var _ = this;

		if (_.transitionIsLaunched) return;

		var resultingTop = _.$imageWrapper.position().top - (_.settings.finalHeight / 2);
		var resultingLeft = _.$imageWrapper.position().left - (_.settings.finalWidth / 2);

		_.$imageWrapper.css({
			'width': _.settings.finalWidth,
			'height': _.settings.finalHeight,
			'top': resultingTop,
			'left': resultingLeft,
			'transition': 'all ' + _.settings.transitionDuration + 's'
		});

		_.$image.css({
			'top': _.settings.finalHeight / 2 + _.$image.position().top,
			'left': _.settings.finalWidth / 2 + _.$image.position().left,
			 'transition': 'all ' + _.settings.transitionDuration + 's'
		});

		_.transitionIsLaunched = true;
	}
	
	ImageTransition.prototype.removeTransition = function() {

		var _ = this;

		if (!_.transitionIsLaunched) return;
		
		var imageOffsetLeft = _.wrapperInitialPos.left - _.$transitionContainer.offset().left;
		var imageOffsetTop = _.$transitionContainer.offset().top - _.wrapperInitialPos.top;
		
		_.$image.css({
			 'left': -(_.wrapperInitialPos.left) + 'px',
			 'top': -(_.wrapperInitialPos.top) + 'px',
			 'transition': 'all ' + _.settings.transitionDurationBackward + 's'
		});

		_.$imageWrapper.css({
			'width': _.settings.initialWidth,
			'height': _.settings.initialHeight,
			'top': _.settings.initialY,
			'left': _.settings.initialX,
			'transition': 'all ' + _.settings.transitionDurationBackward + 's'
		});
	
		// _.$image.css({
		// 	'transition': 'all ' + _.settings.transitionDurationBackward + 's',
		// 	'top': -(_.wrapperInitialPos.top),
		// 	'left': -(_.wrapperInitialPos.left)
		// });
		
		_.transitionIsLaunched = false;
		console.log(_.wrapperInitialPos.left);
	}
	
	ImageTransition.prototype.launchToggle = function() {

		var _ = this;

		if (_.transitionIsLaunched) {
			_.removeTransition();	
		} else {
			_.launch();
		}
		
	}

	$.fn.imageTransition = function() {

		var _ = this;
		var settings = arguments[0];
		var args = [].slice.call(_, arguments[1]);
		var ret;

		_.savedInstance;
		if (typeof settings == 'object') {
			_.imageTransition[0] = new ImageTransition(_, settings);
		} else {

			ret = _.imageTransition[0][settings].apply(_.imageTransition[0], args);
		}

		if (typeof ret != undefined) return ret;

		return _;

	}

})(jQuery);

