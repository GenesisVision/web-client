import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalance from "./components/wallet-balance/wallet-balance";
import WalletContainer from "./components/wallet-container/wallet-container";

export const WALLET_PAGE_ROUTE = "/wallet-1";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalance />
      <WalletContainer />
    </Page>
  );
};

export default translate()(WalletPage);
