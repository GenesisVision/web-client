import { Route } from "react-router-dom";
import React from "react";

import WalletContainer from "./components/wallet-container/wallet-container";

import { WALLET_ROUTE } from "./wallet.constants";

const WalletRoutes = () => (
  <Route path={WALLET_ROUTE} component={WalletContainer} />
);

export default WalletRoutes;
