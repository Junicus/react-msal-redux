import { Account } from 'msal';
import { login, logout } from './actions';
import { authMiddleware } from './authMiddleware';
import { authReducer } from './reducer';

export { authMiddleware, authReducer, login, logout, Account };
