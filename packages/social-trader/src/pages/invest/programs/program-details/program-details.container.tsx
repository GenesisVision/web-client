import BreadCrumbs from "components/breadcrumbs/breadcrumbs";
import DetailsDescriptionSection from "components/details/details-description-section/details-description/details-description-section";
import { DetailsTags } from "components/details/details-description-section/details-description/details-tags.block";
import DetailsInvestment from "components/details/details-description-section/details-investment/details-investment";
import { DetailsDivider } from "components/details/details-divider.block";
import Page from "components/page/page";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { ASSET, ORIGIN_URL, TRADE_ASSET_TYPE } from "constants/constants";
import { LevelsParamsInfo } from "gv-api-web";
import InvestDefaultPopup from "modules/invest-popup/invest-default-popup";
import dynamic from "next/dynamic";
import { mapProgramFollowToTransferItemType } from "pages/dashboard/services/dashboard.service";
import FollowDetailsStatisticSection from "pages/invest/follows/follow-details/follow-details-statistic-section/follow-details-statistic-section";
import FollowFeesBlock from "pages/invest/follows/follow-details/follow-popup/follow-fees-block";
import { levelsParamsLoaderData } from "pages/invest/programs/program-details/program-details.loader-data";
import { ProgramDescriptionDataType } from "pages/invest/programs/program-details/program-details.types";
import PerformanceData from "pages/invest/programs/program-details/program-details-description/performance-data";
import ProgramDetailsStatisticSection from "pages/invest/programs/program-details/program-details-statistic-section/program-details-statistic-section";
import { getSchema } from "pages/invest/programs/program-details/program-schema";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import {
  GV_FOLLOW_ROUTE,
  GV_PROGRAMS_ROUTE,
  INVEST_ROUTE
} from "routes/invest.routes";
import styled from "styled-components";
import {
  composeFollowDetailsUrl,
  composeProgramBannerUrl,
  composeProgramDetailsUrl,
  createFollowNotificationsToUrl,
  createProgramApiKeysToUrl,
  createProgramNotificationsToUrl,
  createProgramSettingsToUrl
} from "utils/compose-url";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { $paddingMedium } from "utils/style/sizes";

import ProgramDetailsHistorySection, {
  TProgramTablesData
} from "./program-history-section/program-details-history-section";
import ProgramFeesBlock from "./program-popup/program-fees-block";
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

const InvestmentAccountControls = dynamic(
  () => import("pages/accounts/account-details/investment-account-controls")
);
const InvestmentProgramControls = dynamic(
  () => import("./program-controls/investment-program-controls")
);
const FollowControls = dynamic(
  () =>
    import(
      "pages/invest/follows/follow-details/follow-controls/follow-controls"
    )
);

const ControlsRow = styled(Row)`
  ${mediaBreakpointLandscapePhone(`
    margin-bottom: ${-$paddingMedium}px;
  `)};
`;

