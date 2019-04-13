import { UserAgentApplication } from 'msal';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  acquireAccessTokenFailed,
  acquireAccessTokenSuccess,
  acquireIdTokenSuccess,
  callbackSuccess,
  signInFailed,
  signInSuccess,
  signOutSuccess,
} from './actions';
import { AuthActionsTypes, AuthTypes, IAuthState, IMsalOptions, ISignInActionPayload } from './types';

let userAgentApplication: UserAgentApplication = null;

export const msalMiddleware = (clientId: string, authority: string, options?: IMsalOptions): Middleware => {
  const mergedOptions: IMsalOptions = {
    navigateToLoginRequestUrl: false,
    ...options,
  };
  userAgentApplication = new UserAgentApplication(clientId, authority, null, mergedOptions);
  return ({ getState, dispatch }: MiddlewareAPI<Dispatch<AuthActionsTypes>, IAuthState>) => (next: Dispatch) => (
    action: AuthActionsTypes,
  ) => {
    switch (action.type) {
      case AuthTypes.SIGNIN:
        signIn(action.payload)(dispatch);
        return next(action);
      case AuthTypes.SIGNOUT:
        signOut()(dispatch);
        return next(action);
      default:
        return next(action);
    }
  };
};

const signIn = (payload: ISignInActionPayload) => (dispatch: Dispatch<AuthActionsTypes>) => {
  const scopes = payload.scopes || [userAgentApplication.clientId];
  if (userAgentApplication.isCallback(window.location.hash)) {
    dispatch(callbackSuccess());
  }

  let user = userAgentApplication.getUser();
  const tokenExpired = user ? (user.idToken as any).exp < Date.now() : false;

  if (user && !tokenExpired) {
    dispatch(signInSuccess(user));
    acquireAccessToken(scopes)(dispatch);
  } else {
    const popup = payload.popup || false;
    if (popup) {
      userAgentApplication
        .loginPopup(scopes)
        .then(idToken => {
          user = userAgentApplication.getUser();
          dispatch(signInSuccess(user));
          dispatch(acquireIdTokenSuccess(idToken));
        })
        .catch(error => {
          dispatch(signInFailed(error));
        });
    }
  }
};

const acquireAccessToken = (scopes: string[]) => (dispatch: Dispatch<AuthActionsTypes>) => {
  userAgentApplication.acquireTokenSilent(scopes).then(
    accessToken => {
      dispatch(acquireAccessTokenSuccess(accessToken));
    },
    silentError => {
      dispatch(acquireAccessTokenFailed(silentError));
      userAgentApplication.acquireTokenPopup(scopes).then(
        accessToken => {
          dispatch(acquireAccessTokenSuccess(accessToken));
        },
        popupError => {
          dispatch(acquireAccessTokenFailed(popupError));
        },
      );
    },
  );
};

const signOut = () => (dispatch: Dispatch<AuthActionsTypes>) => {
  userAgentApplication.logout();
  dispatch(signOutSuccess());
};
