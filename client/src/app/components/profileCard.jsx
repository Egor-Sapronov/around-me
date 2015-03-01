'use strict';

var ProfileCard = React.createClass({
    render: function () {
        return < div >
            <main className="container">
                <div className="row">
                    <div className="col l3 offset-l4 s12">
                        <img src={this.props.user.image} className="circle responsive-img center-align" />
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
        </div>;
    }
});

module.exports = ProfileCard;