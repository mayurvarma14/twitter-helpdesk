import React from 'react';

function ConversationHeader() {
  return (
    <div className="top">
      <div className="conversation-header-left">
        <span className="page-title">Conversations</span>
        <div className="search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Quick search" />
        </div>
        <button>
          <i class="fas fa-sliders-h"></i>Filter
        </button>
      </div>
      <select name="status" id="status">
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        <option value="Busy">Busy</option>
      </select>
    </div>
  );
}

export default ConversationHeader;
