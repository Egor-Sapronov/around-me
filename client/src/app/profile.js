'use strict';

var accessToken = location.hash.split('#')[1],
    ProfileCard = require('./components/profileCard.jsx');

if (accessToken) {
    saveToken(accessToken);
    loadProfile();
}

function saveToken(token) {
    localStorage.setItem('token', token);
}

function loadProfile() {
    var token = localStorage.getItem('token'),
        xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/profiles', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    xhr.onload = handleLoad;

    xhr.send();

}

function handleLoad() {
    /*jshint validthis:true */
    if (this.status === 200) {
        toast('Login successful', 4000);

        var responseObj = JSON.parse(this.responseText),
            xhr = new XMLHttpRequest(),
            username = responseObj.displayName;

        xhr.open('GET', 'https://graph.facebook.com/v2.2/' + responseObj.providerId + '/picture?redirect=0&type=large', true);

        xhr.onload = function () {
            if (this.status === 200) {
                responseObj = JSON.parse(this.responseText);

                React.render(React.createElement(ProfileCard, {
                    user: {
                        image: responseObj.data.url,
                        name: username
                    }
                }), document.getElementById('profile_container'));
            }
        };

        xhr.send();
    }
    if (this.status === 401) {
        window.location.href = '/auth/facebook';
    }
}