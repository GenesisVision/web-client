import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalanceContainer from "./components/wallet-balance/wallet-balance-container";
import WalletTransactions from "./components/wallet-transactions/wallet-transactions";

export const WALLET_PAGE_ROUTE = "/wallet";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalanceContainer />
      <WalletTransactions />
    </Page>
  );
};

export default translate()(WalletPage);
