import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import * as React from "react";
import { SyntheticEvent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { PORTFOLIO_EVENTS_TYPES } from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import ProgramTrades from "shared/components/programs/program-details/program-history/program-trades";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { AuthState } from "shared/reducers/auth-reducer";
import RootState from "shared/reducers/root-reducer";

import { IDataModel } from "../../../table/helpers/mapper";
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
  fetchHistoryCounts: (id: string) => Promise<HistoryCountsType>;
  fetchPortfolioEvents: GetItemsFuncType<any, any>;
  fetchOpenPositions: (
    programId: string,
    filters?: any
  ) => Promise<IDataModel<any>>;
  fetchTrades: (programId: string, filters?: any) => Promise<IDataModel<any>>;
  programId: string;
  currency: CURRENCIES;
  programCurrency: CURRENCIES;
  isInvested: boolean;
  eventTypeFilterValues: PORTFOLIO_EVENTS_TYPES[];
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
