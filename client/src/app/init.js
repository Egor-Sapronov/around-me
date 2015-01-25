'use strict';
require('./auth/controllers');

angular.module('mainMap', ['uiGmapgoogle-maps'])
    .config(mapConfig)
    .controller('mapController', mapController);

mapConfig.$inject = ['uiGmapGoogleMapApiProvider'];
function mapConfig(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDasQqDYAQVPfnB4VDTk490mf-Mz2hi-RY',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
}

mapController.$inject = ['$scope', 'uiGmapGoogleMapApi'];
function mapController($scope, uiGmapGoogleMapApi) {
    $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

    uiGmapGoogleMapApi.then(function (maps) {

    });
}

// Plugin initialization
$('.button-collapse').sideNav();

