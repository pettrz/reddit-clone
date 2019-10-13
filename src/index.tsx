import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faArrowDown,
  faBookOpen,
  faComment,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './index.scss';
import App from './modules';

library.add(fab, faArrowDown, faAngleDown, faBookOpen, faComment, faComments);

ReactDOM.render(
  <Router>
    <Route path="/r/:subreddit" component={App} />
    <Route path="/r/:subreddit/comments/:id/:title" component={App} />
    <Redirect exact={true} from="/" to="/r/reactjs" />
  </Router>,
  document.getElementById('root'),
);
