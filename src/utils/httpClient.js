import { AUTH_TOKEN } from '../utils/constants'

const callApi = (url, options, authenticated) => {
  let token = localStorage.getItem(AUTH_TOKEN);
  let headers = {
    'Accept': 'application/json',
  };

  options = {
    ...options,
    headers: { ...headers, ...options.headers }
  }

  if (authenticated) {
    if(token === null){
      throw new Error('Token is absent');
    };

    options = {
      ...options,
      headers: { ...headers, ...{ 'Authorization': `Bearer ${token}` } }
    }
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

const parseJSON = response => {
  return response.json();
}

const httpClient = {
  get: (url, data = null, authenticated = false) => {
    if (data) {
      url = url + `?q=${encodeURIComponent(data)}`;
    }

    return callApi(url, {}, authenticated);
  },
  post: (url, data, authenticated = false) => {
    const options = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    return callApi(url, options, authenticated);
  }
}

export default httpClient;
