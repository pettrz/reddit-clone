import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.scss';
import App from './modules/App';

ReactDOM.render(
  <Router>
    <Route path='/' component={App}/>
  </Router>
, document.getElementById('root'));
