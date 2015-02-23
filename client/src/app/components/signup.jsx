'use strict';

var SignUp = React.createClass({
    handleCLick: function () {
        this.props.onClick(this.refs.email.getDOMNode().value, this.refs.username.getDOMNode().value, this.refs.password.getDOMNode().value);
    },
    render: function () {
        return <div className="card">
            <div className="card-content">
                <header>
                    <h2 className="header">Sign up</h2>
                </header>
                <form>
                    <div className="input-field">
                        <i className="mdi-action-account-circle prefix"></i>
                        <input ref='username' id="username" type="text" className="validate" />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="input-field">
                        <i className="mdi-communication-email prefix"></i>
                        <input ref='email' id="email" type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <i className="mdi-communication-vpn-key prefix"></i>
                        <input ref='password' id="password" type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <button type='submit' onSubmit={this.handleCLick} className="btn waves-effect default-primary-color">Sign up
                            <i className="mdi-content-send right"></i>
                        </button>
                        <a href="/account/signin" className="btn-flat">Sign in</a>
                    </div>
                </form>
            </div>
        </div>;
    }
});

module.exports = SignUp;