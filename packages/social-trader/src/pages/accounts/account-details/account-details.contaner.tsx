import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { Row } from "components/row/row";
import { ASSET, TRADE_ASSET_TYPE } from "constants/constants";
import Crashable from "decorators/crashable";
import dynamic from "next/dynamic";
import AccountDetailsSubscriptions from "pages/accounts/account-details/account-details-subscriptions/account-details-subscriptions";
import {
  dispatchAccountDescription,
  getAccountHistoryCounts,
  getOpenPositions,
  getTrades,
  getTradingLog
} from "pages/accounts/account-details/services/account-details.service";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import ProgramDetailsHistorySection, {
  TProgramTablesData
} from "pages/invest/programs/program-details/program-history-section/program-details-history-section";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import PerformanceData from "./account-details-description/performance-data";
import AccountDetailsStatisticSection from "./account-details-statistic-section/account-details-statistic-section";
import { AccountDetailsDataType } from "./account-details.types";
import {
  openPositionsSelector,
  openPositionsTableSelector,
  tradesSelector,
  tradesTableSelector,
  tradingLogSelector,
  tradingLogTableSelector
} from "./reducers/account-history.reducer";

const InvestmentAccountControls = dynamic(() =>
  import("pages/accounts/account-details/investment-account-controls")
);

const _AccountDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  const tablesData: TProgramTablesData = useMemo(
    () => ({
      tradingLog: {
        itemSelector: tradingLogSelector,
        dataSelector: tradingLogTableSelector,
        getItems: getTradingLog
      },
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
    }),
    []
  );
  const title = description.publicInfo.title;

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchAccountDescription(description.id)());
  }, [description.id]);

  const renderPerformanceData = useCallback(
    () => <PerformanceData description={description} />,
    [description]
  );

  const renderControls = useCallback(
    () =>
      description?.ownerActions?.canTransferMoney ? (
        <InvestmentAccountControls
          id={description.id}
          balances={description.tradingAccountInfo.balances}
          transferableItem={mapProgramFollowToTransferItemType(description)}
          accountType={description.tradingAccountInfo.type}
          onApply={handleDispatchDescription}
        />
      ) : null,
    [description, handleDispatchDescription]
  );

  return (
    <Page title={title}>
      <DetailsDescriptionSection
        isOwnAsset={true}
        logo={description.brokerDetails.logoUrl}
        title={title}
        id={description.id}
        currency={description.tradingAccountInfo.currency}
        asset={ASSET.FOLLOW}
        PerformanceData={renderPerformanceData}
        Controls={renderControls}
      />
      <DetailsDivider />
      {!!description.tradingAccountInfo.subscriptions && (
        <AccountDetailsSubscriptions
          id={description.id}
          assetCurrency={description.tradingAccountInfo.currency}
        />
      )}
      <Row onlyOffset>
        <AccountDetailsStatisticSection />
      </Row>
      <ProgramDetailsHistorySection
        isFollower={description.tradingAccountInfo.showTradingLog}
        canCloseOpenPositions={description.ownerActions?.canCloseOpenPositions}
        assetType={TRADE_ASSET_TYPE.ACCOUNT}
        haveDelay={false}
        getHistoryCounts={getAccountHistoryCounts(true)}
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
