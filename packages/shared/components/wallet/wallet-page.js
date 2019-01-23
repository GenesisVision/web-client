import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import WalletCurrency from "shared/components/wallet/components/wallet-currency";

const WalletPage = ({ t, match }) => {
  const { currency } = match.params;
  return (
    <Page title={t("wallet-page.title")}>
      <WalletCurrency currency={currency} />
    </Page>
  );
};

export default translate()(WalletPage);
