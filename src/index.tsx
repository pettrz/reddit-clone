import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import './index.scss';
import App from './modules/App';

ReactDOM.render(
  <Router>
    <Route path='/r/reactjs' component={App}/>
    <Redirect exact={true} from="/" to="/r/reactjs" />
  </Router>
, document.getElementById('root'));
