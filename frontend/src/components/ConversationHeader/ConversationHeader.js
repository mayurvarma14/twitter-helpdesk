import React from 'react';
import './ConversationHeader.scss';

function ConversationHeader() {
  return (
    <div className="top">
      <div className="conversation-header-left">
        <span className="page-title">Conversations</span>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Quick search" />
        </div>
        <button>
          <i className="fas fa-sliders-h"></i>Filter
        </button>
      </div>
      <div className="dropdown">
        <select name="status" id="status">
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Busy">Busy</option>
        </select>
        <span className="status-icon"></span>
      </div>
    </div>
  );
}

export default ConversationHeader;
