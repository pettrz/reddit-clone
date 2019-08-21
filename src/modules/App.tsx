import axios from 'axios';
import React from 'react';
import './App.scss';
import Post from './components/Post';

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      kind: '',
      data: []
    };
  }
  componentDidMount() {
    axios
      .get('https://www.reddit.com/r/reactjs.json')
      .then(({ data }) => {
        console.log(data);
        this.setState({
          kind: data.kind, 
          data: data.data.children
        });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="wrapper">
        <header><h1>Reddit clone</h1></header>
        <main>
          {this.state.data.map((data: any, i: any) => (
            <Post data={data} key={i}/>
          ))}
        </main>
      </div>
    );
  }
}
