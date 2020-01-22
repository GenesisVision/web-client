import "./details-investment.scss";

import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import GVTab from "components/gv-tabs/gv-tab";
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

const SubscriptionContainer = dynamic(() =>
  import(
    "components/details/details-description-section/details-investment/subscription.container"
  )
);
const Investment = dynamic(() =>
  import(
    "components/details/details-description-section/details-investment/investment"
  )
);
const PortfolioEventsTableContainer = dynamic(() =>
  import("components/portfolio-events-table/portfolio-events-table-container")
);

const _DetailsInvestment: React.FC<Props> = ({
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
  const { data: eventsCount = 0 } = useApiRequest({
    request: () =>
      fetchPortfolioEventsCount(EVENT_LOCATION.Asset, {
        assetId: id
      }),
    fetchOnMount: true
  });
  const subscriptionsCount = followPersonalDetails
    ? followPersonalDetails.subscribedAccounts
    : 0;
  const investmentDetails = personalFundDetails || programPersonalDetails;
  const { tab, setTab } = useTab<TABS>(TABS.INVESTMENT);
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(selector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(() => {
    isAuthenticated &&
      id &&
      dispatch(
        getEvents(id, EVENT_LOCATION.Asset)({
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
    <DetailsBlock table wide>
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          visible={showSubscription}
          value={TABS.SUBSCRIPTION}
          label={t("details-page.investment.tabs.subscription")}
        />
        <GVTab
          visible={showInvestment}
          value={TABS.INVESTMENT}
          label={t(
            `details-page.investment.tabs.investment.${asset.toLowerCase()}`
          )}
        />
        <GVTab
          visible={haveEvents}
          value={TABS.EVENTS}
          label={t("details-page.investment.tabs.events")}
        />
      </DetailsBlockTabs>
      {tab === TABS.SUBSCRIPTION && showSubscription && (
        <SubscriptionContainer id={id} assetCurrency={currency} />
      )}
      {tab === TABS.INVESTMENT && showInvestment && (
        <Investment
          isOwnAsset={isOwnAsset}
          fees={fees}
          updateDescription={dispatchDescription}
          id={id}
          assetCurrency={currency}
          asset={asset}
          personalDetails={investmentDetails as InvestmentType}
        />
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
    </DetailsBlock>
  );
};

enum TABS {
  SUBSCRIPTION = "SUBSCRIPTION",
  INVESTMENT = "INVESTMENT",
  EVENTS = "EVENTS"
}
interface Props {
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

const DetailsInvestment = React.memo(_DetailsInvestment);
export default DetailsInvestment;
