import * as msal from 'msal';
import { IdToken } from 'msal/lib-commonjs/IdToken';
import { Action } from 'redux';

export enum AuthTypes {
  SIGNIN = '@@auth/SIGNIN',
  SINGIN_SUCCESS = '@@auth/SINGNIN_SUCCESS',
  SINGIN_FAILED = '@@auth/SINGNIN_FAILED',
  SIGNOUT = '@@auth/SIGNOUT',
  CALLBACK_SUCCESS = '@@auth/CALLBACK_SUCCESS',
  ACQUIRE_IDTOKEN_SUCCESS = '@@auth/ACQUIRE_IDTOKEN_SUCCESS',
  ACQUIRE_ACCESSTOKEN_SUCCESS = '@@auth/ACQUIRE_ACCESSTOKEN_SUCCESS',
  ACQUIRE_ACCESSTOKEN_FAILED = '@@auth/ACQUIRE_ACCESSTOKEN_FAILED',
}

export interface AuthState {
  accessToken?: string;
  idToken?: IdToken;
  user?: msal.Account;
  error?: any;
}

export interface SignInActionPayload {
  popup?: boolean;
  scopes: string[];
}

export interface SignInAction extends Action {
  type: typeof AuthTypes.SIGNIN;
  payload: SignInActionPayload;
}

export interface SignInSuccessAction extends Action {
  type: typeof AuthTypes.SINGIN_SUCCESS;
  payload: {
    user: msal.Account;
  };
}

export interface SignInFailedAction extends Action {
  type: typeof AuthTypes.SINGIN_FAILED;
  payload: {
    error: any;
  };
}

export interface SignOutAction extends Action {
  type: typeof AuthTypes.SIGNOUT;
}

export interface AcquireIdTokenSuccessAction extends Action {
  type: typeof AuthTypes.ACQUIRE_IDTOKEN_SUCCESS;
  payload: {
    idToken: IdToken;
  };
}

export interface AcquireAccessTokenSuccessAction extends Action {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS;
  payload: {
    accessToken: string;
    scopes: string[];
  };
}

export interface AcquireAccessTokenFailedAction extends Action {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED;
  payload: {
    error: any;
  };
}

export interface CallbackSuccessAction extends Action {
  type: typeof AuthTypes.CALLBACK_SUCCESS;
}

export type AuthActionsTypes =
  | SignInAction
  | SignInSuccessAction
  | SignInFailedAction
  | SignOutAction
  | AcquireIdTokenSuccessAction
  | AcquireAccessTokenSuccessAction
  | AcquireAccessTokenFailedAction
  | CallbackSuccessAction;
