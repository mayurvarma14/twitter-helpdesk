import React, { Component } from 'react';
import './TweetConversation.scss';

class TweetConversation extends Component {
  render() {
    return (
      <div className="conversation-section-main">
        <div className="header">
          <div className="profile-info">
            <img src="/profile.jpg" alt="profile" className="profile" />
            <span className="name">
              Ea Tipene <span className="status-icon"></span>
            </span>
          </div>
          <span className="room">Room: 102</span>
          <span className="date">Oct 1 - Oct 12</span>
          <button>Create a task</button>
        </div>
        <div className="conversation-content">
          <span className="date">Today</span>
          <div className="conversations">
            <div className="item">
              <div className="profile-pic">
                <img src="/profile.jpg" alt="profile" className="profile" />
              </div>
              <div className="content">
                <div className="text">
                  Sorry for inconvenience. I am sending out manager Maria
                  Peterson to your room 102
                </div>
              </div>
              <div className="time">10:35</div>
            </div>
            <div className="item">
              <div className="profile-pic">
                <img src="/profile.jpg" alt="profile" className="profile" />
              </div>
              <div className="content">
                <div className="text">
                  Sorry for inconvenience. I am sending out manager Maria
                  Peterson to your room 102
                </div>
              </div>
              <div className="time">10:35</div>
            </div>
            <div className="item">
              <div className="profile-pic">
                <img src="/profile.jpg" alt="profile" className="profile" />
              </div>
              <div className="content">
                <div className="text">
                  Sorry for inconvenience. I am sending out manager Maria
                  Peterson to your room 102
                </div>
              </div>
              <div className="time">10:35</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TweetConversation;
