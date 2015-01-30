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
        .then(function () {
          vm.status = 'OK';
          vm.user.email = '';
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  });
