'use strict';

angular.module('components.auth.service', []);

userService.$inject = ['$http'];
function userService($http) {
    return {
        login: function (username, password) {
            return $http.post('/oauth/token', {
                grant_type: 'password',
                client_id: 'web',
                client_secret: 'qwerty',
                username: username,
                password: password
            });
        },
        register: function (registerData) {
            return $http.post('/oauth/register', registerData);
        },
        userInfo: function () {
            return $http.get('/oauth/userInfo');
        }
    };
}