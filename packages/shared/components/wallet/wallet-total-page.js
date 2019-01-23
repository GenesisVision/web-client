import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalanceTotal from "./components/wallet-balance/wallet-balance-total";
import WalletContainerTotal from "./components/wallet-container/wallet-container-total";

export const WALLET_TOTAL_PAGE_ROUTE = "/wallet";

const WalletTotalPage = ({ t }) => {
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalanceTotal />
      <WalletContainerTotal eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}/>
    </Page>
  );
};

export default translate()(WalletTotalPage);
