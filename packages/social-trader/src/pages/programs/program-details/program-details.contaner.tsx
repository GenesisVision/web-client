import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import { DETAILS_TYPE } from "components/details/details.types";
import Page from "components/page/page";
import { withBlurLoader } from "decorators/with-blur-loader";
import InvestmentAccountControls from "pages/accounts/account-details/investment-account-controls";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import FollowControls from "pages/follows/follow-details/follow-controls/follow-controls";
import FollowDetailsStatisticSection from "pages/follows/follow-details/follow-details-statistic-section/follow-details-statistic-section";
import ProgramDetailsStatisticSection from "pages/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ProgramDescriptionDataType } from "pages/programs/program-details/program-details.types";
import { getSchema } from "pages/programs/program-details/program-schema";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import filesService from "services/file-service";
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

const _ProgramDetailsContainer: React.FC<Props> = ({
  data: description,
  route
}) => {
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
  const assetType = !!followDetails ? ASSET.FOLLOW : ASSET.PROGRAM;
  const personalDetails = followPersonalDetails || programPersonalDetails;
  const showFollowStatistic =
    (route === ASSET.FOLLOW && !!followPersonalDetails) ||
    (!!followPersonalDetails && !programDetails);
  const showProgramStatistic =
    (route === ASSET.PROGRAM && !!programDetails) ||
    (!!programDetails && !followPersonalDetails);

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchProgramDescriptionWithId(id, undefined, assetType));
  }, [id]);

  const tablesData = {
    financialStatistic: programDetails
      ? {
          dataSelector: financialStatisticTableSelector,
          getItems: getFinancialStatistics
        }
      : undefined,
    openPositions: {
      dataSelector: openPositionsTableSelector,
      getItems: getOpenPositions
    },
    periodHistory: programDetails
      ? {
          dataSelector: periodHistoryTableSelector,
          getItems: getPeriodHistory
        }
      : undefined,
    subscriptions: {
      dataSelector: subscriptionsTableSelector,
      getItems: getSubscriptions
    },
    trades: { dataSelector: tradesTableSelector, getItems: getTrades }
  };

  return (
    <Page
      title={title}
      description={description.publicInfo.description}
      previewImage={filesService.getFileUrl(description.publicInfo.logo)}
      schemas={[getSchema(description)]}
    >
      <DetailsDescriptionSection
        detailsType={DETAILS_TYPE.ASSET}
        personalDetails={personalDetails}
        isOwnAsset={isOwnAsset}
        logo={logo}
        title={title}
        id={id}
        subtitle={username}
        socialLinks={socialLinks}
        subtitleUrl={ownerUrl}
        currency={currency}
        color={color}
        asset={assetType}
        programDetails={programDetails || followDetails}
        description={description.publicInfo.description}
        notificationsUrl={createProgramNotificationsToUrl(url, title)}
        settingsUrl={
          description.publicInfo.status !== "Disabled" &&
          description.publicInfo.status !== "Closed"
            ? createProgramSettingsToUrl(
                description.publicInfo.url,
                description.publicInfo.title
              )
            : undefined
        }
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
                isOwnProgram={isOwnAsset}
                levelsParameters={levelsParameters!}
              />
            )}
            {followDetails && followDetails.signalSettings && (
              <FollowControls
                isOwnAsset={isOwnAsset}
                onApply={handleDispatchDescription}
                description={description}
              />
            )}
            {isOwnAsset && ownerActions.canTransferMoney && (
              <InvestmentAccountControls
                transferableItem={mapProgramFollowToTransferItemType(
                  description
                )}
                accountType={description.publicInfo.typeExt}
                onApply={handleDispatchDescription}
              />
            )}
          </>
        )}
      />
      <DetailsDivider />
      <DetailsInvestment
        isOwnAsset={isOwnAsset}
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
      {showFollowStatistic && <FollowDetailsStatisticSection />}
      {showProgramStatistic && <ProgramDetailsStatisticSection />}
      <ProgramDetailsHistorySection
        getHistoryCounts={getProgramHistoryCounts(!!programDetails)}
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
  route: ASSET;
  data: ProgramDescriptionDataType;
}

const ProgramDetailsContainer = withBlurLoader(
  React.memo(_ProgramDetailsContainer)
);
export default ProgramDetailsContainer;
