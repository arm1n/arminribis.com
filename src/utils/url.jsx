export const queryString = (key, dflt = null) => {
  const decode = (string) => decodeURIComponent(string.replace(/\+/g, ' '));
  const query  = window.location.search.substring(1);
  const search = /([^&=]+)=?([^&]*)/g;
  const params = {};

  let match;
  while ((match = search.exec(query))) {
    let [, key, val] = match;

    key = decode(key);
    val = decode(val);

    params[key] = val;
  }

  if (key !== undefined) {
    if (key in params) {
      return params[key];
    } else {
      return dflt;
    }
  }

  return params;
}

export const buildQuery = (key, value) => {
  const queryParams = queryString();
  queryParams[key] = value;

  let query = '';
  for (let key in queryParams) {
    const value = queryParams[key];
    const prefix = query ? '&' : '?';

    if (value) {
      query += `${prefix}${key}=${value}`;
    }
  }

  return query;
};