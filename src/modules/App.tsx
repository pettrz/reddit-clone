import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import './App.scss';
import { ButtonLink } from './components/Button/Button';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

export const App = ({ history, location, subreddit, fetchSubreddit }: any) => {
  const getParamsFromUrl = (urlString: string) => {
    const uriParams = queryString.parse(urlString);
    return uriParams;
  };

  const [postData, setPostData] = useState([]);
  const [before, setBefore] = useState(undefined);
  const [after, setAfter] = useState(undefined);
  const [limit, setLimit] = useState(undefined);
  const [pageError, setPageError] = useState(false);

  useEffect(() => {
    setPageError(false);
    const searchParams = getParamsFromUrl(location.search);
    const params = {
      ...searchParams,
    };
    console.log(subreddit);
    fetchSubreddit({
      sub: location.pathname, 
      params: queryString.stringify(params)
    });
    const fetchData = async () => {
      await axios
        .get(
          `https://www.reddit.com${
            location.pathname
          }.json?${queryString.stringify(params)}`,
        )
        .then(result => {
          // tslint:disable-next-line: no-shadowed-variable
          const { data } = result.data;
          setPostData(data.children);
          setAfter(data.after);
          setBefore(data.before);
        })
        .catch(err => setPageError(err));
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
    history.push(
      `${pathname}?${queryString.stringify({ ...searchParams, limit })}`,
    );
  };
  console.log(subreddit);
  return (
    <div className="wrapper">
      <Header limitHandler={limitHandler} subredditHandler={subredditHandler} />
      <main>
        {pageError ? (
          <div className="subreddit-error">
            <h3>Something went wrong :(</h3>
            <p>This subreddit probably doesn't exist.</p>
            <ButtonLink to="/r/reactjs" type="home">
              Go home
            </ButtonLink>
          </div>
        ) : (
          postData.map((data: [], i: number) => <Post data={data} key={i} />)
        )}
        <div>
          {before && !pageError && (
            <ButtonLink
              type="pagination"
              to={`/r/reactjs?${queryString.stringify({
                limit: limit || 25,
                before,
              })}`}
            >
              Prev
            </ButtonLink>
          )}
          {after && !pageError && (
            <ButtonLink
              type="pagination"
              to={`/r/reactjs?${queryString.stringify({
                limit: limit || 25,
                after,
              })}`}
            >
              Next
            </ButtonLink>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
