import "components/details/details.scss";

import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import FollowControlsContainer from "pages/follows/follow-details/follow-controls/follow-controls.container";
import ProgramDetailsStatisticSection from "pages/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ProgramDescriptionDataType } from "pages/programs/program-details/program-details.types";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASSET } from "shared/constants/constants";
import {
  createProgramNotificationsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

import InvestmentProgramControls from "./program-controls/investment-program-controls";
import PerformanceData from "./program-details-description/performance-data";
import { levelsParamsLoaderData } from "./program-details.loader-data";
import ProgramDetailsHistorySection from "./program-history-section/program-details-history-section";
import { levelParametersSelector } from "./reducers/level-parameters.reducer";
import {
  financialStatisticTableSelector,
  openPositionsTableSelector,
  periodHistoryTableSelector,
  programEventsTableSelector,
  subscriptionsTableSelector,
  tradesTableSelector
} from "./reducers/program-history.reducer";
import {
  dispatchProgramDescriptionWithId,
  getFinancialStatistics,
  getOpenPositions,
  getPeriodHistory,
  getProgramHistoryCounts,
  getSubscriptions,
  getTrades
} from "./service/program-details.service";

const _ProgramDetailsContainer: React.FC<Props> = ({ data: description }) => {
  const dispatch = useDispatch();
  const levelsParameters = useSelector(levelParametersSelector);
  const {
    programDetails,
    followDetails,
    publicInfo: { isOwnAsset, title, status, url, logo, color },
    owner: { username, url: ownerUrl, socialLinks },
    tradingAccountInfo: { currency, leverageMax, leverageMin },
    tags,
    id,
    brokerDetails,
    ownerActions
  } = description;
  const programPersonalDetails =
    programDetails && programDetails.personalDetails;
  const followPersonalDetails = followDetails && followDetails.personalDetails;
  const assetType = followPersonalDetails ? ASSET.FOLLOW : ASSET.PROGRAM;
  const personalDetails = followPersonalDetails || programPersonalDetails;

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchProgramDescriptionWithId(id, undefined, assetType));
  }, [id]);

  const tablesData = {
    financialStatistic: {
      dataSelector: financialStatisticTableSelector,
      getItems: getFinancialStatistics
    },
    openPositions: {
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    periodHistory: {
      dataSelector: periodHistoryTableSelector,
      getItems: getPeriodHistory
    },
    subscriptions: {
      dataSelector: subscriptionsTableSelector,
      getItems: getSubscriptions
    },
    trades: { dataSelector: tradesTableSelector, getItems: getTrades }
  };
  return (
    <Page title={title}>
      <DetailsDescriptionSection
        isOwnAsset={isOwnAsset}
        logo={logo}
        title={title}
        id={id}
        username={username}
        socialLinks={socialLinks}
        ownerUrl={ownerUrl}
        currency={currency}
        color={color}
        asset={assetType}
        programDetails={programDetails || followDetails}
        description={description.publicInfo.description}
        notificationsUrl={createProgramNotificationsToUrl(url, title)}
        settingsUrl={createProgramSettingsToUrl(url, title)}
        AssetDetailsExtraBlock={() => <DetailsTags tags={tags} />}
        PerformanceData={() => (
          <PerformanceData
            leverageMax={leverageMax}
            leverageMin={leverageMin}
            currency={currency}
            status={status}
            brokerDetails={brokerDetails}
            loaderData={levelsParamsLoaderData}
            data={levelsParameters!}
            programDetails={programDetails}
          />
        )}
        Controls={() => (
          <>
            {programDetails && (
              <InvestmentProgramControls
                onApply={handleDispatchDescription}
                description={description}
                canCloseAsset={ownerActions && ownerActions.canClose}
                isOwnProgram={isOwnAsset}
                levelsParameters={levelsParameters!}
              />
            )}
            {followDetails && (
              <FollowControlsContainer description={description} />
            )}
          </>
        )}
      />
      <DetailsDivider />
      <DetailsInvestment
        fees={{
          successFee: programDetails && programDetails.successFeeCurrent,
          successFeePersonal:
            programPersonalDetails && programPersonalDetails.successFeePersonal
        }}
        dispatchDescription={handleDispatchDescription}
        asset={assetType}
        selector={programEventsTableSelector}
        id={id}
        currency={currency}
        programPersonalDetails={programPersonalDetails}
        followPersonalDetails={followPersonalDetails}
      />
      <ProgramDetailsStatisticSection />
      <ProgramDetailsHistorySection
        getHistoryCounts={getProgramHistoryCounts}
        tablesData={tablesData}
        showCommissionRebateSometime={
          brokerDetails.showCommissionRebateSometime
        }
        isOwnProgram={isOwnAsset}
        showSwaps={brokerDetails.showSwaps}
        showTickets={brokerDetails.showTickets}
        programId={id}
        programCurrency={currency}
        title={title}
      />
    </Page>
  );
};

interface Props {
  data: ProgramDescriptionDataType;
}

const ProgramDetailsContainer = withBlurLoader(
  React.memo(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
