'use strict';

angular.module('fugitive')
  .controller('ProfileCtrl', function ($http) {

    var vm = this;

    this.links = [];

    $http.get('/api/links').then(function (res) {
      vm.links = res.data;
    });

    vm.create = function () {
      $http.post('/api/links', { dst: 'google.fr', num: 3 }).then(function (res) {
        vm.links.push(res.data);
      });
    };

    vm.delete = function (link) {
      $http.delete('/api/links/' + link._id).then(function (res) {
        vm.links.splice(vm.links.map(function (e) { return e._id; }).indexOf(link._id), 1);
        console.log(res);
      });
    };

  });
