import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import { FundAssetsListInfo } from "gv-api-web";
import * as React from "react";
import { SyntheticEvent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import {
  AuthState,
  isAuthenticatedSelector
} from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";

import FundStructure from "./fund-structure/fund-structure";

const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

class FundDetailsHistorySection extends React.PureComponent<Props, State> {
  state = {
    tab: TABS.STRUCTURE,
    eventsCount: 0
  };

  componentDidMount() {
    const { id, fetchHistoryCounts } = this.props;
    fetchHistoryCounts(id).then(({ eventsCount }) =>
      this.setState({ eventsCount })
    );
  }

  handleTabChange = (e: SyntheticEvent<EventTarget, Event>, tab: string) => {
    this.setState({ tab: tab as TABS });
  };
  render() {
    const {
      t,
      id,
      fetchFundStructure,
      isAuthenticated,
      isInvested,
      fetchPortfolioEvents,
      eventTypeFilterValues
    } = this.props;
    const { tab, eventsCount } = this.state;
    return (
      <Surface className="details-history">
        <div className="details-history__header">
          <div className="details-history__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange} hasScroll>
              <GVTab
                value={TABS.STRUCTURE}
                label={
                  <TooltipLabel
                    tooltipContent={t("fund-details-page.tooltip.structure")}
                    labelText={t("fund-details-page.history.structure.title")}
                    className="tooltip__label--cursor-pointer"
                  />
                }
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
          {tab === TABS.STRUCTURE && (
            <FundStructure id={id} fetchStructure={fetchFundStructure} />
          )}
          {tab === TABS.EVENTS && (
            <PortfolioEventsTable
              filtering={EVENTS_FILTERING}
              fetchPortfolioEvents={fetchPortfolioEvents}
              dateRangeStartLabel={t("filters.date-range.program-start")}
              eventTypeFilterValues={eventTypeFilterValues}
            />
          )}
        </div>
      </Surface>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

interface StateProps extends AuthState {}

enum TABS {
  EVENTS = "events",
  STRUCTURE = "structure"
}

interface Props extends StateProps, InjectedTranslateProps, OwnProps {}

interface OwnProps {
  id: string;
  fetchFundStructure(fundId: string): Promise<FundAssetsListInfo>;
  fetchHistoryCounts: (id: string) => Promise<HistoryCountsType>;
  fetchPortfolioEvents: GetItemsFuncType;
  eventTypeFilterValues: SelectFilterValue<string>[];
  isInvested: boolean;
}

interface State {
  tab: TABS;
  eventsCount: number;
}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps)
)(FundDetailsHistorySection);
