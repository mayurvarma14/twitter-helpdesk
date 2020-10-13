import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import history from './history';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ConversationsPage from './pages/ConversationsPage/ConversationsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.scss';

function App({ user }) {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <Router history={history}>
          <Switch>
            <Route
              path="/logout"
              component={() => {
                window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/logout`;
                return null;
              }}
            />
            <Route exact path="/login">
              {user.loggedIn ? <Redirect to="/conversations" /> : <LoginPage />}
            </Route>
            <Route exact path="/">
              {user.loggedIn ? (
                <Redirect to="/conversations" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route exact path="/conversations">
              <ConversationsPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default connect(({ user }) => ({ user }))(App);
