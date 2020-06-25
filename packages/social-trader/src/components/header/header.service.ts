import { useAccountCurrency } from "hooks/account-currency.hook";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { headerSelector } from "reducers/header-reducer";
import { Dispatch } from "redux";
import { mobileMenuItems, topMenuItems } from "routes/menu";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const useMenuItems = () => {
  const showedMobileMenuItems = mobileMenuItems;
  const showedTopMenuItems = topMenuItems;
  return { showedMobileMenuItems, showedTopMenuItems };
};

export const useHeaderInfo = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const headerAccountCurrency = useAccountCurrency();
  useEffect(() => {
    if (isAuthenticated) dispatch(fetchProfileHeaderInfo);
    if (headerAccountCurrency) updateCurrency(headerAccountCurrency);
  }, [isAuthenticated, headerAccountCurrency]);
  return useSelector(headerSelector);
};

export const fetchProfileHeaderInfo = (dispatch: Dispatch) => {
  dispatch(fetchProfileHeaderInfoAction());
};
