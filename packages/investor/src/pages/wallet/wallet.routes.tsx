import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router";
import WalletRoutesCommon from "shared/components/wallet/wallet.routes";
import { WALLET_TOTAL_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";
import { WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE } from "shared/components/wallet/wallet.routes";

import WalletCopytradingAccount from "./components/wallet-copytrading-account";

interface IWalletRoutesProps {}

const WalletRoutes: FunctionComponent<IWalletRoutesProps> = () => {
  return (
    <Switch>
      <Route
        path={WALLET_COPYTRADING_CURRENCY_PAGE_ROUTE}
        component={WalletCopytradingAccount}
      />
      <Route path={WALLET_TOTAL_PAGE_ROUTE} component={WalletRoutesCommon} />
    </Switch>
  );
};

export default WalletRoutes;
