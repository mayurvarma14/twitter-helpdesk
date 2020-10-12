import React from 'react';
import { connect } from 'react-redux';

import './Sidebar.scss';

function Sidebar({ user }) {
  if (!user.loggedIn) return null;
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
        <img
          src={user.data.profileImage}
          alt="profile image2"
          className="profile"
        />
      </div>
    </aside>
  );
}

export default connect(({ user }) => ({ user }))(Sidebar);
