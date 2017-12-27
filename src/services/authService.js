import { jwt_decode } from 'jwt-decode'

const canParseToken = token => {
  try {
    jwt_decode(token);
    return true;
  }
  catch(e){
    return false;
  }
}

const decodeToken = token => {
  if (!canParseToken(token)) return false;
  return jwt_decode(token);
}

const isAuthenticated = token => {
  if (!canParseToken(token)) return false;
  const dateNow = new Date().getTime();
  const decodedToken = jwt_decode(token);
  return decodedToken.exp < dateNow;
}

export { decodeToken, isAuthenticated }