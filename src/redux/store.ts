import * as _ from 'lodash';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import * as epics from './epics';
import * as reducers from './reducers';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'local';


const adapter = require('redux-observable-adapter-most').default;

export const epicMiddlewares = _.values(epics).map(epic => applyMiddleware(createEpicMiddleware(epic as any, { adapter })));

const rootReducer = combineReducers(reducers);

const composeEnhancers =
  typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const storeMiddlewares = (env === 'local') ?
  composeEnhancers(...epicMiddlewares) :
  compose(...epicMiddlewares);

export const store = createStore(rootReducer, storeMiddlewares);
