import { AuthenticationParameters, Configuration, UserAgentApplication } from 'msal';
import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from 'redux';
import {
  acquireAccessTokenFailed,
  acquireAccessTokenSuccess,
  acquireIdTokenSuccess,
  callbackSuccess,
  signInFailed,
  signInSuccess,
} from './actions';
import { AuthActionsTypes, AuthState, AuthTypes, SignInActionPayload } from './types';

let userAgentApplication: UserAgentApplication = null;

export const authMiddleware = (configuration: Configuration): Middleware => {
  userAgentApplication = new UserAgentApplication(configuration);
  return ({ dispatch }: MiddlewareAPI<Dispatch<AnyAction>, AuthState>) => (next: Dispatch) => (
    action: AuthActionsTypes,
  ) => {
    switch (action.type) {
      case AuthTypes.SIGNIN:
        login(action.payload)(dispatch);
        return next(action);
      case AuthTypes.SIGNOUT:
        logout();
        return next(action);
      case AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS:
        setTimeout(() => acquireAccessToken(action.payload.scopes)(dispatch), 600000);
        return next(action);
      default:
        return next(action);
    }
  };
};

export const login = (payload: SignInActionPayload) => (dispatch: Dispatch<AuthActionsTypes>) => {
  const scopes = payload.scopes || [userAgentApplication.getCurrentConfiguration().auth.clientId];

  if (userAgentApplication.isCallback(window.location.hash)) {
    dispatch(callbackSuccess());
  }

  let user = userAgentApplication.getAccount();
  const currentEpoch = Math.ceil(Date.now() / 1000);
  const tokenExpired = user ? (user.idToken as any).exp < currentEpoch : false;

  if (user && !tokenExpired) {
    dispatch(signInSuccess(user));
    acquireAccessToken(scopes)(dispatch);
  } else {
    const popup = payload.popup || false;
    const requestObj: AuthenticationParameters = {
      scopes,
    };

    if (popup) {
      userAgentApplication
        .loginPopup(requestObj)
        .then(response => {
          dispatch(signInSuccess(response.account));
          dispatch(acquireIdTokenSuccess(response.idToken));
          acquireAccessToken(scopes)(dispatch);
        })
        .catch(error => {
          dispatch(signInFailed(error));
        });
    } else {
      userAgentApplication.loginRedirect(requestObj);
    }
  }
};

const acquireAccessToken = (scopes: string[]) => (dispatch: Dispatch<AuthActionsTypes>) => {
  const requestObj: AuthenticationParameters = {
    scopes,
  };
  userAgentApplication
    .acquireTokenSilent(requestObj)
    .then(tokenResponse => {
      dispatch(acquireAccessTokenSuccess(tokenResponse.accessToken, scopes));
    })
    .catch(silentError => {
      dispatch(acquireAccessTokenFailed(silentError));
      userAgentApplication
        .acquireTokenPopup(requestObj)
        .then(tokenResponse => {
          dispatch(acquireAccessTokenSuccess(tokenResponse.accessToken, scopes));
        })
        .catch(popupError => {
          dispatch(acquireAccessTokenFailed(popupError));
        });
    });
};

export const logout = () => () => {
  userAgentApplication.logout();
};
