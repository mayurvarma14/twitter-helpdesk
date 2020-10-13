import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Loader } from '../../assets/loading.svg';
import TweetConversationItem from '../TweetConversationItem/TweetConversationItem';

import './TweetConversation.scss';

class TweetConversation extends Component {
  renderList() {
    return this.props.tweet.conversation.map(
      ({ tweetId, from: { profileImage }, text, timestamp }) => {
        const time = new Date(timestamp);
        return (
          <TweetConversationItem
            key={tweetId}
            image={profileImage}
            text={text}
            time={`${time.getHours()}:${time.getMinutes()}`}
          />
        );
      }
    );
  }
  render() {
    if (this.props.tweet.isConversationLoading)
      return (
        <div className="conversation-main-loader">
          <Loader />
        </div>
      );

    const [
      { from: { name, profileImage } = {} } = {},
    ] = this.props.tweet.conversation;
    if (!this.props.tweet.conversation.length) {
      return (
        <div className="conversation-section-main">
          <span className="no-data">Select Conversation from left</span>
        </div>
      );
    }
    return (
      <div className="conversation-section-main">
        <div className="header">
          <div className="profile-info">
            <img src={profileImage} alt="profile" className="profile" />
            <span className="name">
              {name}
              <span className="status-icon"></span>
            </span>
          </div>
          <span className="room">Room: 102</span>
          <span className="date">Oct 1 - Oct 12</span>
          <button>Create a task</button>
        </div>
        <div className="conversation-content">
          <span className="date">Today</span>
          <div className="conversations">{this.renderList()}</div>
          <div className="reply-box">
            <div className="profile-pic">
              <img src="/profile.jpg" alt="profile" className="profile" />
            </div>
            <input type="text" placeholder="Reply..." />
            <span>
              <i className="fas fa-paperclip"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ tweet, user }) => ({ tweet, user }))(
  TweetConversation
);
