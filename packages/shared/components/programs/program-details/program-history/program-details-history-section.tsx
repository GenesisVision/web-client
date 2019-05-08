import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import * as React from "react";
import { SyntheticEvent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import ProgramTrades from "shared/components/programs/program-details/program-history/program-trades";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import {
  FilteringType,
  SelectFilterValue
} from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { IDataModel } from "shared/constants/constants";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { AuthState } from "shared/reducers/auth-reducer";
import RootState from "shared/reducers/root-reducer";

import { HistoryCountsType } from "../program-details.types";
import ProgramOpenPositions from "./program-open-positions";

const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};
class _ProgramDetailsHistorySection extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.OPEN_POSITIONS,
    tradesCount: 0,
    eventsCount: 0,
    openPositionsCount: 0
  };

  componentDidMount() {
    const { programId, fetchHistoryCounts } = this.props;
    fetchHistoryCounts(programId).then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e: SyntheticEvent<EventTarget, Event>, tab: string) => {
    this.setState({ tab: tab as TABS });
  };

  render() {
    const { tab, tradesCount, eventsCount, openPositionsCount } = this.state;
    const {
      isForex,
      t,
      programId,
      programCurrency,
      currency,
      isAuthenticated,
      isInvested,
      eventTypeFilterValues,
      fetchPortfolioEvents,
      fetchTrades,
      fetchOpenPositions
    } = this.props;

    return (
      <Surface className="details-history">
        <div className="details-history__header">
          <div className="details-history__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={TABS.OPEN_POSITIONS}
                label={t("program-details-page.history.tabs.open-positions")}
                count={openPositionsCount}
              />
              <GVTab
                value={TABS.TRADES}
                label={t("program-details-page.history.tabs.trades")}
                count={tradesCount}
              />
              <GVTab
                value={TABS.EVENTS}
                label={t("program-details-page.history.tabs.events")}
                count={eventsCount}
                visible={isAuthenticated && isInvested}
              />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === TABS.TRADES && (
            <ProgramTrades
              isForex={isForex}
              fetchTrades={fetchTrades}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === TABS.EVENTS && (
            <PortfolioEventsTable
              filtering={EVENTS_FILTERING}
              fetchPortfolioEvents={fetchPortfolioEvents}
              dateRangeStartLabel={t("filters.date-range.program-start")}
              eventTypeFilterValues={eventTypeFilterValues}
            />
          )}
          {tab === TABS.OPEN_POSITIONS && (
            <ProgramOpenPositions
              fetchOpenPositions={fetchOpenPositions}
              programId={programId}
              currency={programCurrency}
            />
          )}
        </div>
      </Surface>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

enum TABS {
  TRADES = "trades",
  EVENTS = "events",
  OPEN_POSITIONS = "openPositions"
}

interface Props extends OwnProps, StateProps, InjectedTranslateProps {}

interface OwnProps {
  isForex: boolean;
  fetchHistoryCounts: (id: string) => Promise<HistoryCountsType>;
  fetchPortfolioEvents: GetItemsFuncType;
  fetchOpenPositions: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
  fetchTrades: (
    programId: string,
    filters?: FilteringType
  ) => Promise<IDataModel>;
  programId: string;
  currency: CURRENCIES;
  programCurrency: CURRENCIES;
  isInvested: boolean;
  eventTypeFilterValues: SelectFilterValue[];
}

interface StateProps extends AuthState {}

interface State extends HistoryCountsType {
  tab: TABS;
}

const ProgramDetailsHistorySection = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps)
)(_ProgramDetailsHistorySection);
export default ProgramDetailsHistorySection;
