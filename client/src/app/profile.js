'use strict';

var accessToken = location.hash.split('#')[1];

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
    }
    if (this.status === 401) {
        window.location.href = '/auth/facebook';
    }
}