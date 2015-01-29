'use strict';

angular.module('fugitive')
  .controller('HomeCtrl', function ($http, $rootScope, $location) {

    var vm = this;

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
      $http.post('/create', vm.link)
        .then(function (res) {
          vm.link.dst = _prefix + '/' + res.data.src;
          $rootScope.$broadcast('linkCreated');

        })
        .catch(function (err) {
          console.log(err);
        });
    };

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
