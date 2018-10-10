import "./fund-details-history.scss";

import Surface from "components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";
import PortfolioEventsTableComponent from "pages/dashboard/components/dashboard-portfolio-events-all/dashboard-portfolio-events-table/dashboard-portfolio-events-all-table";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import FundRebalancing from "./fund-rebalancing/fund-rebalancing"
import { fetchPortfolioEvents } from "../../../../dashboard/services/dashboard-events.services";
import ProgramTrades from "./fund-rebalancing/fund-rebalancing";

const TRADES_TAB = "trades";
const EVENTS_TAB = "events";
const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};
class FundDetailsHistorySection extends PureComponent {
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
    const { t, fundId, currency, rebalancingData } = this.props;
    if (!rebalancingData) return null;
    return (
      <Surface className="fund-details-history">
        <div className="fund-details-history__heading">
          {t("fund-details-page.history.heading")}
        </div>

        <div className="fund-details-statistics__subheading">Rebalancing</div>
        <div>
          <FundRebalancing
            rebalancing={rebalancingData.data}
            programId={fundId}
            currency={currency}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsHistorySection);
