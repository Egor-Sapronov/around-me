'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return <div className="card">
            <div className="card-image">
                <img src={this.props.user.image} className="responsive-img" />
            </div>
            <div className="card-content">
                <a className="collection-item waves-effect waves-light-green-lighten-1">{this.props.user.name}
                    <span className="badge">share
                        <i className="mdi-social-share right"></i>
                    </span>
                </a>
            </div>
        </div>;
    }
});


module.exports = ProfileCard;