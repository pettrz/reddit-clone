import { Action } from 'redux-actions';

export const filterByAction = (type: string) => <A>(action: Action<A>) =>
  action.type === type;
