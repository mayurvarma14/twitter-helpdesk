import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ConversationsPage from './pages/ConversationsPage/ConversationsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.scss';

function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/conversations" component={ConversationsPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
