'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return <div class="row valign-wrapper">
            <div class="col l2 s12 center-align">
                <img src="{this.props.user.image}" class="circle responsive-img" />
                <p class="flow-text">{this.props.user.name}</p>
            </div>
        </div>;
    }
});

module.exports = ProfileCard;