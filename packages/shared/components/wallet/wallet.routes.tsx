import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "shared/components/not-found/not-found.routes";
import replaceParams from "shared/utils/replace-params";

import WalletCurrencyPage from "./wallet-page";
import WalletTotalPage from "./wallet-total-page";

export const WALLET_PAGE_ROUTE = "/wallet";
export const CURRENCY_SLUG = "currency";
export const WALLET_CURRENCY_PAGE_ROUTE = `${WALLET_PAGE_ROUTE}/:${CURRENCY_SLUG}`;

export const composeWalletCurrencytUrl = (url: string): string =>
  replaceParams(WALLET_CURRENCY_PAGE_ROUTE, {
    [`:${CURRENCY_SLUG}`]: url
  });

const WalletRoutes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path={WALLET_PAGE_ROUTE} component={WalletTotalPage} />
      <Route path={WALLET_CURRENCY_PAGE_ROUTE} component={WalletCurrencyPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default WalletRoutes;
