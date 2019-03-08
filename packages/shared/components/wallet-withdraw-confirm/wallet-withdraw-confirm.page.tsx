import * as qs from "qs";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import Page from "shared/components/page/page";

import WalletWithdrawConfirmContainer from "./wallet-withdraw-confirm-container";

export const WALLET_WITHDRAW_CONFIRM_ROUTE = `/wallet-withdraw-confirm`;

const WalletWithdrawConfirmPage: React.FC<
  { location: Location } & InjectedTranslateProps
> = ({ t, location }) => {
  const queryParams = qs.parse(location.search.slice(1));

  return (
    <Page title={t("wallet-withdraw.confirmation.page-title")}>
      <WalletWithdrawConfirmContainer queryParams={queryParams} />
    </Page>
  );
};

export default translate()(WalletWithdrawConfirmPage);
