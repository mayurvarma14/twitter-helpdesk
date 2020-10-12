import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ConversationProfile.scss';

class ConversationProfileBar extends Component {
  render() {
    if (this.props.tweet.isLoading) return null;
    const [
      { from: { name, location, profileImage } = {} } = {},
    ] = this.props.tweet.conversation;
    if (!this.props.tweet.conversation.length) {
      return <div className="conversation-section-right"></div>;
    }
    return (
      <div className="conversation-section-right">
        <span className="cross-button">
          <i className="fas fa-times"></i>
        </span>
        <img src={profileImage} alt="profile" className="profile" />
        <span className="name">{name}</span>
        <span className="status">Online</span>
        <div className="buttons">
          <button>
            <i className="fas fa-phone-alt"></i>Call
          </button>
          <button>
            <i className="fas fa-envelope"></i>Email
          </button>
        </div>
        <div className="info-container">
          <div className="info">
            <div className="title">Room</div>
            <div className="value">102</div>
          </div>
          <div className="info">
            <div className="title">Category</div>
            <div className="value">Standard</div>
          </div>
          <div className="info">
            <div className="title">Company</div>
            <div className="value">{location}</div>
          </div>
        </div>

        <div className="tasks">
          <div className="header">
            <span>Tasks</span>
            <i className="fas fa-angle-down"></i>
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
    );
  }
}

export default connect(({ tweet }) => ({ tweet }))(ConversationProfileBar);
