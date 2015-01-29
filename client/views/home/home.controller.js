'use strict';

angular.module('fugitive')
  .controller('HomeCtrl', function ($http) {

    var vm = this;

    vm.user = { email: 'ou@oou.fr' };

    vm.lognup = function () {
      $http.post('/lognup', vm.user)
        .then(function (res) {
          vm.uuid = res.data;
          console.log(vm.uuid);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    vm.lognupFake = function () {
      window.location.replace("http://localhost:9000/auth/" + vm.uuid);
    };

  });
