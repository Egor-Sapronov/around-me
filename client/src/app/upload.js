'use strict';

var Upload = require('./components/upload.jsx');

React.render(React.createElement(Upload, {onClick: upload}), document.getElementById('upload_container'));

function upload(files) {
    var xhr = new XMLHttpRequest(),
        formData = new FormData(),
        token = localStorage.getItem('token');

    formData.append('file', files[0]);
    xhr.open('POST', '/api/images', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = handleLoad;

    xhr.send(formData);
}

function handleLoad() {
    /*jshint validthis:true */
    if (this.status === 401) {
        window.location.href = '/account/signin';
    }
    if (this.status === 201) {
        toast('Image uploaded', 4000);
    }
}