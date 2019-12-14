import "components/details/details.scss";

import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  getAccountHistoryCounts,
  getOpenPositions,
  getTrades
} from "pages/accounts/account-details/services/account-details.service";
import ProgramDetailsHistorySection from "pages/programs/program-details/program-history-section/program-details-history-section";
import * as React from "react";
import { ASSET } from "shared/constants/constants";

import PerformanceData from "./account-details-description/performance-data";
import AccountDetailsStatisticSection from "./account-details-statistic-section/account-details-statistic-section";
import { AccountDetailsDataType } from "./account-details.types";
import {
  openPositionsTableSelector,
  tradesTableSelector
} from "./reducers/account-history.reducer";

const _AccountDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const tablesData = {
    openPositions: {
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    trades: { dataSelector: tradesTableSelector, getItems: getTrades }
  };
  const title = description.publicInfo.title;
  return (
    <Page title={title}>
      <DetailsDescriptionSection
        isOwnAsset={true}
        logo={description.brokerDetails.logo}
        title={title}
        id={description.id}
        currency={description.tradingAccountInfo.currency}
        asset={ASSET.FOLLOW}
        PerformanceData={() => <PerformanceData description={description} />}
      />
      <DetailsDivider />
      <AccountDetailsStatisticSection />
      <ProgramDetailsHistorySection
        haveDelay={false}
        getHistoryCounts={getAccountHistoryCounts}
        tablesData={tablesData}
        showCommissionRebateSometime={
          description.brokerDetails.showCommissionRebateSometime
        }
        isOwnProgram={true}
        showSwaps={description.brokerDetails.showSwaps}
        showTickets={description.brokerDetails.showTickets}
        programId={description.id}
        programCurrency={description.tradingAccountInfo.currency}
        title={title}
      />
    </Page>
  );
};

interface Props {
  data: AccountDetailsDataType;
}

const AccountDetailsContainer = withBlurLoader(
  React.memo(_AccountDetailsContainer)
);
export default AccountDetailsContainer;
