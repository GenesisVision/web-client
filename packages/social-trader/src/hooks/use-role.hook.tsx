import { ROLE, ROLE_ENV } from "shared/constants/constants";

const useRole = () => {
  return ROLE_ENV.toLowerCase() as ROLE;
};

export default useRole;
