import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalanceTotal from "./components/wallet-balance/wallet-balance-total";
import WalletContainerTotal from "./components/wallet-container/wallet-container-total";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";

const WalletTotalPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalanceTotal />
      <WalletContainerTotal />
    </Page>
  );
};

export default translate()(WalletTotalPage);
