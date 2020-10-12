import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLoggedInUser } from '../../redux/user/userActions';
import ConversationHeader from '../../components/ConversationHeader/ConversationHeader';
import TweetPreviewList from '../../components/TweetPreviewList/TweetPreviewList';
import ConversationProfileBar from '../../components/ConversationProfileBar/ConversationProfileBar';
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
            <div className="conversation-section-main">
              <div className="header">
                <div className="profile-info">
                  <img src="/profile.jpg" alt="profile" className="profile" />
                  <span className="name">
                    Ea Tipene <span className="status-icon"></span>
                  </span>
                </div>
                <span className="room">Room: 102</span>
                <span className="date">Oct 1 - Oct 12</span>
                <button>Create a task</button>
              </div>
              <div className="conversation-content">
                <span className="date">Today</span>
                <div className="conversations">
                  <div className="item">
                    <div className="profile-pic">
                      <img
                        src="/profile.jpg"
                        alt="profile"
                        className="profile"
                      />
                    </div>
                    <div className="content">
                      <div className="text">
                        Sorry for inconvenience. I am sending out manager Maria
                        Peterson to your room 102
                      </div>
                    </div>
                    <div className="time">10:35</div>
                  </div>
                  <div className="item">
                    <div className="profile-pic">
                      <img
                        src="/profile.jpg"
                        alt="profile"
                        className="profile"
                      />
                    </div>
                    <div className="content">
                      <div className="text">
                        Sorry for inconvenience. I am sending out manager Maria
                        Peterson to your room 102
                      </div>
                    </div>
                    <div className="time">10:35</div>
                  </div>
                  <div className="item">
                    <div className="profile-pic">
                      <img
                        src="/profile.jpg"
                        alt="profile"
                        className="profile"
                      />
                    </div>
                    <div className="content">
                      <div className="text">
                        Sorry for inconvenience. I am sending out manager Maria
                        Peterson to your room 102
                      </div>
                    </div>
                    <div className="time">10:35</div>
                  </div>
                </div>
              </div>
            </div>
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
