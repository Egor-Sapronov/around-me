module.exports = function (paths) {
    return {
        angular: {
            path: paths.vendor + 'angular/angular.js',
            exports: 'angular'
        },
        angularRoute: {
            path: paths.vendor + 'angular-route/angular-route.js',
            exports: 'ngRouteModule',
            depends: {
                angular: 'angular'
            }
        },
        angularMocks: {
            path: paths.vendor + 'angular-mocks/angular-mocks.js',
            exports: 'ngMocks',
            depends: {
                angular: 'angular'
            }
        },
        lodash: {
            path: paths.vendor + 'lodash/dist/lodash.min.js',
            exports: 'lodash'
        },
        angularGoogleMap: {
            path: paths.vendor + 'angular-google-maps/dist/angular-google-maps.min.js',
            exports: 'angularGoogleMap',
            depends: {
                lodash: 'lodash'
            }
        }
    };
};