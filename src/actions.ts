import { Account } from 'msal';
import { IdToken } from 'msal/lib-commonjs/IdToken';
import { ActionCreator } from 'redux';
import {
  AcquireAccessTokenFailedAction,
  AcquireAccessTokenSuccessAction,
  AcquireIdTokenSuccessAction,
  AuthActionsTypes,
  AuthTypes,
  CallbackSuccessAction,
  SignInAction,
  SignInActionPayload,
  SignInFailedAction,
  SignInSuccessAction,
} from './types';

export const signIn: ActionCreator<SignInAction> = (payload: SignInActionPayload) => ({
  payload,
  type: AuthTypes.SIGNIN,
});

export const logout = (): AuthActionsTypes => {
  return {
    type: AuthTypes.SIGNOUT,
  };
};

export const signInSuccess: ActionCreator<SignInSuccessAction> = (user: Account) => {
  return {
    payload: { user },
    type: AuthTypes.SINGIN_SUCCESS,
  };
};

export const signInFailed: ActionCreator<SignInFailedAction> = error => {
  return {
    payload: {
      error,
    },
    type: AuthTypes.SINGIN_FAILED,
  };
};

export const callbackSuccess: ActionCreator<CallbackSuccessAction> = () => {
  return {
    type: AuthTypes.CALLBACK_SUCCESS,
  };
};

export const acquireIdTokenSuccess: ActionCreator<AcquireIdTokenSuccessAction> = (idToken: IdToken) => ({
  payload: {
    idToken,
  },
  type: AuthTypes.ACQUIRE_IDTOKEN_SUCCESS,
});

export const acquireAccessTokenSuccess: ActionCreator<AcquireAccessTokenSuccessAction> = (
  accessToken: string,
  scopes: string[],
) => ({
  payload: {
    accessToken,
    scopes,
  },
  type: AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS,
});

export const acquireAccessTokenFailed: ActionCreator<AcquireAccessTokenFailedAction> = (error: Error) => ({
  payload: {
    error,
  },
  type: AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED,
});
