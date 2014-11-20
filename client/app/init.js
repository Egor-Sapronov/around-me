var angular = require('angular');
require('./login/login.js');

(function () {
    angular.module('app', [])
        .factory('TokenInterceptor', function ($window) {
            return {
                request: function (config) {
                    if ($window.sessionStorage.token) {
                        config.headers['Authorization'] = 'Bearer ' + $window.sessionStorage.Bearer;
                    }
                    return config;
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('TokenInterceptor');
        })
})();
