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
        });
})();

function initialize() {
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);