const _ProgramDetailsContainer: React.FC<Props> = ({
  levelsParameters,
  data: description,
  route
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const {
    programDetails,
    followDetails,
    publicInfo: { isOwnAsset, title, url, logoUrl, color },
    owner: { username, url: ownerUrl, socialLinks },
    tradingAccountInfo: { currency },
    tags,
    id,
    brokerDetails,
    ownerActions
  } = description;
  const isExchange = programDetails?.type === "DailyPeriod";
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

  const tablesData: TProgramTablesData = useMemo(
    () => ({
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
    }),
    []
  );
  const schemas = useMemo(() => [getSchema(description)], [description]);

  const renderAssetDetailsExtraBlock = useCallback(
    () => <DetailsTags tags={tags} />,
    [tags]
  );

  const renderProgramFeesBlock = useCallback(
    () => (
      <ProgramFeesBlock
        currency={description.tradingAccountInfo.currency}
        successFee={description.programDetails.successFeeCurrent}
        stopOut={description.programDetails.stopOutLevelCurrent}
        managementFee={description.programDetails.managementFeeCurrent}
      />
    ),
    [description]
  );

  const renderFollowFeesBlock = useCallback(
    () => (
      <FollowFeesBlock
        successFee={description.followDetails.signalSettings.signalSuccessFee}
        volumeFee={description.followDetails.signalSettings.signalVolumeFee}
      />
    ),
    [description]
  );

  const renderProgramPopup = useCallback(
    (popupTop: JSX.Element, form: JSX.Element) => (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={description.owner.url}
        assetColor={description.publicInfo.color}
        assetLevelProgress={description.programDetails.levelProgress}
        assetLevel={description.programDetails.level}
        assetLogo={description.publicInfo.logoUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        AssetFeesBlock={renderProgramFeesBlock}
        brokerName={description.brokerDetails.name}
        brokerLogo={description.brokerDetails.logoUrl}
        title={description.publicInfo.title}
        assetOwner={description.owner.username}
        form={form}
      />
    ),
    [description]
  );

  const renderFollowPopup = useCallback(
    (popupTop: JSX.Element, form: JSX.Element) => (
      <InvestDefaultPopup
        popupTop={popupTop}
        ownerUrl={description.owner.url}
        assetColor={description.publicInfo.color}
        assetLogo={description.publicInfo.logoUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        AssetFeesBlock={renderFollowFeesBlock}
        brokerName={description.brokerDetails.name}
        brokerLogo={description.brokerDetails.logoUrl}
        title={description.publicInfo.title}
        assetOwner={description.owner.username}
        form={form}
      />
    ),
    [description]
  );

  const renderPerformanceData = useCallback(
    () => (
      <PerformanceData
        isExchange={isExchange}
        leverageMax={description.tradingAccountInfo.leverageMax}
        leverageMin={description.tradingAccountInfo.leverageMin}
        currency={description.tradingAccountInfo.currency}
        status={description.publicInfo.status}
        brokerDetails={description.brokerDetails}
        loaderData={levelsParamsLoaderData}
        data={levelsParameters!}
        programDetails={description.programDetails}
      />
    ),
    [description, levelsParamsLoaderData, levelsParameters]
  );

  const renderControls = useCallback(
    () => (
      <ControlsRow wrap center={false}>
        {description.programDetails && (
          <RowItem bottomOffset>
            <InvestmentProgramControls
              renderAssetPopup={renderProgramPopup}
              isExchange={isExchange}
              currency={description.tradingAccountInfo.currency}
              id={description.id}
              index={description.publicInfo.index}
              programDetails={description.programDetails}
              publicInfo={description.publicInfo}
              brokerDetails={description.brokerDetails}
              tradingAccountInfo={description.tradingAccountInfo}
              onApply={handleDispatchDescription}
              isOwnProgram={isOwnAsset}
              levelsParameters={levelsParameters!}
            />
          </RowItem>
        )}
        {description.followDetails && description.followDetails.signalSettings && (
          <RowItem bottomOffset>
            <FollowControls
              renderAssetPopup={renderFollowPopup}
              isOwnAsset={isOwnAsset}
              onApply={handleDispatchDescription}
              publicInfo={description.publicInfo}
              tradingAccountInfo={description.tradingAccountInfo}
              followDetails={description.followDetails}
              id={description.id}
              brokerDetails={description.brokerDetails}
            />
          </RowItem>
        )}

        {isOwnAsset && description.ownerActions?.canTransferMoney && (
          <RowItem bottomOffset>
            <InvestmentAccountControls
              transferableItem={mapProgramFollowToTransferItemType(description)}
              accountType={description.publicInfo.typeExt}
              onApply={handleDispatchDescription}
            />
          </RowItem>
        )}
      </ControlsRow>
    ),
    [description, handleDispatchDescription, isOwnAsset, levelsParameters]
  );

  const apiKeysUrl = useMemo(
    () =>
      isOwnAsset && description.ownerActions.canCreateApiKeys
        ? createProgramApiKeysToUrl(
            description.publicInfo.url,
            description.publicInfo.title
          )
        : undefined,
    [description, isExchange]
  );

  const settingsUrl = useMemo(
    () =>
      description.publicInfo.status !== "Disabled" &&
      description.publicInfo.status !== "Closed"
        ? createProgramSettingsToUrl(
            description.publicInfo.url,
            description.publicInfo.title
          )
        : undefined,
    [description]
  );
  const notificationsUrl = useMemo(
    () =>
      assetType === "Follow"
        ? createFollowNotificationsToUrl(url, title)
        : createProgramNotificationsToUrl(url, title),
    [assetType, url, title]
  );

  const fees = useMemo(
    () => ({
      managementFeePersonal: !isOwnAsset
        ? programPersonalDetails?.managementFeePersonal
        : undefined,
      successFee: programDetails?.successFeeCurrent,
      successFeePersonal: programPersonalDetails?.successFeePersonal
    }),
    [isOwnAsset, programPersonalDetails, programDetails]
  );

  const hasProgramDetails = !!programDetails;
  const getHistoryCounts = useMemo(
    () => getProgramHistoryCounts(hasProgramDetails, isAuthenticated),
    [hasProgramDetails, isAuthenticated]
  );

  return (
    <Page
      type={"article"}
      title={`${
        assetType === ASSET.FOLLOW
          ? t("follow-details-page:title")
          : t("program-details-page:title")
      } - ${title}`}
      description={`${assetType} ${description.publicInfo.title} - ${description.publicInfo.description}`}
      previewImage={`${ORIGIN_URL}${composeProgramBannerUrl(
        description.publicInfo.url,
        assetType
      )}`}
      schemas={schemas}
    >
      <BreadCrumbs
        items={[
          { href: INVEST_ROUTE, label: t("navigation.invest") },
          {
            href:
              assetType === ASSET.FOLLOW ? GV_FOLLOW_ROUTE : GV_PROGRAMS_ROUTE,
            label:
              assetType === ASSET.FOLLOW
                ? t("navigation.gv-follow")
                : t("navigation.gv-programs")
          },
          {
            href:
              assetType === ASSET.FOLLOW
                ? composeFollowDetailsUrl(url)
                : composeProgramDetailsUrl(url),
            label: title
          }
        ]}
      />
      <DetailsDescriptionSection
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
        systemUrl={description.publicInfo.systemUrl}
        apiKeysUrl={apiKeysUrl}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
        AssetDetailsExtraBlock={renderAssetDetailsExtraBlock}
        PerformanceData={renderPerformanceData}
        Controls={renderControls}
      />
      <DetailsDivider />
      <DetailsInvestment
        renderAssetPopup={
          assetType === ASSET.PROGRAM ? renderProgramPopup : renderFollowPopup
        }
        title={description.publicInfo.title}
        isExchange={isExchange}
        isProcessingRealTime={
          programDetails?.dailyPeriodDetails?.isProcessingRealTime
        }
        isOwnAsset={isOwnAsset}
        fees={fees}
        dispatchDescription={handleDispatchDescription}
        asset={assetType}
        selector={programEventsTableSelector}
        id={id}
        currency={currency}
        programPersonalDetails={programPersonalDetails}
        followPersonalDetails={followPersonalDetails}
      />
      {showFollowStatistic && (
        <Row onlyOffset>
          <FollowDetailsStatisticSection />
        </Row>
      )}
      {showProgramStatistic && (
        <Row onlyOffset>
          <ProgramDetailsStatisticSection showPeriod={!isExchange} />
        </Row>
      )}
      <ProgramDetailsHistorySection
        isExchange={isExchange}
        assetType={(route as unknown) as TRADE_ASSET_TYPE}
        canCloseOpenPositions={ownerActions?.canCloseOpenPositions}
        getHistoryCounts={getHistoryCounts}
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
  levelsParameters?: LevelsParamsInfo;
  route: ASSET;
  data: ProgramDescriptionDataType;
}

const ProgramDetailsContainer = React.memo(_ProgramDetailsContainer);
export default ProgramDetailsContainer;
