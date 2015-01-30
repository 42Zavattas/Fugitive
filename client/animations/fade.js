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
  })
  .animation('.anim-rightout', function () {
    return {
      enter: function (element, done) {
        $(element)
          .velocity({ translateX:  0 }, { duration: 0 }, done);
      },

      leave: function (element, done) {
        $(element)
          .velocity({ translateX:  0 }, { duration:   0 })
          .velocity({ translateX:  '150%' }, { duration: 250 }, done);
      }
    };
  })
  .animation('.anim-topout', function () {
    return {
      enter: function (element, done) {
        $(element)
          .velocity({ translateY:  '-10px', opacity: 0 }, { duration: 0 })
          .velocity({ translateY:  0, opacity: 1 }, { duration: 350, easing: 'ease-out' }, done);
      },

      leave: function (element, done) {
        $(element)
          .velocity({ translateY:  0 }, { duration:   0 })
          .velocity({ translateY:  '-300%', opacity: 0 }, { duration: 250 }, done);
      }
    };
  })
  .animation('.anim-botout', function () {
    return {
      enter: function (element, done) {
        $(element)
          .velocity({ translateY:  0, opacity: 1 }, { duration: 0 }, done);
      },

      leave: function (element, done) {
        $(element)
          .velocity({ translateY:  0 }, { duration:   0 })
          .velocity({ translateY:  '300%', opacity: 0 }, { duration: 250 }, done);
      }
    };
  });
