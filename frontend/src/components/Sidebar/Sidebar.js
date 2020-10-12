import React from 'react';
import { useLocation } from 'react-router-dom';

import './Sidebar.scss';

function Sidebar() {
  const { pathname } = useLocation();
  if (pathname === '/login') return null;
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <img src="/favicon.png" alt="" />
      </div>
      <div className="sidebar-center">
        <i className="far fa-clock"></i>
        <i className="fas fa-home"></i>
        <i className="fas fa-user-friends"></i>
        <i className="far fa-comments active"></i>
        <i className="far fa-credit-card"></i>
        <i className="fas fa-store"></i>
      </div>
      <div className="sidebar-bottom">
        <i className="far fa-life-ring"></i>
        <img src="/profile.jpg" alt="profile image2" className="profile" />
      </div>
    </aside>
  );
}

export default Sidebar;
