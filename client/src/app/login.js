'use strict';

var Login = require('./components/login.jsx');

React.render(React.createElement(Login, {onClick: login}), document.getElementById('login_container'));

function login(email, password) {
    var xhr = new XMLHttpRequest(),
        auth = window.btoa(email + ':' + password);

    xhr.open('GET', '/api/auth/login', true);
    xhr.setRequestHeader('Authorization', 'Basic ' + auth);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = handleLoad;

    xhr.send();
}

function handleLoad() {
    /*jshint validthis:true */
    if (this.status === 401) {
        toast('email or password is incorrect', 4000);
    } else {
        var responseObj = JSON.parse(this.responseText);
        localStorage.setItem('token', responseObj.token);
        localStorage.setItem('username', responseObj.username);
        window.location.href = '/';
    }
}
