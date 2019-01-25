import React from "react";
import { translate } from "react-i18next";
import WalletCurrency from "shared/components/wallet/components/wallet-currency";

const WalletPage = ({ t, match }) => {
  const { currency } = match.params;
  return <WalletCurrency currency={currency} />;
};

export default translate()(WalletPage);
