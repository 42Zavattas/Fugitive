'use strict';

angular.module('fugitive')
  .controller('LognupCtrl', function ($http) {

    var vm = this;

    vm.status = null;
    vm.user = {
      email: ''
    };

    vm.lognup = function () {
      $http.post('/lognup', vm.user)
        .then(function (res) {
          vm.status = 'OK';
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  });
