import React, { Component } from 'react';

class ConversationProfileBar extends Component {
  render() {
    return (
      <div className="conversation-section-right">
        <span className="cross-button">
          <i class="fas fa-times"></i>
        </span>
        <img src="/profile.jpg" alt="profile image2" />
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
    );
  }
}

export default ConversationProfileBar;
