import { matchPath } from "react-router-dom";

const getParams = (pathname, route) => {
  const matchProfile = matchPath(pathname, {
    path: route
  });
  return (matchProfile && matchProfile.params) || {};
};

export default getParams;
