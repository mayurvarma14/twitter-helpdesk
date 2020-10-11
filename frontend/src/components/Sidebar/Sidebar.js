import React from 'react';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <img src="/favicon.png" alt="" />
      </div>
      <div className="sidebar-center">
        <i class="far fa-clock"></i>
        <i class="fas fa-home"></i>
        <i class="fas fa-user-friends"></i>
        <i class="far fa-comments active"></i>
        <i class="far fa-credit-card"></i>
        <i class="fas fa-store"></i>
      </div>
      <div className="sidebar-bottom">
        <i class="far fa-life-ring"></i>
        <img src="/profile.jpg" alt="profile image2" className="profile" />
      </div>
    </aside>
  );
}

export default Sidebar;
