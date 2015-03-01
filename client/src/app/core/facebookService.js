'use strict';

function profileImage(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://graph.facebook.com/v2.2/' + options.providerId + '/picture?'+options.params, true);

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
    profileImage: profileImage
};