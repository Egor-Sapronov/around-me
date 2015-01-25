'use strict';
require('./service');

angular.module('components.auth.controllers', ['components.auth.service']);
angular.module('components.auth.controllers')
    .controller("LoginController", LoginController);

LoginController.$inject = ['$window', '$location', 'userService', 'authenticationService'];
function LoginController($window, $location, userService, authenticationService) {
    var vm = this;

    vm.login = login;

    function login(username, password) {
        userService.login(username, password)
            .success(function (data) {
                authenticationService.isLogged = true;
                authenticationService.username = username;
                $window.sessionStorage.Bearer = data.access_token;
                $window.sessionStorage.User = username;
                $location.path('/');
            })
            .error(function (status, data) {

            });
    }
}