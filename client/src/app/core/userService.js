'use strict';

function saveToken(token) {
    localStorage.setItem('token', token);
}

function userInfo(callback) {
    if (!localStorage.getItem('token')) {
        callback(401, null);
    }

    loadUser(function (err, user) {
        loadProfileImage(user, function (err, user) {
            if (!err) {
                callback(false, user);
            }
        });
    });
}

function loadProfileImage(user, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://graph.facebook.com/v2.2/' + user.providerId + '/picture?redirect=0&width=9999', true);

    xhr.onload = handleProfileImageLoad;

    xhr.send();

    function handleProfileImageLoad() {
        /*jshint validthis:true */
        if (this.status === 200) {
            var responseObj = JSON.parse(this.responseText);

            user.profileImage = responseObj.data.url;
            callback(false, user);
        }
    }
}

function loadUser(callback) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/profiles', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));

    xhr.onload = handleUserLoad;

    xhr.send();

    function handleUserLoad() {
        /*jshint validthis:true */
        if (this.status === 200) {
            callback(false, JSON.parse(this.responseText));
        } else {
            callback(401, null);
        }
    }
}

module.exports = {
    saveToken: saveToken,
    userInfo: userInfo
};

