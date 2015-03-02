'use strict';

var accessToken = location.hash.split('#')[1],
    ProfileCard = require('./components/profileCard.jsx'),
    userService = require('./core/userService'),
    facebookService = require('./core/facebookService'),
    user;
location.hash = '';
if (accessToken) {
    userService.saveToken(accessToken);
    userService.userInfo()
        .then(function (entity) {
            user = entity;
            localStorage.setItem('id', user.id);
            return facebookService.profileImage({
                providerId: user.providerId,
                params: 'redirect=0&width=9999'
            });
        })
        .then(function (image) {
            React.render(React.createElement(ProfileCard, {
                user: {
                    image: image.data.url,
                    name: user.displayName.toUpperCase()
                }
            }), document.getElementById('profile_container'));
        });
}

React.render(React.createElement(ProfileCard, {
    user: {
        image: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/10431713_818528254872766_4787171365214585616_n.jpg?oh=4436af4eed82b3c03d720e5694a8d111&oe=55961814&__gda__=1435282306_5df360e159e2b9a83603b2293d5d881f',
        name: 'EGOR SAPRONOV'
    }
}), document.getElementById('profile_container'));

function initialize() {
    // Create an array of styles.
    var styles = [
        {
            featureType: "all",
            elementType: "all",
            stylers: [
                {
                    invert_lightness: true
                },
                {
                    hue: "#ff1a00"
                },
                {
                    saturation: -100
                },
                {
                    lightness: 33
                },
                {
                    "gamma": 0.5
                }
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {
                    color: "#2D333C"
                }
            ]
        }
    ];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
}
google.maps.event.addDomListener(window, 'load', initialize);