import { FETCH_POST_COMMENTS, fetchPostComments } from '../actions';
import { httpRequest } from '../async';
import { filterByAction } from '../epic';
import { Epic } from '../redux.d';

const PAGE_URL = 'https://www.reddit.com';

export const postCommentsEpic: Epic<fetchPostComments, any> = action$ => {
  return action$.filter(filterByAction(FETCH_POST_COMMENTS)).chain(
    action =>
      httpRequest(
        {
          method: 'get',
          headers: {},
          url: `${PAGE_URL + action.payload.path}.json`
        },
        action,
      ) as any,
  );
};
