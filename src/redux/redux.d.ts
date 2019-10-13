import { Stream } from 'most';
import { MiddlewareAPI } from 'redux';
export type Epic<A, S> = (
  action$: Stream<A>,
  store: MiddlewareAPI<S>,
) => Stream<A>;
