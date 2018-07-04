import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger(); // options: https://github.com/evgenyrodionov/redux-logger#options
const customizedPromiseMiddleware = promiseMiddleware({
  promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
});

const middleware = applyMiddleware(ReduxThunk, customizedPromiseMiddleware, logger);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducers, compose(middleware, devTools));

export default store;