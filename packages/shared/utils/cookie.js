export const getCookie = cookieName => {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const valuesArray = decodedCookie.split(";");

  for (let i = 0; i < valuesArray.length; i++) {
    let value = valuesArray[i].trim();
    if (value.indexOf(name) === 0) {
      return value.substring(name.length, value.length);
    }
  }
  return "";
};
