'use strict';

angular.module('fugitive')
  .directive('zavaCubes', function () {
    return {
      restrict   : 'E',
      link       : function (scope, element) {

        var $el = $(element);

        $el.css({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          'z-index': -1
        });

        var cubeHtml = '<div class="zava-cube"></div>';

        var tab = [];
        for (var i = 0; i < 100; i++) {
          var newEl = $(cubeHtml);
          tab.push(newEl);
          $el.append(newEl);
        }

        var durationMin = 1000;
        var durationMax = 5000;

        function animRand (el, i) {
          var duration = Math.random() * (durationMax - durationMin) + durationMin;
          var side = Math.random() * 30 + 5;
          var left = Math.random() * (600 - side);
          el.css({ left: left, top: 0, height: side, width: side });

          el.velocity({
            top: '360px'
          }, { duration: duration, easing: 'ease-in', complete: function () { animRand(el, i); } });
        }

        for (i = 0; i < tab.length; i++) {
          animRand(tab[i], i);
        }

      }
    };
  });
