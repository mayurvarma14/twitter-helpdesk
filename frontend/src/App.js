import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="container">
      <aside className="sidebar"></aside>
      <div className="main">
        <header className="main-header">
          <span>Updates</span>
          <span>Session: 34 minutes</span>
          <span>User: Ann Tsibulski</span>
        </header>
        <div className="top">
          <span>Conversations</span>
          <input type="text" />
          <button>
            <i class="fas fa-sliders-h"></i>Filter
          </button>
          <select name="status" id="status">
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Busy">Busy</option>
          </select>
        </div>
        <div className="main-container">
          <div className="conversation-left">
            <div className="conversation-list">
              <div className="item">
                <div className="profile-image"></div>
                <div className="content">
                  <div className="header">
                    <span className="name"> Mbah Enow</span>
                    <span className="status-icon"></span>
                    <span className="notification">2</span>
                  </div>
                  <span className="text">Hello there! May I ask a favor?</span>
                </div>
              </div>
            </div>
            <div className="divider"></div>

            <div className="conversation-list">
              <div className="item">
                <div className="profile-image">
                  <img src="/profile.jpg" alt="profile image" />
                </div>
                <div className="content">
                  <div className="header">
                    <span className="name"> Mbah Enow</span>
                    <span className="status-icon"></span>
                    <span className="notification">2</span>
                  </div>
                  <span className="text">Hello there! May I ask a favor?</span>
                </div>
              </div>
            </div>
          </div>
          <div className="conversation-section">
            <div className="conversation-section-main">
              <div className="header">
                <div className="profile-image"></div>
                <span className="room"></span>
                <span className="date"></span>
                <button>Create a task</button>
              </div>
              <div className="content">
                <span className="date">Today</span>
                <div className="conversations">
                  <div className="item">
                    <div className="profile-image"></div>
                    <div className="content">
                      <div className="text"></div>
                    </div>
                    <div className="time"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="conversation-section-right">
              <span className="cross-button">
                <i class="fas fa-times"></i>
              </span>
              <img src="/profile.jpg" alt="profile image" />
              <span className="name">Ea Tipene</span>
              <span className="status">Online</span>
              <div className="buttons">
                <button>
                  <i class="fas fa-phone-alt"></i>Call
                </button>
                <button>
                  <i class="fas fa-envelope"></i>Email
                </button>
              </div>
              <div className="info">
                <div className="title"></div>
                <div className="value"></div>
              </div>
              <div className="tasks">
                <div className="header">
                  <span>Tasks</span>
                  <i class="fas fa-angle-down"></i>
                </div>
                <div className="item">
                  <input type="checkbox" name="item" id="item" />
                  <span>Clean up room</span>
                </div>
                <div className="item">
                  <input type="checkbox" name="item" id="item" />
                  <span>Change linen and towels when guests are out</span>
                </div>
                <div className="item">
                  <input type="checkbox" name="item" id="item" />
                  <span>Bring complimentary bottle of red wine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
