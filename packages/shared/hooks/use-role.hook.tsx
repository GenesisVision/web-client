import { useSelector } from "react-redux";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { roleSelector } from "shared/reducers/header-reducer";

const useRole = () => {
  const role = useSelector(roleSelector);
  return (role || ROLE_ENV || ROLE.INVESTOR).toLowerCase() as ROLE;
};

export default useRole;
