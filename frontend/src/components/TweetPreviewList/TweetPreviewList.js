import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getConversation } from '../../redux/tweet/tweetActions';
import TweetPreview from '../TweetPreview/TweetPreview';
import { ReactComponent as Loader } from '../../assets/loading.svg';
import './TweetPreviewList.scss';

class TweetPreviewList extends Component {
  renderList() {
    return this.props.tweet.data.map(
      ({ tweetId, from, text, status, notification }) => {
        return (
          <TweetPreview
            isActive={
              this.props.tweet.conversation.length &&
              tweetId === this.props.tweet.conversation[0].tweetId
            }
            key={tweetId}
            image={from.profileImage}
            name={from.name}
            text={text}
            status={status}
            notification={notification}
            selectConversation={() => this.props.getConversation(tweetId)}
          />
        );
      }
    );
  }
  render() {
    if (this.props.tweet.isLoading)
      return (
        <div className="conversation-loader">
          <Loader />
        </div>
      );
    return (
      <div className="conversation-left">
        <div className="conversation-list">{this.renderList()}</div>
      </div>
    );
  }
}

export default connect(({ tweet }) => ({ tweet }), { getConversation })(
  TweetPreviewList
);
