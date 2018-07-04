import { createStore, applyMiddleware } from 'redux';
import reducers from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger(); // options: https://github.com/evgenyrodionov/redux-logger#options
const store = createStore(reducers, applyMiddleware(logger, ReduxThunk));
// const store = createStore(reducers, applyMiddleware(loggerMiddleware));

export default store;