import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalance from "./components/wallet-balance/wallet-balance";
import WalletInfo from "./components/wallet-info/wallet-info";

export const WALLET_PAGE_ROUTE = "/wallet-1";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalance />
      <WalletInfo />
    </Page>
  );
};

export default translate()(WalletPage);
