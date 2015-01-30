'use strict';

angular.module('fugitive')
  .animation('.anim-fade', function () {
    return {
      enter: function (element, done) {
        $(element)
          .velocity({ opacity:  0 }, { duration:   0 })
          .velocity({ opacity:  1 }, { duration: 100 }, done);
      },

      leave: function (element, done) {
        $(element).css({ 'z-index': -1 });
        $(element)
          .velocity({  opacity: 1 }, { duration:   0 })
          .velocity({  opacity: 0 }, { duration: 100 }, done);
      }
    };
  });
