import React from 'react';
import { useLocation } from 'react-router-dom';

import './Header.scss';

function Header() {
  const { pathname } = useLocation();
  if (pathname === '/login') return null;
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
