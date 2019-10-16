import * as _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { getParamsFromUrl } from '../helpers/getParams';
import { ButtonLink } from './components/Button/Button';
import Layout from './components/Layout';
import Post from './components/Post/Post';

export const App = ({ location, subreddit, fetchSubreddit }: any) => {
  const [pageError, setPageError] = useState(false);

  const getSubreddit = useCallback(
    (sub: string, params: {}) => {
      fetchSubreddit({ sub, params });
    },
    [fetchSubreddit],
  );
  useEffect(() => {
    setPageError(false);
    let ignore = false;
    const searchParams = getParamsFromUrl(location.search);
    const params = {
      limit: 10,
      ...searchParams
    };
    if (!ignore) {
      getSubreddit(location.pathname, params);
    }

    return () => {
      ignore = true;
    };
  }, [location, getSubreddit]);

  const posts = _.get(subreddit, 'postData.children', []);
  console.log(subreddit);
  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
