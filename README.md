# react-msal-redux

React library that supports authenticating against Azure AD using Msal and Redux

## Installation

```sh
npm install @junicus_/react-msal-redux
```

or

```sh
yarn add @junicus_/react-msal-redux
```

## Usage

```js
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { authMiddleware, authReducer } from '@junicus_/react-msal-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const clientId = process.env.REACT_APP_AUTH_CLIENTID || '';
const authority = process.env.REACT_APP_AUTH_AUTHORITY || '';

const rootReducer = combineReducers({
  auth: authReducer,
});

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
```

```js
import React from 'react';
import { connect } from 'react-redux';
import App from './App';
import { login, logout } from '@junicus_/react-msal-redux';

const AppContainer = props => {
  return <App user={props.auth.user} accessToken={props.auth.accessToken} login={props.login} logout={props.logout} />;
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login({ popup: true, scopes: ['openid'] })),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
```

## Actions

| Constant                          | Payload                                      | Description                                       |
| --------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| @auth/SIGNIN                      | `{ popup?: boolean; scopes: string[]; }`     | Used to trigger a loging                          |
| @auth/SIGNOUT                     | n/a                                          | Used to trigger a logout                          |
| @auth/ACQUIRE_ACCESSTOKEN_SUCCESS | `{ accessToken: string; scopes: string[]; }` | Triggered when access token received or refreshed |
| @auth/SINGNIN_SUCCESS             | `{ user: User; }`                            | Triggered when sign in is successful              |
| @auth/SINGNIN_FAILED              | `{ error: any; }`                            | Triggered when sign in failed                     |

## Functions

### Login

`import { login } from '@junicus_/react-msal-redux'`

Dispatch to trigger a login

#### Args

| Parameter | Type          | Description                              |
| --------- | ------------- | ---------------------------------------- |
| payload   | SignInPayload | `{ popup?: boolean; scopes: string[]; }` |

### Logout

`import { logout } from '@junicus_/react-msal-redux'`

Dispatch to trigger a logout
