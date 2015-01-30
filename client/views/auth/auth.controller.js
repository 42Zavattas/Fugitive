'use strict';

angular.module('fugitive')
  .controller('AuthCtrl', function ($http, $location, $cookieStore) {

    $http.post('/auth', { uuid: $location.$$url.substr(6) })
      .then(function (res) {
        $cookieStore.put('token', res.data.token);
        $location.path('/');
      });

  });
