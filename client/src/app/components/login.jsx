'use strict';

var Login = React.createClass({
    handleCLick: function (e) {
        e.preventDefault();
        this.props.onClick(this.refs.email.getDOMNode().value, this.refs.password.getDOMNode().value);
    },
    render: function () {
        return <div className="card">
            <div className="card-content">
                <header>
                    <h2 className="header">Sign in</h2>
                </header>
                <form>
                    <div className="input-field">
                        <i className="mdi-communication-email prefix"></i>
                        <input ref='email' id="email" type="email" className="validate" />
                        <label htmlFor="email">email</label>
                    </div>
                    <div className="input-field">
                        <i className="mdi-communication-vpn-key prefix"></i>
                        <input ref='password' id="password" type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field">
                        <button type='submit' className="btn waves-effect default-primary-color" onSubmit={this.handleCLick}>Sign in
                            <i className="mdi-content-send right"></i>
                        </button>
                        <a href="/account/signup" className="btn-flat">Sign up</a>
                    </div>
                </form>
            </div>
        </div>;
    }
});


module.exports = Login;