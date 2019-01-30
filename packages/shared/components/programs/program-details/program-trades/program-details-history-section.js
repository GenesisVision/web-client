import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import ProgramTrades from "shared/components/programs/program-details/program-trades/program-trades";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

import ProgramOpenPositions from "./program-open-positions";

const TRADES_TAB = "trades";
const EVENTS_TAB = "events";
const OPEN_POSITIONS_TAB = "openPositions";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};
class ProgramDetailsHistorySection extends PureComponent {
  state = {
    tab: OPEN_POSITIONS_TAB,
    tradesCount: undefined,
    eventsCount: undefined,
    openPositionsCount: undefined
  };

  componentDidMount() {
    const { programId, fetchHistoryCounts } = this.props;
    fetchHistoryCounts(programId).then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab, tradesCount, eventsCount, openPositionsCount } = this.state;
    const {
      t,
      programId,
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
                value={OPEN_POSITIONS_TAB}
                label={t("program-details-page.history.tabs.open-positions")}
                count={openPositionsCount}
              />
              <GVTab
                value={TRADES_TAB}
                label={t("program-details-page.history.tabs.trades")}
                count={tradesCount}
              />
              <GVTab
                value={EVENTS_TAB}
                label={t("program-details-page.history.tabs.events")}
                count={eventsCount}
                visible={isAuthenticated && isInvested}
              />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === TRADES_TAB && (
            <ProgramTrades
              fetchTrades={fetchTrades}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === EVENTS_TAB && (
            <PortfolioEventsTable
              programId={programId}
              filtering={EVENTS_FILTERING}
              fetchPortfolioEvents={fetchPortfolioEvents}
              dateRangeStartLabel={t("filters.date-range.program-start")}
              eventTypeFilterValues={eventTypeFilterValues}
            />
          )}
          {tab === OPEN_POSITIONS_TAB && (
            <ProgramOpenPositions
              fetchOpenPositions={fetchOpenPositions}
              programId={programId}
            />
          )}
        </div>
      </Surface>
    );
  }
}

ProgramDetailsHistorySection.propTypes = {
  fetchPortfolioEvents: PropTypes.func.isRequired,
  fetchTrades: PropTypes.func.isRequired,
  programId: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  isInvested: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};

export default translate()(
  compose(connect(mapStateToProps))(ProgramDetailsHistorySection)
);
