import { matchPath } from "react-router-dom";

const getParams = (
  pathname: string,
  route: string | string[]
): { [keys: string]: any } => {
  const matchProfile = matchPath(pathname, {
    path: route
  });
  return (matchProfile && matchProfile.params) || {};
};

export default getParams;
