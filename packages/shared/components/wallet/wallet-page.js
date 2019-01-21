import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalanceContainer from "./components/wallet-balance/wallet-balance-container";
import WalletsContainer from "./components/wallet-container/wallet-container";

export const WALLET_PAGE_ROUTE = "/wallet";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalanceContainer />
      <WalletsContainer />
    </Page>
  );
};

export default translate()(WalletPage);
