import { matchPath } from "react-router-dom";

const getParams = (pathname: string, route: string | string[]): object => {
  const matchProfile = matchPath(pathname, {
    path: route
  });
  return (matchProfile && matchProfile.params) || {};
};

export default getParams;
