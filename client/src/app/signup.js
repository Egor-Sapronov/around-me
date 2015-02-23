'use strict';

var SignUp = require('./components/signup.jsx');

React.render(React.createElement(SignUp, {onClick: signup}), document.getElementById('signup_container'));

function signup(email, username, password) {
    var xhr = new XMLHttpRequest(),
        data = {
            username: username,
            email: email,
            password: password
        };

    xhr.open('POST', '/api/auth/signup', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = handleLoad;

    xhr.send(JSON.stringify(data));
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