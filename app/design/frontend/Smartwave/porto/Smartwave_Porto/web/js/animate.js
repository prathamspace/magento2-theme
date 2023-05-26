/**
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 */

define([
    'jquery'
], function ($) {
    "use strict";
    theme = theme || {};

    $.extend(theme, {
  		requestTimeout: function(fn, delay) {
  			var handler = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  			if ( ! handler ) {
  				return setTimeout(fn, delay);
  			}
  			var start, rt = new Object();

  			function loop( timestamp ) {
  				if ( ! start ) {
  					start = timestamp;
  				}
  				var progress = timestamp - start;
  				progress >= delay ? fn.call() : rt.val = handler( loop );
  			};

  			rt.val = handler( loop );
  			return rt;
  		}
  	});

  	var instanceName = '__animate';

  	var Animate = function($el, opts) {
  		return this.initialize($el, opts);
  	};

  	Animate.defaults = {
  		accX: 0,
  		accY: -120,
  		delay: 1,
  		duration: 1000
  	};

  	Animate.prototype = {
  		initialize: function($el, opts) {
  			if ($el.data(instanceName)) {
  				return this;
  			}

  			this.$el = $el;

  			this
  				.setData()
  				.setOptions(opts)
  				.build();

  			return this;
  		},

  		setData: function() {
  			this.$el.data(instanceName, true);

  			return this;
  		},

  		setOptions: function(opts) {
  			this.options = $.extend(true, {}, Animate.defaults, opts, {
  				wrapper: this.$el
  			});

  			return this;
  		},

  		build: function() {
  			var self = this,
  				$el = this.options.wrapper,
  				delay = 0,
  				duration = 0;

  			$el.addClass('appear-animation');
  			if (!$('html').hasClass('no-csstransitions') && window.innerWidth > 767) {
  				var el_obj = $el.get(0);

  				theme.appear(el_obj, function() {
  					delay = Math.abs($el.data('appear-animation-delay') ? $el.data('appear-animation-delay') : self.options.delay);
  					if (delay > 1) {
  						el_obj.style.animationDelay = delay + 'ms';
  					}

  					duration = Math.abs($el.data('appear-animation-duration') ? $el.data('appear-animation-duration') : self.options.duration);
  					if (duration != 1000) {
  						el_obj.style.animationDuration = duration + 'ms';
  					}

  					if ($el.find('.porto-lazyload:not(.lazy-load-loaded)').length) {
  						$el.find('.porto-lazyload:not(.lazy-load-loaded)').trigger('appear');
  					}
  					$el.addClass($el.data('appear-animation') + ' appear-animation-visible');

  				}, {
  					accX: self.options.accX,
  					accY: self.options.accY
  				});

  			} else {
  				$el.addClass('appear-animation-visible');
  			}

  			return this;
  		}
  	};

  	// expose to scope
  	$.extend(theme, {
  		Animate: Animate
  	});

  	// jquery plugin
  	$.fn.themeAnimate = function(opts) {
  		return this.map(function() {
  			var $this = $(this);

  			if ($this.data(instanceName)) {
  				return $this;
  			} else {
  				return new theme.Animate($this, opts);
  			}

  		});
  	};
});
