import { Action } from 'redux';
import { AUTH_SIGN_IN } from './constants';
import { IAuthState } from './interfaces';

const initialState: IAuthState = {};

export const authReducer = (state: IAuthState = initialState, action: Action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
    default:
      return state;
  }
};
