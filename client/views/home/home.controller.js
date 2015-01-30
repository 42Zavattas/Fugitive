'use strict';

angular.module('fugitive')
  .controller('HomeCtrl', function ($http, $rootScope, $location, $scope) {

    var vm = this;

    var _last = null;
    var _prefix =
      $location.protocol() +
      '://' + $location.host() +
      ($location.port() !== 80 ? ':' + $location.port() : '');

    vm.urlValidate = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    vm.user = { email: 'ou@oou.fr' };

    vm.resLink = null;
    vm.link = {
      dst: ''
    };

    vm.genLink = function () {
      if (_last === vm.link.dst) { return; }
      $http.post('/create', vm.link)
        .then(function (res) {
          vm.link.dst = _prefix + '/' + res.data.src;
          $scope.linkform.$setPristine();
          $rootScope.$broadcast('linkCreated');
          _last = vm.link.dst;

        })
        .catch(function (err) {
          console.log(err);
        });
    };

    vm.isUnchanged = function () {
      console.log(vm.link.dst);
      console.log(_last);
      return _last === vm.link.dst;
    };

    vm.lognup = function () {
      $http.post('/lognup', vm.user)
        .then(function (res) {
          vm.uuid = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    vm.lognupFake = function () {
      window.location.replace("http://localhost:9000/auth/" + vm.uuid);
    };

  });
