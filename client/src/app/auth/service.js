'use strict';

angular.module('components.auth.service', []);

userService.$inject = ['$http', '$window'];
function userService($http, $window) {
    return {
        login: function (username, password) {
            return $http.post('/oauth/token', {
                grant_type: 'password',
                client_id: 'web',
                client_secret: 'qwerty',
                username: username,
                password: password
            });
        }
    };
}