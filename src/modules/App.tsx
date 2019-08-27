import axios from 'axios';
// import _ from 'lodash';
// å 
import queryString from 'query-string';
import React, { useState, useEffect } from 'react';
import './App.scss';
import Post from './components/Post';

export const App = () => {
  const [postData, setPostData] = useState([]);
  const [after, setAfter] = useState('');
  const [afterQuery, setAfterQuery] = useState('');

  useEffect(() => {
    let ignore = false;
    const query = {
      after
    };
    console.log(queryString.stringify(query));
    async function fetchData() {
      const result = await axios(`https://www.reddit.com/r/reactjs.json?${queryString.stringify(query)}`);
      if (!ignore) { 
        setPostData(result.data.data.children);
        setAfterQuery(result.data.data.after);
      }
    }

    fetchData();
    return () => { ignore = true; };
  }, [after]);

  const nextPage = () => setAfter(afterQuery);
  
  return (
    <div className="wrapper">
      <header>
        <h1>Reddit clone</h1>
      </header>
      <main>
        {postData.map((data: [], i: number) => (
          <Post data={data} key={i} />
        ))}
        <button onClick={nextPage}>Next</button>
      </main>
    </div>
  );
};

export default App;


