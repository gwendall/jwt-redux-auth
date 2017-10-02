import jwtDecode from 'jwt-decode';
import fetch2 from './fetch';
import { parseUserFromJWT } from './helpers';
import { TOKEN_KEY } from './settings';

export default ({ endpoint, transformJWT = o => o }) => dispatch => ({
  signup: ({ firstName, lastName, email }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await fetch2({ endpoint })(
          { pathname: 'auth/signup', method: 'POST' },
          {
            username: email,
            firstName,
            lastName
          }
        );
        // Somehow the fetch promise doesn't return an error for 401 statuses
        // We should add a middleware to fetch : .then((data) => data.ok ? data : throw Error(data.error));
        // if (data.ok) {
        if (!data.status || data.status === 200) {
          dispatch({
            type: 'auth:signup:success'
          });
          resolve(true);
        } else {
          dispatch({
            type: 'auth:signup:error',
            payload: { message: data.error }
          });
          reject(data);
        }
      } catch (data) {
        dispatch({
          type: 'auth:signup:error',
          payload: { message: data.error }
        });
        reject(data);
      }
    }),

  updatePassword: ({ email, password, token }) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await fetch2({ endpoint })(
          { pathname: 'auth/validate', method: 'POST' },
          {
            user: email,
            key: token,
            password
          }
        );
        console.log('Updating password.', data);
        if (!data.status || data.status === 200) {
          localStorage.setItem(TOKEN_KEY, data.token);
          const user = transformJWT(jwtDecode(data.token));
          dispatch({
            type: 'auth:update_password:success',
            payload: { user }
          });
          resolve(user);
        } else {
          dispatch({
            type: 'auth:update_password:error',
            payload: { message: data.error }
          });
          reject(data);
        }
      } catch (data) {
        dispatch({
          type: 'auth:update_password:error',
          payload: { message: data.error }
        });
        reject(data);
      }
    }),

  loginWithPassword: ({ email, password }) =>
    new Promise(async (resolve, reject) => {
      dispatch({ type: 'auth:login:start' });
      try {
        const data = await fetch2({ endpoint })(
          { pathname: 'auth/login', method: 'POST' },
          {
            username: email,
            password
          }
        );
        if (!data.status || data.status === 200) {
          localStorage.setItem(TOKEN_KEY, data.token);
          const user = transformJWT(jwtDecode(data.token));
          dispatch({
            type: 'auth:login:success',
            payload: { user }
          });
          resolve(user);
        } else {
          dispatch({
            type: 'auth:login:error',
            payload: { message: data.error }
          });
          reject(data);
        }
      } catch (data) {
        dispatch({
          type: 'auth:login:error',
          payload: { message: data.error }
        });
        reject(data);
      }
    }),

  logout: async () => {
    localStorage.setItem(TOKEN_KEY, null);
    dispatch({
      type: 'auth:logout'
    });
  }
});
