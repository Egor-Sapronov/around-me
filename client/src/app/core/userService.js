'use strict';

function saveToken(token) {
    localStorage.setItem('token', token);
}

function userInfo() {
    return new Promise(function (resolve, reject) {
        if (!localStorage.getItem('token')) {
            reject({error: 'Error', code: 401});
        }

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/profiles', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        xhr.onload = handleLoad;
        xhr.send();

        function handleLoad() {
            /*jshint validthis:true */
            if (this.status === 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject({error: 'Error', code: this.status});
            }
        }
    });
}

module.exports = {
    saveToken: saveToken,
    userInfo: userInfo
};

