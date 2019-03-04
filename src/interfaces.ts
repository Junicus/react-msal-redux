import * as msal from 'msal';
import keys from './constants';

export interface IAuthState {
  accessToken?: string;
  idToken?: string;
  user?: msal.User;
}

export interface ISignInActionPayload {
  popup?: boolean;
  scopes?: string[];
}

export interface IMsalOptions {
  validateAuthority?: boolean;
  cacheLocation?: string;
  redirectUri?: string | (() => string);
  postLogoutRedirectUri?: string | (() => string);
  logger?: msal.Logger;
  loadFrameTimeout?: number;
  navigateToLoginRequestUrl?: boolean;
  state?: string;
  isAngular?: boolean;
  unprotectedResources?: string[];
  protectedResourceMap?: Map<string, string[]>;
  storeAuthStateInCookie?: boolean;
}

export interface ISignInInProgressAction {
  readonly type: keys.SINGIN_INPROGRESS;
}
export interface ISignInSuccessAction {
  readonly type: keys.SINGIN_SUCCESS;
}
export interface ISignInFailedAction {
  readonly type: keys.SINGIN_FAILED;
  readonly payload: {
    readonly error: Error;
  };
}

export interface ICallbackSuccessAction {
  readonly type: keys.CALLBACK_SUCCESS;
}
export interface IAcquireIdTokenSuccessAction {
  readonly type: keys.ACQUIRE_IDTOKEN_SUCCESS;
}

export interface IAcquireAccessTokenInProgressAction {
  readonly type: keys.ACQUIRE_ACCESSTOKEN_INPROGRESS
}