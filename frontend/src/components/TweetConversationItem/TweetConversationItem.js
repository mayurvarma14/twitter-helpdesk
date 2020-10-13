import React from 'react';

import { removeMention } from '../../utils/textProcessing';
import './TweetConversationItem.scss';

function TweetConversationItem({ image, text, time }) {
  return (
    <div className="item">
      <div className="profile-pic">
        <img src={image} alt="profile" className="profile" />
      </div>
      <div className="content">
        <div className="text">{removeMention(text)}</div>
      </div>
      <div className="time">{time}</div>
    </div>
  );
}

export default TweetConversationItem;
