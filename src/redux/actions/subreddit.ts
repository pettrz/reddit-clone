import { Action, createAction } from 'redux-actions';

export const FETCH_SUBREDDIT = 'subreddit/FETCH_SUBREDDIT';
export type fetchSubreddit = Action<{}>;
export const fetchSubreddit = createAction(FETCH_SUBREDDIT);