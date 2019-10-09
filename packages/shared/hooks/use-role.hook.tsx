import { ROLE, ROLE_ENV } from "shared/constants/constants";

const useRole = () => {
  return (ROLE_ENV || ROLE.INVESTOR).toLowerCase() as ROLE;
};

export default useRole;
