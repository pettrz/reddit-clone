import { Action, createAction } from 'redux-actions';

export const FETCH_SUBREDDIT = 'subreddit/FETCH_SUBREDDIT';
export type fetchSubreddit = Action<{sub: string, params: string}>;
export const fetchSubreddit = createAction(FETCH_SUBREDDIT);
