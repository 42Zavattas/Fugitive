'use strict';

angular.module('fugitive')
  .animation('.anim-slide-vertical', function() {
  return {
    beforeAddClass : function(element, className, done) {
      if(className == 'ng-hide') {
        console.log(Velocity);
        done();
      }
      else {
        done();
      }
    },
    removeClass : function(element, className, done) {
      if(className == 'ng-hide') {
        element.css('opacity',0);
        jQuery(element).animate({
          opacity:1
        }, done);
      }
      else {
        done();
      }
    }
  };
});
