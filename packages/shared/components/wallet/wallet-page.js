import React from "react";
import { translate } from "react-i18next";
import Page from "shared/components/page/page";

import { INVESTOR_EVENT_TYPE_FILTER_VALUES } from "../table/components/filtering/event-type-filter/event-type-filter.constants";
import WalletBalance from "./components/wallet-balance/wallet-balance";
import WalletContainer from "./components/wallet-container/wallet-container";

const WalletPage = ({ t, match }) => {
  const { currency } = match.params;
  return (
    <Page title={t("wallet-page.title")}>
      <WalletBalance />
      <WalletContainer
        eventTypeFilterValues={INVESTOR_EVENT_TYPE_FILTER_VALUES}
      />
    </Page>
  );
};

export default translate()(WalletPage);
