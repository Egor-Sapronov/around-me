'use strict';

var SignUp = React.createClass({
    handleCLick: function () {

    },
    render: function () {
        return <div className="card">
            <div className="card-content">
                <header>
                    <h2 className="header">Sign up</h2>
                </header>
                <div className="input-field">
                    <i className="mdi-action-account-circle prefix"></i>
                    <input id="username" type="text" className="validate" />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="input-field">
                    <i className="mdi-communication-email prefix"></i>
                    <input id="email" type="email" className="validate" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                    <i className="mdi-communication-vpn-key prefix"></i>
                    <input id="password" type="password" className="validate" />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field">
                    <i className="mdi-communication-vpn-key prefix"></i>
                    <input id="confirm-password" type="password" className="validate" />
                    <label htmlFor="confirm-password">Confirm password</label>
                </div>
                <div className="input-field">
                    <button className="btn waves-effect default-primary-color">Sign up
                        <i className="mdi-content-send right"></i>
                    </button>
                    <a href="/account/signin" className="btn-flat">Sign in</a>
                </div>
            </div>
        </div>
            ;
    }
});


module.exports = SignUp;