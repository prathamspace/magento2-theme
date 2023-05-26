/**
 *
 * Do not edit or add to this file if you wish to upgrade this extension to newer
 * version in the future.
 *
 */
window.theme = {};
define([
    'jquery'
], function ($) {
    "use strict";
    theme = theme || {};

    var checks = [],
      timerId = false,
      one,
      a, b, o, x, y, ax, ay,
      retryCounter = 0,
      has_event = false;

    var checkAll = function() {
      if (!checks.length) {
        if (retryCounter > 10) {
          window.removeEventListener('scroll', checkAll);
          window.removeEventListener('resize', checkAll);
        }
        retryCounter++;
      } else {
        for ( var i = checks.length; i--; ) {
          one = checks[i];
          a = window.pageXOffset;
          b = window.pageYOffset;
          o = one.el.getBoundingClientRect();
          x = o.left + a;
          y = o.top + b;
          ax = one.options.accX;
          ay = one.options.accY;

          if (y + o.height + ay >= b &&
            y <= b + window.innerHeight + ay &&
            x + o.width + ax >= a &&
            x <= a + window.innerWidth + ax) {

            one.fn.call(one.el, one.data);
            checks.splice(i, 1);
          }
        }
      }
      timerId = false;
    };

    window.theme.appear = function(el, fn, options) {
      var settings = {
        data: undefined,
        accX: 0,
        accY: 0
      };

      if ( options ) {
        options.data && ( settings.data = options.data );
        options.accX && ( settings.accX = options.accX );
        options.accY && ( settings.accY = options.accY );
      }

      checks.push({ el: el, fn: fn, options: settings });
      if ( ! timerId ) {
        timerId = theme.requestTimeout(checkAll, 100);
      }

      if ( ! has_event ) {
        $( document.body ).on( 'appear_refresh', checkAll );
        window.addEventListener('scroll', checkAll, {passive: true});
        window.addEventListener('resize', checkAll);
        has_event = true;
      }
    }
});
