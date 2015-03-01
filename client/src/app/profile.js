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
                    image: image.data.url.profileImage,
                    name: user.displayName
                }
            }), document.getElementById('profile_container'));
        });
}