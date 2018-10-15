import Page from "components/page/page";
import qs from "qs";
import React from "react";
import { translate } from "react-i18next";

import WalletWithdrawConfirmContainer from "./wallet-withdraw-confirm-container";

export const WALLET_WITHDRAW_CONFIRM_ROUTE = `/wallet-withdraw-confirm`;

const WalletWithdrawConfirmPage = ({ t, location }) => {
  const queryParams = qs.parse(location.search.slice(1));

  return (
    <Page title={t("wallet-withdraw.confirmation.page-title")}>
      <WalletWithdrawConfirmContainer queryParams={queryParams} />
    </Page>
  );
};

export default translate()(WalletWithdrawConfirmPage);
