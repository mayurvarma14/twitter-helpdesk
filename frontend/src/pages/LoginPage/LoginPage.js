import React, { Component } from 'react';
import './LoginPage.scss';
class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-title">Welcome to Twitter Helpdesk</div>
        <div
          className="login-button"
          onClick={() =>
            (window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/twitter`)
          }
        >
          Sign in with Twitter
        </div>
      </div>
    );
  }
}
export default LoginPage;
