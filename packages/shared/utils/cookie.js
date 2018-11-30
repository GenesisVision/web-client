export const getCookie = cookieName => {
  const regExp = new RegExp(
    `(?:(?:^|.*;)\\s*${cookieName}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  return document.cookie.replace(regExp, "$1") || null;
};
