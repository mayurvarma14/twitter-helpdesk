import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';

import { ReactComponent as Loader } from '../../assets/loading.svg';
import TweetConversationItem from '../TweetConversationItem/TweetConversationItem';
import {
  sendReply,
  addTweetConversation,
  addReply,
} from '../../redux/tweet/tweetActions';
import './TweetConversation.scss';

const socket = socketIOClient(process.env.REACT_APP_BACKEND_URL);

class TweetConversation extends Component {
  state = { reply: '' };
  componentDidMount() {
    socket.on('tweet', (tweet) => {
      const conversation = this.props.tweet.conversation;
      if (
        conversation.length &&
        conversation[conversation.length - 1].inReplyToStatusId ===
          tweet.tweetId
      ) {
        this.props.addReply(tweet);
      } else if (!tweet.inReplyToStatusId) {
        this.props.addTweetConversation(tweet);
      }
      console.log('tweet', tweet);
    });
  }

  replyConversation(event) {
    if (event.key === 'Enter') {
      console.log(this.state.reply);
      // const tweet=this.props.tweet.conversation[this.props.tweet.conversation.length-1]
      // this.props.sendReply(`@${tweet.from.screenName} ${this.state.reply}`,tweet.tweetId);
    }
  }
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
              <img
                src={this.props.user.data.profileImage}
                alt="profile"
                className="profile"
              />
            </div>
            <input
              type="text"
              placeholder="Reply..."
              value={this.state.reply}
              onChange={(e) => this.setState({ reply: e.target.value })}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  const tweet = this.props.tweet.conversation[
                    this.props.tweet.conversation.length - 1
                  ];
                  this.props.sendReply(
                    `@${tweet.from.screenName} ${this.state.reply}`,
                    tweet.tweetId
                  );
                  this.setState({ reply: '' });
                }
              }}
            />
            <span>
              <i className="fas fa-paperclip"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ tweet, user }) => ({ tweet, user }), {
  sendReply,
  addTweetConversation,
  addReply,
})(TweetConversation);
