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