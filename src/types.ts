import * as msal from 'msal';

export enum AuthTypes {
  SIGNIN = '@auth/SIGNIN',
  SINGIN_SUCCESS = '@auth/SINGNIN_SUCCESS',
  SINGIN_FAILED = '@auth/SINGNIN_FAILED',

  SIGNOUT = '@auth/SIGNOUT',

  CALLBACK_SUCCESS = '@auth/CALLBACK_SUCCESS',

  ACQUIRE_IDTOKEN_SUCCESS = '@auth/ACQUIRE_IDTOKEN_SUCCESS',

  ACQUIRE_ACCESSTOKEN_SUCCESS = '@auth/ACQUIRE_ACCESSTOKEN_SUCCESS',
  ACQUIRE_ACCESSTOKEN_FAILED = '@auth/ACQUIRE_ACCESSTOKEN_FAILED',
}

export interface MsalOptions {
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

export interface AuthState {
  accessToken?: string;
  idToken?: string;
  user?: msal.User;
}

export interface SignInActionPayload {
  popup?: boolean;
  scopes: string[];
}

export interface SignInAction {
  type: typeof AuthTypes.SIGNIN;
  payload: SignInActionPayload;
}

export interface SignInSuccessAction {
  type: typeof AuthTypes.SINGIN_SUCCESS;
  payload: {
    user: msal.User;
  };
}

export interface SignInFailedAction {
  type: typeof AuthTypes.SINGIN_FAILED;
  payload: {
    error: any;
  };
}

export interface SignOutAction {
  type: typeof AuthTypes.SIGNOUT;
}

export interface AcquireIdTokenSuccessAction {
  type: typeof AuthTypes.ACQUIRE_IDTOKEN_SUCCESS;
  payload: {
    idToken: string;
  };
}

export interface AcquireAccessTokenSuccessAction {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS;
  payload: {
    accessToken: string;
    scopes: string[];
  };
}

export interface AcquireAccessTokenFailedAction {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED;
  payload: {
    error: any;
  };
}

export interface CallbackSuccessAction {
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
