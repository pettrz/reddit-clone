import React from 'react';
import './App.scss';
import Post from './components/Post';

export default class App extends React.Component<any, any> {

  render() {
    return (
      <div className="wrapper">
        <header><h1>Reddit clone</h1></header>
        <main><Post/></main>
      </div>
    );
  }
}
