import React from 'react';
import { connect } from 'react-redux';

import './Header.scss';

function Header({ user }) {
  if (!user.loggedIn) return null;
  return (
    <header className="main-header">
      <span>Updates</span>
      <div className="right-section">
        <span>Session: 34 minutes</span>
        <span>User: {user.data.name}</span>
      </div>
    </header>
  );
}

export default connect(({ user }) => ({ user }))(Header);
