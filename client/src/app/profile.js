'use strict';

var token = location.hash.split('#')[1];

if (token) {
    saveToken(token);
}

function saveToken(token) {
    localStorage.setItem('token', token);
    toast('Login successful', 4000);
}