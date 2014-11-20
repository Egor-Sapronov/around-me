module.exports = (function () {
    angular.module('components.login', [])
        .controller('loginController', ['$scope', '$attrs', '$window', '$location', 'UserService', 'AuthenticationService', function ($scope, $attrs, $window, $location, UserService, AuthenticationService) {
            $scope.login = function (username, password) {
                UserService.logIn(username, password)
                    .success(function (data) {
                        AuthenticationService.isLogged = true;
                        AuthenticationService.username = data.username;
                        $window.sessionStorage.Bearer = data.access_token;
                        $window.location.href = '/';
                    })
                    .error(function (status, data) {

                    });
            };
        }])
        .factory('UserService', ['$http', function ($http) {
            return {
                logIn: function (username, password) {
                    return $http.post('/oauth/token', {
                        grant_type: 'password',
                        client_id: 'web',
                        client_secret: 'qwerty',
                        username: username,
                        password: password
                    });
                }
            };
        }])
        .factory('AuthenticationService', function () {
            var auth = {
                isLogged: false,
                username: ''
            };

            return auth;
        });
})();