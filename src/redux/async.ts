import * as axios from 'axios';
import { Action, createAction } from 'redux-actions';

import { fromPromise, just } from 'most';

export type AsyncAction<T, D> = Action<IAsyncActionPayload<T, D>>;
export interface IAsyncActionPayload<T, D> { trigger: Action<T>; data?: D; error?: boolean; };

export const ASYNC_START = 'async/START';
export const ASYNC_FAIL = 'async/FAIL';
export const ASYNC_DONE = 'async/DONE';

export const startAsyncActionCreator = createAction<IAsyncActionPayload<any, any>>(ASYNC_START);
export const doneAsyncActionCreator = createAction<IAsyncActionPayload<any, any>>(ASYNC_DONE);
export const failAsyncActionCreator = createAction<IAsyncActionPayload<any, any>>(ASYNC_FAIL);

type HOA<A> = Action<Action<A>>;

interface IActionHandlerList { [s: string]: any | HOA<any>; }

export const asyncWrapper =
  <A>(hoc: IActionHandlerList) =>
    (state: A, action: Action<any>) =>
      hoc.hasOwnProperty(action.payload.trigger.type) ?
        hoc[action.payload.trigger.type](state, action) : state;

interface IRequest { options: axios.AxiosRequestConfig; tag: string; };

export const asyncAction =
  <A, P>(promise: Promise<P>, trigger: Action<A>) =>
    just(startAsyncActionCreator({ trigger }))
      .concat(
      fromPromise(
        promise
          .then((data) => doneAsyncActionCreator({ data, trigger }))
          .catch(({ response }: axios.AxiosError) => doneAsyncActionCreator({ trigger, error: true, data: response ? response.data : null }))
      ));

export const httpRequest = <A>(options: axios.AxiosRequestConfig, action: Action<A>) =>
  asyncAction(
    axios.default(options)
      .then(({ data }) => data) as Promise<axios.AxiosResponse>,
    action);

export const httpRequestCombined = <A>(requests: IRequest[], action: Action<A>) =>
  asyncAction(
    axios
      .default
      .all(requests.map(_REQUEST => axios.default(_REQUEST.options)))
      .then((responses) =>
        responses.reduce((_RESPONSES, { data }, index) => ({ ..._RESPONSES, [requests[index].tag]: data }), {})
      ) as Promise<axios.AxiosResponse>,
    action);
