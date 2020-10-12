import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/twitter`}>
          Login with twitter
        </a>
      </div>
    );
  }
}
export default LoginPage;
