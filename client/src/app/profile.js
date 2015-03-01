'use strict';

var accessToken = location.hash.split('#')[1],
    ProfileCard = require('./components/profileCard.jsx'),
    userService = require('./core/userService'),
    facebookService = require('./core/facebookService'),
    user;

if (accessToken) {
    userService.saveToken(accessToken);
    userService.userInfo()
        .then(function (entity) {
            user = entity;
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