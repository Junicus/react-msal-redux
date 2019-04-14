import { combineReducers } from 'redux';
import { msalReducer } from '@junicus_/react-msal-redux';

export const rootReducer = combineReducers({
  auth: msalReducer,
});
