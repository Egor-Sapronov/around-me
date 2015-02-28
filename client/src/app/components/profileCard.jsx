'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return <div className="card">
                <div className="card-image">
                    <img src={this.props.user.image} className="responsive-img" />
                </div>
                <div className="card-content">
                    <h2>{this.props.user.name}</h2>
                </div>
            </div>;
    }
});


module.exports = ProfileCard;