'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return <div className="row valign-wrapper">
            <div className="col l2 s12 center-align">
                <img src="{this.props.user.image}" className="circle responsive-img" />
                <p className="flow-text">{this.props.user.name}</p>
            </div>
        </div>;
    }
});

module.exports = ProfileCard;