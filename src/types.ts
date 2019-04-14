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

export interface IAuthState {
  accessToken?: string;
  idToken?: string;
  user?: msal.User;
}

export interface ISignInActionPayload {
  popup?: boolean;
  scopes: string[];
}

export interface ISignInAction {
  type: typeof AuthTypes.SIGNIN;
  payload: ISignInActionPayload;
}

export interface ISignInSuccessAction {
  type: typeof AuthTypes.SINGIN_SUCCESS;
  payload: {
    user: msal.User;
  };
}

export interface ISignInFailedAction {
  type: typeof AuthTypes.SINGIN_FAILED;
  payload: {
    error: any;
  };
}

export interface ISignOutAtion {
  type: typeof AuthTypes.SIGNOUT;
}

export interface IAcquireIdTokenSucceessAction {
  type: typeof AuthTypes.ACQUIRE_IDTOKEN_SUCCESS;
  payload: {
    idToken: string;
  };
}

export interface IAcquireAccessTokenSuccessAction {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS;
  payload: {
    accessToken: string;
    scopes: string[];
  };
}

export interface IAcquireAccessTokenFailedAction {
  type: typeof AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED;
  payload: {
    error: any;
  };
}

export interface ICallbackSuccessAction {
  type: typeof AuthTypes.CALLBACK_SUCCESS;
}

export type AuthActionsTypes =
  | ISignInAction
  | ISignInSuccessAction
  | ISignInFailedAction
  | ISignOutAtion
  | IAcquireIdTokenSucceessAction
  | IAcquireAccessTokenSuccessAction
  | IAcquireAccessTokenFailedAction
  | ICallbackSuccessAction;
