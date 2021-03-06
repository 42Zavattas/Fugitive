'use strict';

angular.module('fugitive')
  .controller('ProfileCtrl', function ($http, $location, auth) {

    var vm = this;

    vm.links = [];

    vm.newLink = {
      dst: null,
      num: 1,
      time: 'none',
      rpl: null,
      geo: []
    };

    vm.mode = null;

    vm.switchMode = function (mode) {
      vm.newLink.time = 'none';
      vm.newLink.num = 1;
      if (mode === vm.mode) { return vm.mode = null; }
      vm.mode = mode;
    };

    vm.newGeo = { country: '' };

    vm.addGeo = function () {
      if (!vm.newGeo.country || !vm.newGeo.rpl) { return ; }
      if (vm.newLink.geo.map(function (e) { return e.country; }).indexOf(vm.newGeo.country) !== -1) {
        return ;
      }
      vm.newLink.geo.push({ country: vm.newGeo.country, rpl: vm.newGeo.rpl });
      vm.newGeo = {};
    };

    vm.removeGeo = function (country) {
      vm.newLink.geo.splice(vm.newLink.geo.map(function (e) { return e.country; }).indexOf(country), 1);
    };

    $http.get('/api/links').then(function (res) {
      vm.links = res.data;
    });

    vm.create = function () {
      $http.post('/api/links', vm.newLink).then(function (res) {
        vm.links.push(res.data);
      });
    };

    vm.delete = function (link) {
      $http.delete('/api/links/' + link._id).then(function (res) {
        vm.links.splice(vm.links.map(function (e) { return e._id; }).indexOf(link._id), 1);
      });
    };

    vm.deleteMyAccount = function () {
      $http.delete('/api/users').then(function () {
        auth.removeToken();
        $location.path('/');
      });
    };

  });
