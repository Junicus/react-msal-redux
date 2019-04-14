import { User } from 'msal';
import { AuthActionsTypes, AuthTypes } from './types';

export const login = (scopes: string[], popup?: boolean): AuthActionsTypes => {
  return {
    payload: {
      popup,
      scopes,
    },
    type: AuthTypes.SIGNIN,
  };
};

export const logout = (): AuthActionsTypes => {
  return {
    type: AuthTypes.SIGNOUT,
  };
};

export const signInSuccess = (user: User): AuthActionsTypes => {
  return {
    payload: { user },
    type: AuthTypes.SINGIN_SUCCESS,
  };
};

export const signInFailed = (error: Error): AuthActionsTypes => {
  return {
    payload: {
      error,
    },
    type: AuthTypes.SINGIN_FAILED,
  };
};

export const callbackSuccess = (): AuthActionsTypes => {
  return {
    type: AuthTypes.CALLBACK_SUCCESS,
  };
};

export const acquireIdTokenSuccess = (idToken: string): AuthActionsTypes => ({
  payload: {
    idToken,
  },
  type: AuthTypes.ACQUIRE_IDTOKEN_SUCCESS,
});

export const acquireAccessTokenSuccess = (accessToken: string, scopes: string[]): AuthActionsTypes => ({
  payload: {
    accessToken,
    scopes,
  },
  type: AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS,
});

export const acquireAccessTokenFailed = (error: Error): AuthActionsTypes => ({
  payload: {
    error,
  },
  type: AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED,
});
