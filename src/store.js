import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger)); // options: https://github.com/evgenyrodionov/redux-logger#options
// const store = createStore(reducers, applyMiddleware(loggerMiddleware));

export default store;