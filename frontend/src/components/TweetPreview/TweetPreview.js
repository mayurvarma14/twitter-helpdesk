import React from 'react';

import { removeMention } from '../../utils/textProcessing';
import './TweetPreview.scss';
function TweetPreview({
  image,
  name,
  notification,
  text,
  status,
  selectConversation,
  isActive,
}) {
  return (
    <div
      className={`preview-item ${isActive ? 'active' : ''}`}
      onClick={selectConversation}
    >
      <div className="profile-image">
        <img src={image} alt="profile pic" className="profile" />
      </div>
      <div className="content">
        <div className="header">
          <span className="name">{name}</span>
          {status ? <span className="status-icon"></span> : null}
          {notification ? (
            <span className="notification">{notification}</span>
          ) : null}
        </div>
        <span className="text">{removeMention(text)}</span>
      </div>
    </div>
  );
}

export default TweetPreview;
