import "./program-details-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";

import ProgramTrades from "./program-trades/program-trades";
import PortfolioEventsTableComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { fetchPortfolioEvents } from "../../../../dashboard/services/dashboard-events.services";

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
    const { t, programId, currency, tradesData, eventsData } = this.props;
    if (!tradesData) return null;
    return (
      <Surface className="program-details-history">
        <div className="program-details-history__header">
          <h2>{t("program-details-page.history.heading")}</h2>
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
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsHistorySection);
