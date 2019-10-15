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
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import App from './modules';
import Comments from './modules/views/Comments';
import { store } from './redux/store';

library.add(fab, faArrowDown, faAngleDown, faBookOpen, faComment, faComments);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/r/:subreddit" component={App} />
      <Route path="/r/:subreddit/comments/:id/:title" component={Comments} />
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
