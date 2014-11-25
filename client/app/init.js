(function () {
    var angular = require('angular');
    require('angularGoogleMap');
    angular.module('mainMap', ['uiGmapgoogle-maps'])
        .config(function (uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyDasQqDYAQVPfnB4VDTk490mf-Mz2hi-RY',
                v: '3.17',
                libraries: 'weather,geometry,visualization'
            });
        })
        .controller('mapController', mapController);

    mapController.$inject = ['$scope', 'uiGmapGoogleMapApi'];
    function mapController($scope, uiGmapGoogleMapApi) {
        $scope.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

        uiGmapGoogleMapApi.then(function (maps) {

        });
    }
})();