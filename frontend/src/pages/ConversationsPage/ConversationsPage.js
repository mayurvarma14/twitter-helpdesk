import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLoggedInUser } from '../../redux/user/userActions';
import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import TweetPreviewList from '../../components/TweetPreviewList/TweetPreviewList';
import ConversationProfileBar from '../../components/ConversationProfileBar/ConversationProfileBar';
import TweetConversation from '../../components/TweetConversation/TweetConversation';
import { ReactComponent as Loader } from '../../assets/loading.svg';
import './ConversationsPage.scss';

class ConversationsPage extends Component {
  async componentDidMount() {
    const { getLoggedInUser, user } = this.props;
    if (!user.loggedIn) {
      getLoggedInUser();
    }
  }

  render() {
    const { user } = this.props;
    if (user.isLoading) return <Loader className="loader" />;
    return (
      <>
        <ConversationHeader />
        <div className="main-container">
          <TweetPreviewList />
          <div className="conversation-section">
            <TweetConversation />
            <ConversationProfileBar />
          </div>
        </div>
      </>
    );
  }
}

export default connect(({ user }) => ({ user }), { getLoggedInUser })(
  ConversationsPage
);
