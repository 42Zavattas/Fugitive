'use strict';

angular.module('fugitive')
  .controller('ProfileCtrl', function ($http, $location, auth) {

    var vm = this;

    vm.links = [];

    vm.newLink = {
      dst: null,
      num: 0,
      time: 'none',
      rpl: null,
      geo: []
    };

    vm.newGeo = {};

    vm.addGeo = function () {
      if (!vm.newGeo.country || !vm.newGeo.rpl) { return ; }
      if (vm.newLink.geo.map(function (e) { return e.country; }).indexOf(vm.newGeo.country) !== -1) {
        // TODO show error?
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
