import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import Post from './components/Post';

export const App = ({ location }: any) => {

  const getParamsFromUrl = (urlString: string) => {
    const uriParams = queryString.parse(urlString);
    return uriParams;
  };

  const [postData, setPostData] = useState([]);
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);

  useEffect(() => {
    
    function fetchData() {
      const searchParams = getParamsFromUrl(location.search);

      axios(`https://www.reddit.com/r/reactjs.json?count=25&${queryString.stringify({ ...searchParams })}`)
      .then(result => {
        setPostData(result.data.data.children);
        setAfter(result.data.data.after);
        setBefore(result.data.data.before);
      });
    }

    fetchData();

  }, [location]);
  

  return (
    <div className="wrapper">
      <header>
        <h1>Reddit clone</h1>
      </header>
      <main>
        {postData.map((data: [], i: number) => (
          <Post data={data} key={i} />
        ))}
        { before &&
          <Link to={`/r/reactjs?${queryString.stringify({ before })}`}>Prev</Link>
        }
        { after &&
          <Link to={`/r/reactjs?${queryString.stringify({ after })}`}>Next</Link>
        }
      </main>
    </div>
  );
};

export default App;
