import { UserAgentApplication } from 'msal';
import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  acquireAccessTokenFailed,
  acquireAccessTokenSuccess,
  acquireIdTokenSuccess,
  callbackSuccess,
  signInFailed,
  signInSuccess,
} from './actions';
import { AuthActionsTypes, AuthState, AuthTypes, MsalOptions, SignInActionPayload } from './types';

let userAgentApplication: UserAgentApplication = null;

export const msalMiddleware = (clientId: string, authority: string, options?: MsalOptions): Middleware => {
  const mergedOptions: MsalOptions = {
    navigateToLoginRequestUrl: false,
    ...options,
  };
  userAgentApplication = new UserAgentApplication(clientId, authority, null, mergedOptions);
  return ({ getState, dispatch }: MiddlewareAPI<Dispatch<AuthActionsTypes>, AuthState>) => (next: Dispatch) => (
    action: AuthActionsTypes,
  ) => {
    switch (action.type) {
      case AuthTypes.SIGNIN:
        signIn(action.payload)(dispatch);
        return next(action);
      case AuthTypes.SIGNOUT:
        signOut();
        return next(action);
      case AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS:
        setTimeout(() => acquireAccessToken(action.payload.scopes)(dispatch), 600000);
        return next(action);
      default:
        return next(action);
    }
  };
};

const signIn = (payload: SignInActionPayload) => (dispatch: Dispatch<AuthActionsTypes>) => {
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
        .then(token => {
          user = userAgentApplication.getUser();
          dispatch(signInSuccess(user));
          dispatch(acquireIdTokenSuccess(token));
          dispatch(acquireAccessTokenSuccess(token, scopes));
        })
        .catch(error => {
          dispatch(signInFailed(error));
        });
    } else {
      userAgentApplication.loginRedirect(scopes);
    }
  }
};

const acquireAccessToken = (scopes: string[]) => (dispatch: Dispatch<AuthActionsTypes>) => {
  userAgentApplication.acquireTokenSilent(scopes).then(
    accessToken => {
      dispatch(acquireAccessTokenSuccess(accessToken, scopes));
    },
    silentError => {
      dispatch(acquireAccessTokenFailed(silentError));
      userAgentApplication.acquireTokenPopup(scopes).then(
        accessToken => {
          dispatch(acquireAccessTokenSuccess(accessToken, scopes));
        },
        popupError => {
          dispatch(acquireAccessTokenFailed(popupError));
        },
      );
    },
  );
};

const signOut = () => () => {
  userAgentApplication.logout();
};
