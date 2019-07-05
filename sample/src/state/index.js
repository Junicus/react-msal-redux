import { combineReducers } from 'redux';
import { authReducer } from '@junicus_/react-msal-redux';

export const rootReducer = combineReducers({
  auth: authReducer,
});
