import "shared/components/details/details.scss";

import ProgramDetailsHistorySection from "pages/programs/program-details/program-history-section/program-details-history-section";
import { financialStatisticTableSelector } from "pages/programs/program-details/reducers/program-history.reducer";
import {
  getFinancialStatistics,
  getOpenPositions,
  getSubscriptions,
  getTrades
} from "pages/programs/program-details/service/program-details.service";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailsDescriptionSection from "shared/components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "shared/components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import Page from "shared/components/page/page";
import { ASSET } from "shared/constants/constants";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { programEventsSelector } from "shared/reducers/platform-reducer";
import {
  createFollowNotificationsToUrl,
  createFollowSettingsToUrl
} from "shared/utils/compose-url";

import { statisticCurrencyAction } from "./actions/follow-details.actions";
import FollowControls from "./follow-controls/follow-controls";
import PerformanceData from "./follow-details-description/performance-data";
import FollowDetailsStatisticSection from "./follow-details-statistic-section/follow-details-statistic-section";
import {
  FollowDetailsDataType,
  IDescriptionSection
} from "./follow-details.types";
import FollowDetailsHistorySection from "./follow-history-section/follow-details-history-section";
import { followIdSelector } from "./reducers/description.reducer";
import {
  followEventsTableSelector,
  openPositionsTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "./reducers/follow-history.reducer";
import { dispatchFollowDescription } from "./services/follow-details.service";

const _FollowDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  const id = useSelector(followIdSelector);
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
  return (
    <Page title={description.title}>
      <DetailsDescriptionSection
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
        Controls={() => <FollowControls description={description} />}
      />
      <div className="details__divider" />
      {/*<DetailsInvestment
        fees={{
          successFee: description.successFeeCurrent,
          successFeePersonal:
            personalDetails && personalDetails.successFeePersonal,
          successFeeCurrent: description.successFeeCurrent,
          successFeeSelected: description.successFeeSelected,
          entryFee: description.successFeeCurrent,
          entryFeeCurrent: description.entryFeeCurrent,
          entryFeeSelected: description.entryFeeSelected
        }}
        dispatchDescription={dispatchFollowDescription(id)}
        eventTypesSelector={programEventsSelector}
        asset={ASSET.FOLLOW}
        selector={followEventsTableSelector}
        id={description.id}
        currency={description.currency}
        personalDetails={personalDetails as InvestmentDetails}
      />*/}
      <FollowDetailsStatisticSection />
      <ProgramDetailsHistorySection
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
