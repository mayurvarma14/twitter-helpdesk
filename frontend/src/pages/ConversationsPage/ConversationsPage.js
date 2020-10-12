import React, { Component } from 'react';

import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import TweetPreviewList from '../../components/TweetPreviewList/TweetPreviewList';
import ConversationProfileBar from '../../components/ConversationProfileBar/ConversationProfileBar';
import './ConversationsPage.scss';

class ConversationsPage extends Component {
  render() {
    return (
      <>
        <ConversationHeader />
        <div className="main-container">
          <TweetPreviewList />
          <div className="conversation-section">
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
            <ConversationProfileBar />
          </div>
        </div>
      </>
    );
  }
}

export default ConversationsPage;
