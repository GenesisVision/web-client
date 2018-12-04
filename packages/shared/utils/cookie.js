export const getCookie = cookieName => {
  const name = encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&");
  const regExp = new RegExp(
    `(?:(?:^|.*;)\\s*${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  const cookie = document.cookie.replace(regExp, "$1");
  return decodeURIComponent(cookie) || null;
};
