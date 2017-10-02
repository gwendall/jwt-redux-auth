import { TOKEN_KEY } from './settings';
import jwtDecode from 'jwt-decode';

export const getJWToken = () =>
  localStorage.getItem(TOKEN_KEY) && localStorage.getItem(TOKEN_KEY) !== 'null'
    ? localStorage.getItem(TOKEN_KEY)
    : null;

export const getUserFromLocalStorage = transform => {
  const token = localStorage.getItem(TOKEN_KEY);
  let user = {};
  try {
    user = transform ? transform(jwtDecode(token)) : jwtDecode(token);
  } catch (err) {}
  return user;
};
