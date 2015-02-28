'use strict';

angular.module('fugitive')
  .controller('AuthCtrl', function ($http, $location, $timeout, $cookieStore) {

    $http.post('/auth', { uuid: $location.$$url.substr(6) })
      .then(function (res) {
        if (res.data.token) {
          $cookieStore.put('token', res.data.token);
        }
        $timeout(function () { $location.path('/'); }, 500);
      }, function () {
        $location.path('/');
      });

  });
