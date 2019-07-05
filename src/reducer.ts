import { Reducer } from 'redux';
import { AuthActionsTypes, AuthState, AuthTypes } from './types';

const initialState: AuthState = {};

const reducer: Reducer<AuthState, AuthActionsTypes> = (state = initialState, action) => {
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
    case AuthTypes.ACQUIRE_ACCESSTOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    case AuthTypes.ACQUIRE_ACCESSTOKEN_FAILED:
      const newState = { ...state, error: action.payload.error };
      delete newState.accessToken;
      return newState;
    default:
      return state;
  }
};
export { reducer as authReducer };
