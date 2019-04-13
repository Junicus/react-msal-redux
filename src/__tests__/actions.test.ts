import { login, logout } from '../index';
import { AuthTypes } from '../types';

test('login', () => {
  expect(login(['1', '2'], true)).toMatchObject({
    payload: {
      popup: true,
      scopes: ['1', '2'],
    },
    type: AuthTypes.SIGNIN,
  });
});

test('logout', () => {
  expect(logout()).toMatchObject({
    type: AuthTypes.SIGNOUT,
  });
});
