import { AuthActionsTypes, AuthState, AuthTypes } from './types';
/*  */
const initialState: AuthState = {};

export const msalReducer = (state: AuthState = initialState, action: AuthActionsTypes) => {
  switch (action.type) {
    case AuthTypes.SINGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case AuthTypes.SINGIN_FAILED:
      return {
        error: action.payload.error,
      };
    case AuthTypes.SIGNOUT:
      return {};
    case AuthTypes.ACQUIRE_IDTOKEN_SUCCESS:
      return {
        ...state,
        idToken: action.payload.idToken,
      };
    case AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED:
      return {
        ...state,
        accessToken: undefined,
      };
    default:
      return state;
  }
};
