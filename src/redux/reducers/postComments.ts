import { handleActions } from 'redux-actions';
import { FETCH_POST_COMMENTS } from '../actions/subreddit';
import { ASYNC_DONE, ASYNC_START, asyncWrapper } from '../async';

const initialState = {
  isLoading: false,
  post: [],
  comments: [],
  error: undefined,
};

export const postComments = handleActions<any>(
  {
    [ASYNC_START]: asyncWrapper({
      [FETCH_POST_COMMENTS]: (state: any) => ({ ...state, isLoading: true }),
    }),
    [ASYNC_DONE]: asyncWrapper({
      [FETCH_POST_COMMENTS]: (state: any, action: any) => {
        if (action.payload.data.error) {
          return {
            ...state,
            isLoading: false,
            error: true,
          };
        } else {
          return {
            ...state,
            isLoading: false,
            error: false,
            post: action.payload.data[0].data.children[0].data,
            comments: action.payload.data[1].data.children,
          };
        }
      },
    }),
  },
  initialState,
);
