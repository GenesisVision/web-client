import { AUTH_TOKEN } from '../utils/constants'
import { apiUrl } from '../utils/constants/apiUrl'
import httpClient from '../utils/httpClient'
import * as jwt_decode from 'jwt-decode'

const canParseToken = token => {
  try {
    jwt_decode(token);
    return true;
  }
  catch (e) {
    return false;
  }
}

const decodeToken = token => {
  if (!canParseToken(token)) return false;
  return jwt_decode(token);
}

const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!canParseToken(token)) return false;
  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode(token);
  return decodedToken.exp < dateNowSec;
}

const getUserName = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated()
    ? decodeToken(token).unique_name
    : '';
}

const login = async (user) => {
  const data = await httpClient.post(apiUrl.login, user);
  localStorage.setItem(AUTH_TOKEN, data);
  return data;
}

const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
}

const register = async (user) => {
  try {
    const data = await httpClient.post(apiUrl.register, user);
    localStorage.setItem(AUTH_TOKEN, data.token);
    return data;
  } catch (e) {
    throw new Error('Register Error');
  }
}

const authService = { isAuthenticated, getUserName, login, logout, register }
export default authService
