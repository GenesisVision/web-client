import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletBalance from "./components/wallet-balance/wallet-balance";
import WalletContainer from "./components/wallet-container/wallet-container";

const WalletPage = ({ t, match }) => {
  const { currency } = match.params;
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalance />
      <WalletContainer />
    </Page>
  );
};

export default translate()(WalletPage);
