import { useAccountCurrency } from "hooks/account-currency.hook";
import useDispatch from "hooks/cache-dispatch.hook";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import {
  betaTesterSelector,
  headerSelector,
  isTerminalBetaTester
} from "reducers/header-reducer";
import {
  filterMenuForBeta,
  getMobileMenuItems,
  getTopMenuItems
} from "routes/menu";

import { ProfileHeaderInfoAction } from "./actions/header-actions";

export const useMenuItems = () => {
  const betaTester = useSelector(betaTesterSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isBetaTester = isTerminalBetaTester(betaTester);
  const mobileMenuItems = getMobileMenuItems(isAuthenticated);
  const showedMobileMenuItems = isBetaTester
    ? mobileMenuItems
    : filterMenuForBeta(mobileMenuItems);
  const topMenuItems = getTopMenuItems(isAuthenticated);
  const showedTopMenuItems = isBetaTester
    ? topMenuItems
    : filterMenuForBeta(topMenuItems);
  return { showedMobileMenuItems, showedTopMenuItems };
};

export const useHeaderInfo = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const headerAccountCurrency = useAccountCurrency();
  useEffect(() => {
    if (isAuthenticated) dispatch(ProfileHeaderInfoAction());
    if (headerAccountCurrency) updateCurrency(headerAccountCurrency);
  }, [isAuthenticated, headerAccountCurrency]);
  return useSelector(headerSelector);
};
