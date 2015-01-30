'use strict';

angular.module('fugitive')
  .controller('LognupCtrl', function ($http, $location, $scope) {

    var vm = this;

    var _prefix =
      $location.protocol() +
      '://' + $location.host() +
      ($location.port() !== 80 ? ':' + $location.port() : '');

    vm.status = null;
    vm.user = {
      email: ''
    };

    vm.lognup = function () {
      $http.post('/lognup', vm.user)
        .then(function (res) {
          vm.status = 'OK';
          vm.user.email = '';
          vm.mockLink = _prefix + '/' + res.data;
          $scope.lognupform.$setPristine();
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  });
