'use strict';

angular.module('fugitive')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    vm.lognup = function () {
      $http.post('/users')
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  });
