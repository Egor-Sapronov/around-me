'use strict';

var Upload = React.createClass({
    handleCLick: function (e) {
        this.props.onClick(this.refs.file.getDOMNode().files);
        e.preventDefault();
        e.stopPropagation();
    },
    render: function () {
        return <form ref='upload_form'>
            <input ref='file' type='file'/>
            <div className="input-field">
                <button onClick={this.handleCLick} className="btn waves-effect default-primary-color">Upload
                    <i className="mdi-content-send right"></i>
                </button>
            </div>
        </form>;
    }
});

module.exports = Upload;