import authActions from "actions/auth-actions";
import { getHeader } from "components/header/services/header.service";
import { Push } from "components/link/link";
import { useDispatch } from "react-redux";
import { DASHBOARD_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";
import { setAccountCurrency } from "utils/account-currency";

export const useAuthMiddleware = () => {
  const dispatch = useDispatch();

  const clearStorageMiddleware = () => {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined")
      localStorage.clear();
  };
  const saveAccountCurrencyMiddleware = (res: any) => {
    if (res)
      getHeader().then(({ platformCurrency }) => {
        setAccountCurrency(platformCurrency);
      });
  };
  const storeTokenMiddleware = (value: string) => {
    if (!value) return;
    authService.storeToken(value);
    dispatch(authActions.updateTokenAction(true));
    Push(DASHBOARD_ROUTE);
  };

  return {
    clearStorageMiddleware,
    saveAccountCurrencyMiddleware,
    storeTokenMiddleware
  };
};
