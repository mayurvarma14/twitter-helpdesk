import React, { Component } from 'react';
import TweetPreview from '../TweetPreview/TweetPreview';
import './TweetPreviewList.scss';

class TweetPreviewList extends Component {
  render() {
    return (
      <div className="conversation-left">
        <div className="conversation-list">
          <TweetPreview
            image="/profile.jpg"
            name="Mbah Enow"
            text="Hello there! May I ask a favor?"
            status
            notification="3"
          />
          <TweetPreview
            image="/profile.jpg"
            name="Mbah Enowe"
            text="Hello dear! Sorry for inconvenience, I am Hello dear! Sorry for
            inconvenience, I am.."
            status
            notification="3"
          />
          <div className="divider"></div>
          <TweetPreview
            image="/profile.jpg"
            name="Mbah Eno"
            text="Hello dear! Sorry for inconvenience, I am Hello dear! Sorry for
          inconvenience, I am.."
            notification="1"
          />
        </div>
      </div>
    );
  }
}

export default TweetPreviewList;
