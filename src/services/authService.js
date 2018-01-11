import { AUTH_TOKEN } from '../utils/constants'
import httpClient from '../utils/httpClient'

const jwt_decode = require('jwt-decode')

const canParseToken = token => {
  try {
    jwt_decode(token);
    return true;
  }
  catch (e) {
    return false;
  }
}

// eslint-disable-next-line
const decodeToken = token => {
  if (!canParseToken(token)) return false;
  return jwt_decode(token);
}

const isAuthenticated = () => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!canParseToken(token)) return false;
  const dateNow = new Date().getTime();
  const decodedToken = jwt_decode(token);
  return decodedToken.exp < dateNow;
}

const getUserName = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated()
    ? decodeToken(token).username
    : '';
}

const login = async (user) => {
  try {
    const data = await httpClient.post('/api/login', user);
    localStorage.setItem(AUTH_TOKEN, data.token);
    return data;
  } catch (e) {
    throw new Error('Login Error');
  }
}

const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
}

const register = async (user) => {
  try {
    const data = await httpClient.post('/api/login', user);
    localStorage.setItem(AUTH_TOKEN, data.token);
    return data;
  } catch (e) {
    throw new Error('Register Error');
  }
}

const authService = { isAuthenticated, getUserName, login, logout, register }
export default authService
