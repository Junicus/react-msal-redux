import { User } from 'msal';
import { login, logout } from './actions';
import { msalMiddleware } from './msalMiddleware';
import { msalReducer } from './reducer';
import { AuthState, MsalOptions, MsalReducer } from './types';

export { login, logout, msalMiddleware, msalReducer, User, MsalOptions, MsalReducer, AuthState };
