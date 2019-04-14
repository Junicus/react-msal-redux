import { applyMiddleware, createStore } from 'redux';
import { msalMiddleware } from '@junicus_/react-msal-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../state';

const clientId = process.env.REACT_APP_AUTH_CLIENTID || '';
const authority = process.env.REACT_APP_AUTH_AUTHORITY || '';

export const configureStore = preloadedState => {
  const middleware = [msalMiddleware(clientId, authority)];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(rootReducer, preloadedState, composeWithDevTools(middlewareEnhancer));

  return store;
};
