import { FETCH_SUBREDDIT, fetchSubreddit } from '../actions/subreddit';
import { httpRequest } from '../async';
import { filterByAction } from '../epic';
import { Epic } from '../redux.d';

const PAGE_URL = 'https://www.reddit.com';

export const subredditEpic: Epic<fetchSubreddit, any> = (action$) => {
  return action$
    .filter(filterByAction(FETCH_SUBREDDIT))
    .chain(
      action =>
        httpRequest({ 
          method: 'get', 
          headers: {}, 
          url: `${PAGE_URL + action.payload.sub}.json`, 
          params: action.payload.params},
          action
        ) as any
    );
};