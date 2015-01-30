'use strict';

angular.module('fugitive')
  .service('auth', function ($cookieStore) {
    return {
      isLogged: function () {
        return $cookieStore.get('token') !== null;
      },
      removeToken: function () {
        $cookieStore.remove('token');
      }
    };
  });
