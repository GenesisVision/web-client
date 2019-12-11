import "components/details/details.scss";

import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { InvestmentBlockDetailsType } from "components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import FollowControlsContainer from "pages/follows/follow-details/follow-controls/follow-controls.container";
import ProgramDetailsHistorySection from "pages/programs/program-details/program-history-section/program-details-history-section";
import { financialStatisticTableSelector } from "pages/programs/program-details/reducers/program-history.reducer";
import {
  getFinancialStatistics,
  getOpenPositions,
  getSubscriptions,
  getTrades
} from "pages/programs/program-details/service/program-details.service";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ASSET } from "shared/constants/constants";
import {
  createFollowNotificationsToUrl,
  createFollowSettingsToUrl
} from "utils/compose-url";

import { statisticCurrencyAction } from "./actions/follow-details.actions";
import PerformanceData from "./follow-details-description/performance-data";
import FollowDetailsStatisticSection from "./follow-details-statistic-section/follow-details-statistic-section";
import { FollowDetailsDataType } from "./follow-details.types";
import {
  followEventsTableSelector,
  openPositionsTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "./reducers/follow-history.reducer";
import {
  dispatchFollowDescription,
  getFollowHistoryCounts
} from "./services/follow-details.service";

const _FollowDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statisticCurrencyAction(description.currency));
  }, [description]);
  const personalDetails = description.personalDetails;
  const tablesData = {
    financialStatistic: {
      dataSelector: financialStatisticTableSelector,
      getItems: getFinancialStatistics
    },
    openPositions: {
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    subscriptions: {
      dataSelector: subscriptionsTableSelector,
      getItems: getSubscriptions
    },
    trades: { dataSelector: tradesTableSelector, getItems: getTrades }
  };
  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(description.id)());
  }, []);
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
        asset={ASSET.FOLLOW}
        personalDetails={personalDetails}
        description={description}
        notificationsUrl={createFollowNotificationsToUrl(
          description.url,
          description.title
        )}
        settingsUrl={createFollowSettingsToUrl(
          description.url,
          description.title
        )}
        AssetDetailsExtraBlock={() => <DetailsTags tags={description.tags} />}
        PerformanceData={() => <PerformanceData description={description} />}
        Controls={() => <FollowControlsContainer description={description} />}
      />
      <div className="details__divider" />
      <DetailsInvestment
        fees={{}}
        dispatchDescription={handleDispatchDescription}
        asset={ASSET.FOLLOW}
        selector={followEventsTableSelector}
        id={description.id}
        currency={description.currency}
        personalDetails={personalDetails as InvestmentBlockDetailsType}
      />
      <FollowDetailsStatisticSection />
      <ProgramDetailsHistorySection
        getHistoryCounts={getFollowHistoryCounts}
        tablesData={tablesData}
        showCommissionRebateSometime={
          description.brokerDetails.showCommissionRebateSometime
        }
        isOwnProgram={
          description.personalDetails
            ? description.personalDetails.isOwnAsset
            : false
        }
        showSwaps={description.brokerDetails.showSwaps}
        showTickets={description.brokerDetails.showTickets}
        programId={description.id}
        programCurrency={description.currency}
        title={description.title}
      />
    </Page>
  );
};

interface Props {
  data: FollowDetailsDataType;
}

const FollowDetailsContainer = withBlurLoader(
  React.memo(_FollowDetailsContainer)
);
export default FollowDetailsContainer;
