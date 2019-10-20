import { Action, createAction } from 'redux-actions';

export const FETCH_SUBREDDIT = 'subreddit/FETCH_SUBREDDIT';
export type fetchSubreddit = Action<{ sub: string; params: string }>;
export const fetchSubreddit = createAction(FETCH_SUBREDDIT);

export const FETCH_POST_COMMENTS = 'subreddit/FETCH_POST_COMMENTS';
export type fetchPostComments = Action<{ path: string }>;
export const fetchPostComments = createAction(FETCH_POST_COMMENTS);

export const CLEAR_COMMENTS = 'subreddit/CLEAR_COMMENTS';
export type clearComments = Action<void>;
export const clearComments = createAction(CLEAR_COMMENTS);