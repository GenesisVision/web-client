import "./program-details-history.scss";

import Surface from "shared/components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";
import PortfolioEventsTableComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";

import { fetchPortfolioEvents } from "../../../../dashboard/services/dashboard-events.services";
import ProgramTrades from "./program-trades/program-trades";

const TRADES_TAB = "trades";
const EVENTS_TAB = "events";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};
class ProgramDetailsHistorySection extends PureComponent {
  state = {
    tab: TRADES_TAB,
    tradesData: { data: null, isPending: true },
    prevProps: null
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  static getDerivedStateFromProps(props, state) {
    let newState = {};
    if (state.prevProps !== props) {
      newState.prevProps = props;
      newState.tradesData = props.tradesData;
    }
    return newState;
  }

  render() {
    const { tab } = this.state;
    const { t, programId, currency, tradesData, isAuthenticated } = this.props;
    if (!tradesData) return null;
    return (
      <Surface className="program-details-history">
        <div className="program-details-history__header">
          <div className="program-details-history__heading">
            {t("program-details-page.history.heading")}
          </div>
          {(isAuthenticated && (
            <div className="program-details-history__tabs">
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
            <div className="program-details-history__subheading">
              {t("program-details-page.history.tabs.trades")}
            </div>
          )}
        </div>
        <div>
          {tab === TRADES_TAB && (
            <ProgramTrades
              trades={tradesData.data}
              programId={programId}
              currency={currency}
            />
          )}
          {tab === EVENTS_TAB && (
            <PortfolioEventsTableComponent
              filtering={EVENTS_FILTERING}
              fetchPortfolioEvents={filters =>
                fetchPortfolioEvents({
                  ...filters,
                  assetId: programId
                })
              }
              dateRangeStartLabel={t("filters.date-range.program-start")}
            />
          )}
        </div>
      </Surface>
    );
  }
}
const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  return { isAuthenticated };
};
export default translate()(
  compose(connect(mapStateToProps))(ProgramDetailsHistorySection)
);
