import { useAccountCurrency } from "hooks/account-currency.hook";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import {
  betaTesterSelector,
  headerSelector,
  isSocialBetaTester
} from "reducers/header-reducer";
import { Dispatch } from "redux";
import { filterBeta, mobileMenuItems, topMenuItems } from "routes/menu";

import { fetchProfileHeaderInfoAction } from "./actions/header-actions";

export const useMenuItems = () => {
  const betaTester = useSelector(betaTesterSelector);
  const isBetaTester = isSocialBetaTester(betaTester);
  const showedMobileMenuItems = isBetaTester
    ? mobileMenuItems
    : mobileMenuItems.filter(filterBeta);
  const showedTopMenuItems = isBetaTester
    ? topMenuItems
    : topMenuItems.filter(filterBeta);
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
