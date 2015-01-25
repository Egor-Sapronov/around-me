'use strict';

angular.module('components.auth.service', []);

angular.module('components.auth.service')
    .factory('userService', userService)
    .factory('authenticationService', authenticationService);

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

function authenticationService() {
    var auth = {
        isLogged: false,
        username: ''
    };

    return auth;
}