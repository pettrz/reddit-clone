import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './index.scss';
import App from './modules/App';

library.add(fab, faArrowDown);

ReactDOM.render(
  <Router>
    <Route path="/r/:subreddit" component={App} />
    <Redirect exact={true} from="/" to="/r/reactjs" />
  </Router>,
  document.getElementById('root'),
);
