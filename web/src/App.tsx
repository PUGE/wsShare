import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import './App.scss';

import Header from './components/Header';
import Home from './screens/Home';
import Transfers from './screens/Transfers';
import Abuse from './screens/Abuse';
import Status from './components/Status';
import { Router, abuseEmail } from './config';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <div className="line"></div>
        <Header />
        <Status />
        <Switch>
          {abuseEmail ? (
            <Route path="/abuse">
              <Abuse />
            </Route>
          ) : null}
          <Route path="/:networkName">
            <Transfers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
