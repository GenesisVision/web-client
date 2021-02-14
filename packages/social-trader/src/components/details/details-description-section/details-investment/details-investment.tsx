import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
import { Row } from "components/row/row";
import { TableSelectorType } from "components/table/components/table.types";
import { DEFAULT_EVENTS_PAGING } from "components/table/reducers/table-paging.reducer";
import { ASSET } from "constants/constants";
import {
  PersonalFollowDetailsFull,
  PersonalFundDetails,
  PersonalProgramDetails
} from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import useTab from "hooks/tab.hook";
import dynamic from "next/dynamic";
import {
  EVENT_LOCATION,
  fetchPortfolioEventsCount,
  fetchProgramReports,
  getEvents
} from "pages/invest/programs/program-details/service/program-details.service";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { CurrencyEnum, FeesType } from "utils/types";

import {
  haveActiveInvestment,
  InvestmentType
} from "./details-investment.helpers";

const ReportTable = dynamic(
  () =>
    import(
      "components/details/details-description-section/details-investment/reports/reports-table"
    )
);
const SubscriptionContainer = dynamic(
  () =>
    import(
      "components/details/details-description-section/details-investment/subscription/subscription.container"
    )
);
const Investment = dynamic(
  () =>
    import(
      "components/details/details-description-section/details-investment/investment"
    )
);
const PortfolioEventsTableContainer = dynamic(
  () =>
    import("components/portfolio-events-table/portfolio-events-table-container")
);

enum TABS {
  REPORTS = "REPORTS",
  SUBSCRIPTION = "SUBSCRIPTION",
  INVESTMENT = "INVESTMENT",
  EVENTS = "EVENTS"
}

interface Props {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  title: string;
  isExchange?: boolean;
  isProcessingRealTime?: boolean;
  hasTradingSchedule?: boolean;
  investmentMessage?: string;
  withdrawMessage?: string;
  isOwnAsset: boolean;
  fees: FeesType;
  asset: ASSET;
  dispatchDescription: () => void;
  selector: TableSelectorType;
  currency: CurrencyEnum;
  id: string;
  personalFundDetails?: PersonalFundDetails;
  programPersonalDetails?: PersonalProgramDetails;
  followPersonalDetails?: PersonalFollowDetailsFull;
}

const _DetailsInvestment: React.FC<Props> = ({
  renderAssetPopup,
  title,
  isExchange,
  isProcessingRealTime,
  investmentMessage,
  hasTradingSchedule,
  withdrawMessage,
  isOwnAsset,
  fees,
  asset,
  selector,
  currency,
  dispatchDescription,
  id,
  personalFundDetails,
  programPersonalDetails,
  followPersonalDetails
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const { data: eventsCount = 0 } = useApiRequest({
    name: "eventsCount",
    cache: true,
    request: () =>
      fetchPortfolioEventsCount(EVENT_LOCATION.Asset, {
        assetId: id
      }),
    fetchOnMount: isAuthenticated
  });

  const { data: reportsCount = 0 } = useApiRequest({
    name: "reportsCount",
    cache: true,
    request: () =>
      fetchProgramReports(id, { take: 0 }).then(({ total }) => total),
    fetchOnMount:
      !isOwnAsset && isAuthenticated && asset === ASSET.PROGRAM && isExchange
  });

  const subscriptionsCount = followPersonalDetails
    ? followPersonalDetails.subscribedAccounts
    : 0;
  const investmentDetails = personalFundDetails || programPersonalDetails;
  const { tab, setTab } = useTab<TABS>(TABS.INVESTMENT);
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(() => {
    isAuthenticated &&
      id &&
      dispatch(
        getEvents(
          id,
          EVENT_LOCATION.Asset
        )({
          take: DEFAULT_EVENTS_PAGING.itemsOnPage
        })
      );
  }, [isAuthenticated, id]);
  useEffect(() => {
    isAuthenticated && setHaveEvents(eventsCount > 0);
  }, [isAuthenticated, eventsCount]);

  const showInvestment =
    !!investmentDetails && haveActiveInvestment(investmentDetails);

  const showSubscription = !!subscriptionsCount;
  const historyType =
    asset === ASSET.FOLLOW ? "tradingHistory" : "investmentHistory";

  useEffect(() => {
    if (haveEvents && !showInvestment && !showSubscription)
      setTab(null, TABS.EVENTS);
    if (showSubscription) setTab(null, TABS.SUBSCRIPTION);
  }, [showInvestment, showSubscription, haveEvents]);

  if (!haveEvents && !showInvestment && !showSubscription) return null;
  return (
    <DefaultTableBlock>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          visible={showSubscription}
          value={TABS.SUBSCRIPTION}
          label={t("asset-details:investment.tabs.subscription")}
        />
        <GVTab
          visible={showInvestment}
          value={TABS.INVESTMENT}
          label={t(
            `asset-details:investment.tabs.investment.${isExchange ? "exchange-" : ""
            }${asset.toLowerCase()}`
          )}
        />
        <GVTab
          visible={haveEvents}
          value={TABS.EVENTS}
          label={t("asset-details:investment.tabs.events")}
        />
        <GVTab
          visible={reportsCount > 0}
          value={TABS.REPORTS}
          label={t("asset-details:investment.tabs.reports")}
        />
      </DetailsBlockTabs>
      {tab === TABS.SUBSCRIPTION && showSubscription && (
        <SubscriptionContainer
          subscribedAccounts={followPersonalDetails?.subscribedAccounts}
          id={id}
          assetCurrency={currency}
        />
      )}
      {tab === TABS.INVESTMENT && showInvestment && (
        <Row onlyOffset>
          <Investment
            renderAssetPopup={renderAssetPopup}
            isExchange={isExchange}
            isProcessingRealTime={isProcessingRealTime}
            hasTradingSchedule={hasTradingSchedule}
            investmentMessage={investmentMessage}
            withdrawMessage={withdrawMessage}
            isOwnAsset={isOwnAsset}
            fees={fees}
            updateDescription={dispatchDescription}
            id={id}
            assetCurrency={currency}
            asset={asset}
            personalDetails={investmentDetails as InvestmentType}
          />
        </Row>
      )}
      {tab === TABS.EVENTS && haveEvents && (
        <PortfolioEventsTableContainer
          historyType={historyType}
          getItems={getEvents(id!, EVENT_LOCATION.Asset)}
          selector={selector}
          asset={asset}
          eventLocation={EVENT_LOCATION.Asset}
          dateRangeStartLabel={t("filters.date-range.program-start")}
        />
      )}
      {tab === TABS.REPORTS && (
        <ReportTable title={title} id={id} currency={currency} />
      )}
    </DefaultTableBlock>
  );
};

const DetailsInvestment = React.memo(_DetailsInvestment);
export default DetailsInvestment;
