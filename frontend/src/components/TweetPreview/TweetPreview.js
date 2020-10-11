import React from 'react';
import './TweetPreview.scss';

function TweetPreview({ image, name, notification, text, status }) {
  return (
    <div className="item">
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
        <span className="text">{text}</span>
      </div>
    </div>
  );
}

export default TweetPreview;
