'use strict';

var Upload = require('./components/upload.jsx');

React.render(React.createElement(Upload, {onClick: upload}), document.getElementById('upload_container'));

function upload(files) {
    var xhr = new XMLHttpRequest(),
        formData = new FormData();

    console.log(files);
    formData.append('thefile', files[0]);
    xhr.open('POST', '/api/images', true);
    xhr.onload = handleLoad;

    xhr.send(formData);
}

function handleLoad() {
    /*jshint validthis:true */
}