import * as _ from 'lodash';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { ButtonLink } from './components/Button/Button';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

export const App = ({ history, location, subreddit, fetchSubreddit }: any) => {
  const getParamsFromUrl = (urlString: string) => {
    const uriParams = queryString.parse(urlString);
    return uriParams;
  };


  const [limit, setLimit] = useState(undefined);
  const [url, setUrl] = useState<any>({sub: undefined, params: undefined});
  const [pageError, setPageError] = useState(false);

  const getSubreddit = useCallback((sub: string, params: string) => {
    fetchSubreddit({ sub, params });
  }, [fetchSubreddit]);

  // useEffect(() => {
  //   history.push(location.pathname, queryString.stringify(url.params));
  // },[limit, history]);

  // const setHistory = (sub: string, params: string) => {
  //   history.push(sub+params);
  // };

  useEffect(() => {
    setPageError(false);
    let ignore = false;
    const searchParams = getParamsFromUrl(location.search);
    const params = {
      ...searchParams
    };
    if (!ignore) {
      getSubreddit(location.pathname, queryString.stringify(params));
    } 
    setUrl({sub: location.pathname, params});
     
    return () => { ignore = true; };
  }, [location, getSubreddit]);

  const limitHandler = (e: any) => {
    const { value } = e.target;
    setLimit(value);
    history.push({
      search: queryString.stringify({ ...url.params, limit })
    });
  };

  const subredditHandler = (name: string) => {
    const pathname = `/r/${name}`;
    history.push({
      pathname,
      search: queryString.stringify(url.params)
    });
  };

  const { after, before } = _.get(subreddit, 'postData', '');
  const posts = _.get(subreddit, 'postData.children', []); 
  console.log(url.params);
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
          posts.map((data: {}, i: number) => <Post data={data} key={i} />)
        )}
        <div>
          {before && !pageError && (
            <ButtonLink
              type="pagination"
              to={`${queryString.stringify({...url.params, limit: limit || 25, before })}`}
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
