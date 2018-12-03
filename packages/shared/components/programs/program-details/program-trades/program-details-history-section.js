import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import { GVTab, GVTabs } from "gv-react-components";
import * as PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import PortfolioEventsTableComponent from "shared/components/dashboard/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import ProgramTrades from "shared/components/programs/program-details/program-trades/program-trades";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

const TRADES_TAB = "trades";
const EVENTS_TAB = "events";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};
class ProgramDetailsHistorySection extends PureComponent {
  state = {
    tab: TRADES_TAB,
    prevProps: null
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { t, programId, currency, isAuthenticated, isInvested } = this.props;
    return (
      <Surface className="details-history">
        <div className="details-history__header">
          <h3 className="details-history__heading">
            {t("program-details-page.history.heading")}
          </h3>
          {(isAuthenticated && isInvested && (
            <div className="details-history__tabs">
              <GVTabs value={tab} onChange={this.handleTabChange}>
                <GVTab
                  value={"trades"}
                  label={t("program-details-page.history.tabs.trades")}
                />
                <GVTab
                  value={"events"}
                  label={t("program-details-page.history.tabs.events")}
                />
              </GVTabs>
            </div>
          )) || (
            <div className="details-history__subheading">
              {t("program-details-page.history.tabs.trades")}
            </div>
          )}
        </div>
        <div>
          {tab === TRADES_TAB && (
            <ProgramTrades
              fetchTrades={this.props.fetchTrades}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === EVENTS_TAB && (
            <PortfolioEventsTableComponent
              filtering={EVENTS_FILTERING}
              fetchPortfolioEvents={this.props.fetchPortfolioEvents}
              dateRangeStartLabel={t("filters.date-range.program-start")}
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
