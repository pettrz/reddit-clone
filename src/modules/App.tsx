import * as _ from 'lodash';
import qs from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { ButtonLink } from './components/Button/Button';
import Header from './components/Header/Header';
import Post from './components/Post/Post';

export const App = ({ history, location, subreddit, fetchSubreddit }: any) => {
  const getParamsFromUrl = (urlString: string) => {
    const uriParams = qs.parse(urlString);
    return uriParams;
  };

  const [limit, setLimit] = useState(undefined);
  const [url, setUrl] = useState<any>({ sub: undefined, params: undefined });
  const [pageError, setPageError] = useState(false);

  const getSubreddit = useCallback(
    (sub: string, params: {}) => {
      fetchSubreddit({ sub, params });
    },
    [fetchSubreddit],
  );

  // useEffect(() => {
  //   history.push(location.pathname, qs.stringify(url.params));
  // },[limit, history]);

  // const setHistory = (sub: string, params: string) => {
  //   history.push(sub+params);
  // };

  useEffect(() => {
    setPageError(false);
    let ignore = false;
    const searchParams = getParamsFromUrl(location.search);
    const params = {
      ...searchParams,
    };
    console.log(location.pathname);
    if (!ignore) {
      getSubreddit(location.pathname, params);
    }
    setUrl({ sub: location.pathname, params });

    return () => {
      ignore = true;
    };
  }, [location, getSubreddit]);

  const limitHandler = (e: any) => {
    const { value } = e.target;
    setLimit(value);
    history.push({
      pathname: url.sub,
      search: qs.stringify({ ...url.params, limit: value }),
    });
  };

  const subredditHandler = (name: string) => {
    const pathname = `/r/${name}`;
    history.push({
      pathname
    });
  };

  const after = _.get(subreddit, 'postData.after', '');
  const before = _.get(subreddit, 'postData.before', '');
  const posts = _.get(subreddit, 'postData.children', []);
  const beforeLink = url.sub + '?' + qs.stringify({ ...url.params, limit: limit || 25, after: undefined, before });
  const afterLink = url.sub + '?' + qs.stringify({ ...url.params, limit: limit || 25, after, before: undefined });

  return (
    <div className="wrapper">
      <Header limitHandler={limitHandler} subredditHandler={subredditHandler} />
      <main>
        {pageError ? (
          <div className="subreddit-error">
            <h3>Something went wrong :(</h3>
            <p>This subreddit probably doesn't exist.</p>
            <ButtonLink to="/" type="home">
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
              to={beforeLink}
            >
              Prev
            </ButtonLink>
          )}
          {after && !pageError && (
            <ButtonLink
              type="pagination"
              to={afterLink}
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
