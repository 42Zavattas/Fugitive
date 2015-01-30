'use strict';

angular.module('fugitive')
  .controller('ProfileCtrl', function ($http) {

    var vm = this;

    this.links = [];

    $http.get('/api/links').then(function (res) {
      this.links = res.data;
    });

    vm.create = function () {
      $http.post('/api/links', { dst: 'google.fr', num: 3 }).then(function (res) {
        console.log(res);
      });
    };

    vm.delete = function (link) {
      $http.delete('/api/links/' + link._id).then(function (res) {
        this.links.splice(this.links.map(function (e) { return e._id; }).indexOf(link._id), 1);
        console.log(res);
      });
    };

  });
