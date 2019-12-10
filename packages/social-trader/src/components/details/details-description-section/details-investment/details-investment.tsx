import "./details-investment.scss";

import DetailsBlock from "components/details/details-block";
import DetailsBlockTabs from "components/details/details-block-tabs";
import Investment from "components/details/details-description-section/details-investment/investment";
import SubscriptionContainer from "components/details/details-description-section/details-investment/subscription.container";
import GVTab from "components/gv-tabs/gv-tab";
import PortfolioEventsTableContainer from "components/portfolio-events-table/portfolio-events-table-container";
import { TableSelectorType } from "components/table/components/table.types";
import useTab from "hooks/tab.hook";
import {
  EVENT_LOCATION,
  getEvents
} from "pages/programs/program-details/service/program-details.service";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, FeesType } from "utils/types";

import {
  haveActiveInvestment,
  InvestmentBlockDetailsType,
  InvestmentType
} from "./details-investment.helpers";

const _DetailsInvestment: React.FC<Props> = ({
  fees,
  notice,
  asset,
  selector,
  currency,
  dispatchDescription,
  id,
  personalDetails
}) => {
  const subscriptionsCount =
    "subscribedAccounts" in personalDetails
      ? personalDetails.subscribedAccounts
      : 0;
  const { tab, setTab } = useTab<TABS>(TABS.INVESTMENT);
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(selector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(() => {
    isAuthenticated && id && dispatch(getEvents(id, EVENT_LOCATION.Asset)());
  }, [isAuthenticated, id]);
  useEffect(() => {
    isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
  }, [isAuthenticated, events]);

  const showInvestment = haveActiveInvestment(personalDetails);
  const showSubscription = !!subscriptionsCount;

  useEffect(() => {
    if (haveEvents && !showInvestment && !showSubscription)
      setTab(null, TABS.EVENTS);
    if (showSubscription) setTab(null, TABS.SUBSCRIPTION);
  }, [showInvestment, showSubscription, haveEvents]);

  if (!haveEvents && !showInvestment && !showSubscription) return null;
  return (
    <DetailsBlock table wide className="details-investment">
      <DetailsBlockTabs value={tab} onChange={setTab}>
        <GVTab
          visible={showSubscription}
          value={TABS.SUBSCRIPTION}
          label={t("follow-details-page.current-investment.title")}
        />
        <GVTab
          visible={showInvestment}
          value={TABS.INVESTMENT}
          label={t(`fund-details-page.description.yourInvestment.${asset}`)}
        />
        <GVTab
          visible={haveEvents}
          value={TABS.EVENTS}
          label={t("program-details-page.history.tabs.events")}
        />
      </DetailsBlockTabs>
      {tab === TABS.SUBSCRIPTION && showSubscription && (
        <SubscriptionContainer id={id} assetCurrency={currency} />
      )}
      {tab === TABS.INVESTMENT && showInvestment && (
        <Investment
          fees={fees}
          updateDescription={dispatchDescription}
          id={id}
          assetCurrency={currency}
          asset={asset}
          notice={notice}
          personalDetails={personalDetails as InvestmentType}
        />
      )}
      {tab === TABS.EVENTS && (
        <PortfolioEventsTableContainer
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
  fees: FeesType;
  notice?: string;
  asset: ASSET;
  dispatchDescription: () => void;
  selector: TableSelectorType;
  currency: CurrencyEnum;
  id: string;
  personalDetails: InvestmentBlockDetailsType;
}

const DetailsInvestment = React.memo(_DetailsInvestment);
export default DetailsInvestment;
