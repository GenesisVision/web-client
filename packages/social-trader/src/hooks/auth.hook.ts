import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

export const useAuth = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  return { isAuthenticated };
};
