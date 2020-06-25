import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import { DETAILS_TYPE } from "components/details/details.types";
import Page from "components/page/page";
import { ASSET, TRADE_ASSET_TYPE } from "constants/constants";
import Crashable from "decorators/crashable";
import dynamic from "next/dynamic";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import FollowDetailsStatisticSection from "pages/invest/follows/follow-details/follow-details-statistic-section/follow-details-statistic-section";
import ProgramDetailsStatisticSection from "pages/invest/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { ProgramDescriptionDataType } from "pages/invest/programs/program-details/program-details.types";
import { getSchema } from "pages/invest/programs/program-details/program-schema";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  composeProgramBannerUrl,
  createProgramNotificationsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";

import PerformanceData from "./program-details-description/performance-data";
import { levelsParamsLoaderData } from "./program-details.loader-data";
import ProgramDetailsHistorySection, {
  TProgramTablesData
} from "./program-history-section/program-details-history-section";
import { levelParametersSelector } from "./reducers/level-parameters.reducer";
import {
  financialStatisticTableSelector,
  openPositionsSelector,
  openPositionsTableSelector,
  periodHistoryTableSelector,
  programEventsTableSelector,
  subscriptionsTableSelector,
  tradesSelector,
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

const InvestmentAccountControls = dynamic(() =>
  import("pages/accounts/account-details/investment-account-controls")
);
const InvestmentProgramControls = dynamic(() =>
  import("./program-controls/investment-program-controls")
);
const FollowControls = dynamic(() =>
  import("pages/invest/follows/follow-details/follow-controls/follow-controls")
);

const _ProgramDetailsContainer: React.FC<Props> = ({
  data: description,
  route
}) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const levelsParameters = useSelector(levelParametersSelector);
  const {
    programDetails,
    followDetails,
    publicInfo: { isOwnAsset, title, status, url, logoUrl, color },
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
    (!!followDetails && !programDetails);
  const showProgramStatistic =
    (route === ASSET.PROGRAM && !!programDetails) ||
    (!!programDetails && !followDetails);

  const handleDispatchDescription = useCallback(() => {
    dispatch(dispatchProgramDescriptionWithId(id, undefined, assetType));
  }, [id]);

  const tablesData: TProgramTablesData = {
    financialStatistic: programDetails
      ? {
          dataSelector: financialStatisticTableSelector,
          getItems: getFinancialStatistics
        }
      : undefined,
    openPositions: {
      itemSelector: openPositionsSelector,
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
    trades: {
      itemSelector: tradesSelector,
      dataSelector: tradesTableSelector,
      getItems: getTrades
    }
  };

  const banner = composeProgramBannerUrl(url);
  return (
    <Page
      type={"article"}
      title={`${
        assetType === ASSET.FOLLOW
          ? t("follow-details-page:title")
          : t("program-details-page:title")
      } - ${title}`}
      description={`${assetType} ${description.publicInfo.title} - ${description.publicInfo.description}`}
      previewImage={banner}
      schemas={[getSchema(description)]}
    >
      <DetailsDescriptionSection
        detailsType={DETAILS_TYPE.ASSET}
        personalDetails={personalDetails}
        isOwnAsset={isOwnAsset}
        logo={logoUrl}
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
                currency={currency}
                id={id}
                programDetails={programDetails}
                publicInfo={description.publicInfo}
                brokerDetails={brokerDetails}
                tradingAccountInfo={description.tradingAccountInfo}
                onApply={handleDispatchDescription}
                isOwnProgram={isOwnAsset}
                levelsParameters={levelsParameters!}
              />
            )}
            {followDetails && followDetails.signalSettings && (
              <FollowControls
                isOwnAsset={isOwnAsset}
                onApply={handleDispatchDescription}
                publicInfo={description.publicInfo}
                tradingAccountInfo={description.tradingAccountInfo}
                followDetails={followDetails}
                id={id}
                brokerDetails={brokerDetails}
              />
            )}
            {isOwnAsset && ownerActions?.canTransferMoney && (
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
          managementFeePersonal: !isOwnAsset
            ? programPersonalDetails?.managementFeePersonal
            : undefined,
          successFee: programDetails?.successFeeCurrent,
          successFeePersonal: programPersonalDetails?.successFeePersonal
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
        assetType={(route as unknown) as TRADE_ASSET_TYPE}
        canCloseOpenPositions={ownerActions?.canCloseOpenPositions}
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

const ProgramDetailsContainer = React.memo(Crashable(_ProgramDetailsContainer));
export default ProgramDetailsContainer;
