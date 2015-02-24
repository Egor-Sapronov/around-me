'use strict';

var Upload = React.createClass({
    handleCLick: function () {
        this.props.onClick(this.refs.file.getDOMNode().files);
    },
    render: function () {
        return <div>
            <input ref='file' type='file'/>
            <div className="input-field">
                <button onClick={this.handleCLick} className="btn waves-effect default-primary-color">Upload
                    <i className="mdi-content-send right"></i>
                </button>
            </div>
        </div>;
    }
});

module.exports = Upload;