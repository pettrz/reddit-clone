import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faBookOpen,
  faComment,
  faComments,
  faLink,
  faMinusSquare,
  faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './modules';
import { NoMatch } from './modules/views/404/404';
import Comments from './modules/views/Comments';

library.add(
  fab,
  faArrowDown,
  faAngleUp,
  faAngleDown,
  faArrowUp,
  faBookOpen,
  faComment,
  faComments,
  faMinusSquare,
  faPlusSquare,
  faLink
);

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact={true} from="/" to="/r/reactjs" />
      <Route exact={true} path="/r/:subreddit" component={App} />
      <Route
        exact={true}
        path="/r/:subreddit/comments/:id/:title"
        component={Comments}
      />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
);
