import "./details-investment.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResolveThunks, connect, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import {
  EVENT_LOCATION,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import Surface from "shared/components/surface/surface";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableSelectorType } from "shared/components/table/components/table.types";
import { ASSET } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum, DispatchDescriptionType } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";
import InvestmentContainer, {
  haveActiveInvestment,
  haveSubscription
} from "./investment-container";

const _DetailsInvestment: React.FC<Props> = ({
  notice,
  asset,
  eventTypesSelector,
  selector,
  currency,
  service: { dispatchDescription },
  id,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(selector);
  const eventTypeFilterValues = useSelector(eventTypesSelector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(
    () => {
      isAuthenticated && dispatch(getEvents(id, EVENT_LOCATION.Asset)());
    },
    [isAuthenticated]
  );
  useEffect(
    () => {
      isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
    },
    [isAuthenticated, events]
  );
  const haveInvestment =
    haveActiveInvestment(personalDetails) || haveSubscription(personalDetails);
  const showInvestment = haveEvents || haveInvestment;
  const { tab, setTab } = useTab<TABS>(
    haveInvestment ? TABS.INVESTMENT : TABS.EVENTS
  );
  if (!showInvestment) return null;
  return (
    <Surface className="details__section details-investment">
      <div className="details-investment__investment-tabs">
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            visible={haveInvestment}
            value={TABS.INVESTMENT}
            label={t(`fund-details-page.description.yourInvestment.${asset}`)}
          />
          <GVTab
            visible={haveEvents}
            value={TABS.EVENTS}
            label={t("program-details-page.history.tabs.events")}
          />
        </GVTabs>
      </div>
      {tab === TABS.INVESTMENT && (
        <InvestmentContainer
          updateDescription={dispatchDescription}
          asset={asset}
          notice={notice}
          id={id}
          assetCurrency={currency}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ProgramReinvestingWidget={ProgramReinvestingWidget}
        />
      )}
      {tab === TABS.EVENTS && (
        <PortfolioEventsTable
          getItems={getEvents(id!, EVENT_LOCATION.Asset)}
          selector={selector}
          asset={asset}
          eventLocation={EVENT_LOCATION.Asset}
          dateRangeStartLabel={t("filters.date-range.program-start")}
          eventTypeFilterValues={eventTypeFilterValues!}
        />
      )}
    </Surface>
  );
};

enum TABS {
  INVESTMENT = "INVESTMENT",
  EVENTS = "EVENTS"
}
interface OwnProps {
  notice?: string;
  asset: ASSET;
  eventTypesSelector: (state: RootState) => SelectFilterValue[];
  dispatchDescription: DispatchDescriptionType;
  selector: TableSelectorType;
  currency: CurrencyEnum;
  id: string;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { dispatchDescription }: Props
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      dispatchDescription
    },
    dispatch
  )
});

interface ServiceThunks extends ActionCreatorsMapObject {
  dispatchDescription: DispatchDescriptionType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends DispatchProps, OwnProps {}

const DetailsInvestment = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DetailsInvestment);
export default DetailsInvestment;
