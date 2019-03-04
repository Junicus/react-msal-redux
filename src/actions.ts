import { UserAgentApplication } from 'msal';
import { AnyAction, Dispatch } from 'redux';
import keys from './constants';
import {
  IMsalOptions,
  ISignInActionPayload,
  IAuthState, ISignInInProgressAction, ISignInSuccessAction, ISignInFailedAction, ICallbackSuccessAction, IAcquireIdTokenSuccessAction, IAcquireAccessTokenInProgressAction
} from './interfaces';

let userAgentApplication: UserAgentApplication = null;

type ActionTypes =
  | ISignInSuccessAction
  | ISignInInProgressAction
  | ISignInFailedAction
  | ICallbackSuccessAction
  | IAcquireAccessTokenInProgressAction;


export const signIn = (payload: ISignInActionPayload) => async (dispatch: Dispatch<ActionTypes>) => {
  dispatch(signInInProgress());

  const scopes = payload.scopes || [userAgentApplication.clientId];
  if (userAgentApplication.isCallback(window.location.hash)) {
    dispatch(callbackSuccess());
  }

  const user = userAgentApplication.getUser();
  const tokenExpired = user ? (user.idToken as any).exp < Date.now() : false;

  if (user && !tokenExpired) {
    acquireAccessToken(scopes)(dispatch);
  } else {
    const popup = payload.popup || false;
    if (popup) {
      try {
        const idToken = await userAgentApplication.loginPopup(scopes);
        dispatch(acquireIdTokenSuccess());
      } catch (error) {
        console.log(error);
      }
    } else {
      userAgentApplication.loginRedirect(scopes);
    }
  }
};

const acquireAccessToken = (scopes: string[]) => (dispatch: Dispatch<ActionTypes>) => {
  dispatch(acquireAccessTokenInProgress());
}

const idTokenAcquired = (idToken: string) => (dispatch: Dispatch) => {
  dispatch({ type: AUTH_IDTOKEN_ACQUIRED, payload: idToken });
};


export const initAuth = (clientId: string, authority: string, options?: IMsalOptions) => {
  const mergedOptions: IMsalOptions = {
    navigateToLoginRequestUrl: false,
    ...options,
  };
  userAgentApplication = new UserAgentApplication(clientId, authority, null, mergedOptions);
};

const signInInProgress = (): ISignInInProgressAction => {
  return {
    type: keys.SINGIN_INPROGRESS
  }
}

const signInSuccess = (): ISignInSuccessAction => {
  return {
    type: keys.SINGIN_SUCCESS
  }
}

const signInFailed = (error: Error): ISignInFailedAction => {
  return {
    type: keys.SINGIN_FAILED,
    payload: {
      error
    }
  }
}

const callbackSuccess = (): ICallbackSuccessAction => {
  return {
    type: keys.CALLBACK_SUCCESS
  }
}


const acquireIdTokenSuccess = (): IAcquireIdTokenSuccessAction => ({
  type: keys.ACQUIRE_IDTOKEN_SUCCESS
})

const acquireAccessTokenInProgress = (): IAcquireAccessTokenInProgressAction => ({
  type: keys.ACQUIRE_ACCESSTOKEN_INPROGRESS
})