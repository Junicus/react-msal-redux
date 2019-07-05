import { Account } from 'msal';
import { authMiddleware, login, logout } from './authMiddleware';
import { authReducer } from './reducer';

export { authMiddleware, authReducer, login, logout, Account };
