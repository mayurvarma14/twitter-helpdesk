import React from 'react';
import './Header.scss';

function Header() {
  return (
    <header className="main-header">
      <span>Updates</span>
      <div className="right-section">
        <span>Session: 34 minutes</span>
        <span>User: Ann Tsibulski</span>
      </div>
    </header>
  );
}

export default Header;
