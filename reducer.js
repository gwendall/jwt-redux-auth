export default (
  state = {
    login: {},
    signup: {},
    user: {}
  },
  action
) => {
  switch (action.type) {
    /*
     * Signup methods
     *
     */
    case 'auth:signup:start':
      return Object.assign({}, state, {
        reqSignup: {
          ...state.reqSignup,
          pending: true,
          error: null
        }
      });
    case 'auth:signup:success':
      return Object.assign({}, state, {
        reqSignup: {
          ...state.reqSignup,
          pending: false,
          error: null
        }
      });
    case 'auth:signup:error':
      return Object.assign({}, state, {
        reqSignup: {
          ...state.reqSignup,
          pending: false,
          error: action.payload.message
        }
      });

    /*
     * Login methods
     *
     */
    case 'auth:login:start':
      return Object.assign({}, state, {
        reqLogin: {
          ...state.reqLogin,
          pending: true,
          error: null
        }
      });
    case 'auth:login:success':
      return Object.assign({}, state, {
        reqLogin: {
          ...state.reqLogin,
          pending: false,
          error: null
        },
        user: action.payload.user
      });
    case 'auth:login:error':
      return Object.assign({}, state, {
        reqLogin: {
          ...state.reqLogin,
          pending: false,
          error: action.payload.message
        }
      });

    /*
     * Other methods
     *
     */
    case 'auth:logout':
      return Object.assign({}, state, {
        user: {}
      });
  }
  return state;
};
