import { AUTH_TOKEN } from '../utils/constants'
import * as jwt_decode from 'jwt-decode'
import { apiUrl } from '../utils/constants/apiUrl'

const shouldRefreshToken = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token === null) return false;

  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode(token);
  return decodedToken.exp - dateNowSec < 60;
}

const refreshToken = async () => {
  const newToken = httpClient.post(apiUrl.refreshToken, {}, true);
  localStorage.setItem(AUTH_TOKEN, newToken);
}

const callApi = (url, options, authenticated) => {
  let headers = {
    'Accept': 'application/json',
  };

  options = {
    ...options,
    headers: { ...headers, ...options.headers }
  }

  if (authenticated) {
    const token = localStorage.getItem(AUTH_TOKEN);

    options = {
      ...options,
      headers: { ...headers, ...{ 'Authorization': `Bearer ${token}` } }
    }
  }

  return fetch(url, options)
    .then(parseJSON)
    .then(handleResponse)
}

const handleResponse = (responseWithData) => {
  if (responseWithData.response.ok) {
    return responseWithData.data;
  }
  else {
    const error = new Error(responseWithData.data);
    error.response = responseWithData.response;
    throw error;
  }
}

const parseJSON = (response) => {
  return response.text()
    .then((text) => {
      let data = '';
      try {
        data = JSON.parse(text)
      }
      catch (ex) {
        data = text;
      }

      return {
        response,
        data
      }
    })
}

const httpClient = {
  get: async (url, data = null, authenticated = false) => {
    if (authenticated && shouldRefreshToken()) {
      await refreshToken();
    }

    if (data) {
      url = url + `?q=${encodeURIComponent(data)}`;
    }

    return callApi(url, {}, authenticated);
  },
  post: async (url, data, authenticated = false) => {
    if (authenticated && shouldRefreshToken()) {
      await refreshToken();
    }

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
