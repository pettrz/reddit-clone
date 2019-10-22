import { handleActions } from 'redux-actions';
import { FETCH_SUBREDDIT } from '../actions/subreddit';
import { ASYNC_DONE, ASYNC_START, asyncWrapper } from '../async';

const initialState = {
  isLoading: false,
  postData: [],
  currentSub: '',
  error: undefined,
};

export const subreddit = handleActions<any>(
  {
    [ASYNC_START]: asyncWrapper({
      [FETCH_SUBREDDIT]: (state: any) => ({ ...state, isLoading: true }),
    }),
    [ASYNC_DONE]: asyncWrapper({
      [FETCH_SUBREDDIT]: (state: any, action: any) => {
        if (!action.payload.data) {
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
            postData: action.payload.data.data,
            currentSub: action.payload.trigger.payload.sub
          };
        }
      },
    }),
  },
  initialState,
);
