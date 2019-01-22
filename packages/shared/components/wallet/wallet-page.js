import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalanceTotal from "./components/wallet-balance/wallet-balance-total";
import WalletInfo from "./components/wallet-total/wallet-info";

export const WALLET_PAGE_ROUTE = "/wallet";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalanceTotal />
      <WalletInfo />
    </Page>
  );
};

export default translate()(WalletPage);
