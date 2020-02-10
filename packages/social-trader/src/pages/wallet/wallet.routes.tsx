// Remove it file after fix https://github.com/faceyspacey/extract-css-chunks-webpack-plugin/issues/222
import * as React from "react";
import { Route, Switch } from "react-router-dom";

import WalletTotalContainer from "./components/wallet-total-container";

export const WALLET_TOTAL_PAGE_NAME = "wallet";
export const WALLET_TOTAL_PAGE_ROUTE = `/${WALLET_TOTAL_PAGE_NAME}`;

interface DispatchProps {
  fetchWallets(): void;
}

const _WalletRoutes: React.FC<DispatchProps> = () => {
  return (
    <Switch>
      <Route
        exact
        path={WALLET_TOTAL_PAGE_ROUTE}
        component={WalletTotalContainer}
      />
    </Switch>
  );
};
