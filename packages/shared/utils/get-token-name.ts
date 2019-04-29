import { ROLE_ENV } from "shared/constants/constants";

export const getTokenName = () => {
  const platform: string = ROLE_ENV || "";
  return `gv${platform.substr(0, 1).toUpperCase()}${platform.substr(1)}Token`;
};
