import React, { Component } from 'react';
import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import TweetPreviewList from '../../components/TweetPreviewList/TweetPreviewList';
import ConversationProfileBar from '../../components/ConversationProfileBar/ConversationProfileBar';

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
            <ConversationProfileBar />
          </div>
        </div>
      </>
    );
  }
}

export default ConversationsPage;
