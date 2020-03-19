import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsDivider } from "components/details/details-divider.block";
import { DETAILS_TYPE } from "components/details/details.types";
import Page from "components/page/page";
import { ASSET, CREATE_ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import dynamic from "next/dynamic";
import AccountDetailsSubscriptions from "pages/accounts/account-details/account-details-subscriptions/account-details-subscriptions";
import {
  dispatchAccountDescription,
  getAccountHistoryCounts,
  getOpenPositions,
  getTrades
} from "pages/accounts/account-details/services/account-details.service";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import ProgramDetailsHistorySection, {
  TProgramTablesData
} from "pages/invest/programs/program-details/program-history-section/program-details-history-section";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import PerformanceData from "./account-details-description/performance-data";
import AccountDetailsStatisticSection from "./account-details-statistic-section/account-details-statistic-section";
import { AccountDetailsDataType } from "./account-details.types";
import {
  openPositionsSelector,
  openPositionsTableSelector,
  tradesSelector,
  tradesTableSelector
} from "./reducers/account-history.reducer";

const InvestmentAccountControls = dynamic(() =>
  import("pages/accounts/account-details/investment-account-controls")
);

const _AccountDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  const tablesData: TProgramTablesData = {
    openPositions: {
      itemSelector: openPositionsSelector,
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    trades: {
      itemSelector: tradesSelector,
      dataSelector: tradesTableSelector,
      getItems: getTrades
    }
  };
  const title = description.publicInfo.title;

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchAccountDescription(description.id)());
  }, [description.id]);
  return (
    <Page title={title}>
      <DetailsDescriptionSection
        detailsType={DETAILS_TYPE.ASSET}
        isOwnAsset={true}
        logo={description.brokerDetails.logo}
        title={title}
        id={description.id}
        currency={description.tradingAccountInfo.currency}
        asset={ASSET.FOLLOW}
        PerformanceData={() => <PerformanceData description={description} />}
        Controls={() =>
          description.ownerActions.canTransferMoney ? (
            <InvestmentAccountControls
              transferableItem={mapProgramFollowToTransferItemType(description)}
              accountType={description.tradingAccountInfo.type}
              onApply={handleDispatchDescription}
            />
          ) : null
        }
      />
      <DetailsDivider />
      {!!description.tradingAccountInfo.subscriptions && (
        <AccountDetailsSubscriptions
          id={description.id}
          assetCurrency={description.tradingAccountInfo.currency}
        />
      )}
      <AccountDetailsStatisticSection />
      <ProgramDetailsHistorySection
        assetType={CREATE_ASSET.ACCOUNT}
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

const AccountDetailsContainer = React.memo(Crashable(_AccountDetailsContainer));
export default AccountDetailsContainer;
