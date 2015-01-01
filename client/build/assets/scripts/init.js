(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
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
})();

(function($){
    $(function(){

        $('.button-collapse').sideNav();

    }); // end of document ready
})(jQuery);
},{}]},{},[1]);
