import * as _ from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { getParamsFromUrl } from '../helpers/getParams';
import Layout from './components/Layout';
import Post from './components/Post/Post';
import { NoMatchText } from './views/404/404';

export const App = ({ location, subreddit, fetchSubreddit }: any) => {
  const getSubreddit = useCallback(
    (sub: string, params: {}) => {
      fetchSubreddit({ sub, params });
    },
    [fetchSubreddit],
  );
  useEffect(() => {
    let ignore = false;

    const searchParams = getParamsFromUrl(location.search);
    const params = {
      limit: 10,
      ...searchParams,
    };
    if (!ignore) {
      getSubreddit(location.pathname, params);
    }

    return () => {
      ignore = true;
    };
  }, [location, getSubreddit]);

  const posts = _.get(subreddit, 'postData.children', []);
  return (
    <Layout>
      {subreddit.error ? (
        <NoMatchText />
      ) : (
        posts.map((data: {}, i: number) => <Post data={data} key={i} />)
      )}
    </Layout>
  );
};

export default App;
