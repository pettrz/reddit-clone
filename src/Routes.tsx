import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faArrowDown,
  faBookOpen,
  faComment,
  faComments,
  faMinusSquare,
  faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import App from './modules';
import Comments from './modules/views/Comments';

library.add(fab, faArrowDown, faAngleDown, faBookOpen, faComment, faComments, faMinusSquare, faPlusSquare);

export const Routes = () => (
  <BrowserRouter>
    <Route exact={true} path="/r/:subreddit" component={App} />
    <Route exact={true} path="/r/:subreddit/comments/:id/:title" component={Comments} />
  </BrowserRouter>
);
