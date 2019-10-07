import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Post from './components/Post';

export const App = ({ history, location }: any) => {
  const getParamsFromUrl = (urlString: string) => {
    const uriParams = queryString.parse(urlString);
    return uriParams;
  };

  const [postData, setPostData] = useState([]);
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);
  const [limit, setLimit] = useState(undefined);


  useEffect(() => {
    const searchParams = getParamsFromUrl(location.search);
    const params = {
      ...searchParams,
    };
    const fetchData = async () => {
      await axios
        .get(
          `https://www.reddit.com${location.pathname}.json?${queryString.stringify(
            params,
          )}`,
        )
        .then(result => {
          const { data } = result.data;
          setPostData(data.children);
          setAfter(data.after);
          setBefore(data.before);
        });
    };
    fetchData();
  }, [location]);

  const limitHandler = (e: any) => {
    const { value } = e.target;
    const searchParams = getParamsFromUrl(location.search);
    setLimit(value);
    history.push(
      `/r/reactjs?${queryString.stringify({ ...searchParams, limit: value })}`,
    );
  };

  const subredditHandler = (name: string) => {
    const searchParams = getParamsFromUrl(location.searchParams);
    const pathname = `/r/${name}`;
    console.log(pathname);
    history.push(
      `${pathname}?${queryString.stringify({ ...searchParams, limit })}`,
    );
  };
  return (
    <div className="wrapper">
      <Header limitHandler={limitHandler} subredditHandler={subredditHandler} />
      <main>
        {postData.map((data: [], i: number) => (
          <Post data={data} key={i} />
        ))}
        {before && (
          <Link
            to={`/r/reactjs?${queryString.stringify({
              limit: limit || 25,
              before,
            })}`}
          >
            Prev
          </Link>
        )}
        {after && (
          <Link
            to={`/r/reactjs?${queryString.stringify({
              limit: limit || 25,
              after,
            })}`}
          >
            Next
          </Link>
        )}
      </main>
    </div>
  );
};

export default App;
