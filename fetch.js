import { getJWToken } from './index.js';

export default ({ endpoint }) => (
  {
    pathname,
    query,
    method
  }: { pathname: string, query?: Object, method?: 'GET' | 'POST' | 'PUT' },
  body?: Object
) =>
  fetch(endpoint + pathname, {
    body: body && JSON.stringify(body),
    method: method || 'GET',
    headers: {
      ...(getJWToken()
        ? {
            Authorization: `Bearer ${getJWToken()}`
          }
        : {}),
      ...(body
        ? {
            'Content-type': 'application/json'
          }
        : {})
    }
  }).then(res => res.json());
