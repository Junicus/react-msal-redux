import { applyMiddleware, createStore } from 'redux';
import { authMiddleware } from '@junicus_/react-msal-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../state';

const clientId = process.env.REACT_APP_AUTH_CLIENTID || '';
const authority = process.env.REACT_APP_AUTH_AUTHORITY || '';

export const configureStore = preloadedState => {
  const middleware = [
    authMiddleware({
      auth: { clientId, authority },
      cache: { cacheLocation: 'localStorage', storeAuthStateInCookie: true },
      system: { tokenRenewalOffsetSeconds: 600 },
      framework: { isAngular: false },
    }),
  ];
  const middlewareEnhancer = applyMiddleware(...middleware);

  const store = createStore(rootReducer, preloadedState, composeWithDevTools(middlewareEnhancer));

  return store;
};
