import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";
import WalletTotal from "shared/components/wallet/components/wallet-total";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";

const WalletTotalPage = ({ t }) => {
  return <WalletTotal />;
};

export default translate()(WalletTotalPage);
