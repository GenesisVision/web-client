import NotFoundPage from "components/not-found/not-found";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Route, Switch } from "react-router-dom";
import { currencySelector } from "reducers/account-settings-reducer";
import { composeUrl } from "utils/compose-url";

import WalletCurrencyContainer from "./components/wallet-currency.container";
import WalletTotalContainer from "./components/wallet-total-container";
import { fetchWallets } from "./services/wallet.services";

export const WALLET_TOTAL_PAGE_NAME = "wallet";
export const WALLET_TOTAL_PAGE_ROUTE = `/${WALLET_TOTAL_PAGE_NAME}`;
export const CURRENCY_SLUG = ":currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/${CURRENCY_SLUG}`;

export const WALLET_CURRENCY_FOLDER_ROUTE = `${WALLET_TOTAL_PAGE_ROUTE}/[id]`;

export const composeWalletCurrencyUrl = composeUrl(
  WALLET_CURRENCY_PAGE_ROUTE,
  CURRENCY_SLUG
);

interface DispatchProps {
  fetchWallets(): void;
}

interface RouteProps {}

export interface WalletRouteProps extends RouteComponentProps<RouteProps> {}

const _WalletRoutes: React.FC<DispatchProps> = () => {
  const currency = useSelector(currencySelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWallets(currency));
  }, [currency]);
  return (
    <Switch>
      <Route
        exact
        path={WALLET_TOTAL_PAGE_ROUTE}
        component={WalletTotalContainer}
      />
      <Route
        path={WALLET_CURRENCY_PAGE_ROUTE}
        component={WalletCurrencyContainer}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const WalletRoutes = React.memo(_WalletRoutes);
export default WalletRoutes;
