'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return <div>
            <div className="row">
                <div className="col l12 valign-wrapper">
                    <img src={this.props.user.image} className="valign center-align circle responsive-img" />
                    <p className="flow-text valign center-align">{this.props.user.name}</p>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col l4 s12 valign-wrapper">
                        <p className="flow-text valign">followers</p>
                    </div>
                    <div className="col l4 s12 valign-wrapper">
                        <p className="flow-text valign">photos</p>
                    </div>
                    <div className="col l4 s12 valign-wrapper">
                        <p className="flow-text valign">likes</p>
                    </div>
                </div>
            </div>
        </div>
    }
});

module.exports = ProfileCard;