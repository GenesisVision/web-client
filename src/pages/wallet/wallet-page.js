import Page from "components/page/page";
import React from "react";
import { translate } from "react-i18next";

import WalletBalanceContainer from "./components/wallet-balance/wallet-balance-container";

export const WALLET_PAGE_ROUTE = "/wallet";

const WalletPage = ({ t }) => {
  return (
    <Page title={t("wallet.title")}>
      <WalletBalanceContainer />
    </Page>
  );
};

export default translate()(WalletPage);
