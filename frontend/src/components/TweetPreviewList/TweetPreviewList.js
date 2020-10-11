import React, { Component } from 'react';

class TweetPreviewList extends Component {
  render() {
    return (
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
              <img src="/profile.jpg" alt="profile image1" />
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
    );
  }
}

export default TweetPreviewList;
