'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return < div >
            <main className="container section">
                <div className="row">
                    <div className="col l3 offset-l4 s12">
                        <img src={this.props.user.image} className="circle z-depth-2 responsive-img center-align" />
                        <p className="center-align flow-text">{this.props.user.name}</p>
                    </div>
                </div>
            </main>
            <div className="divider"></div>
            <aside className="container">
                <div className="row">
                    <div className="col l3 offset-l1 s12">
                        <p className="center-align flow-text">Followers</p>
                    </div>
                    <div className="col l3 s12">
                        <p className="center-align flow-text">Photos</p>
                    </div>
                    <div className="col l3 s12">
                        <p className="center-align flow-text">Likes</p>
                    </div>
                </div>
            </aside>
            <div className="divider"></div>
        </div>;
    }
});

module.exports = ProfileCard;