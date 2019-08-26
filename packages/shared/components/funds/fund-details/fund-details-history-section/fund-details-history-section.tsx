import "shared/components/details/details-description-section/details-statistic-section/details-history/details-history.scss";

import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import React, { useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import Surface from "shared/components/surface/surface";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import {
  FilteringType,
  SelectFilterValue
} from "shared/components/table/components/filtering/filter.type";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import useTab from "shared/hooks/tab.hook";
import {
  AuthState,
  isAuthenticatedSelector
} from "shared/reducers/auth-reducer";
import { RootState } from "shared/reducers/root-reducer";

import FundReallocateHistory from "./fund-reallocate-history/fund-reallocate-history";
import FundStructure from "./fund-structure/fund-structure";

const EVENTS_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE
};

const _FundDetailsHistorySection: React.FC<Props> = ({
  t,
  id,
  fetchFundStructure,
  getFundReallocateHistory,
  isAuthenticated,
  isInvested,
  fetchPortfolioEvents,
  eventTypeFilterValues,
  fetchHistoryCounts
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.STRUCTURE);
  const [counts, setCounts] = useState<HistoryCountsType>({});
  useEffect(
    () => {
      fetchHistoryCounts(id).then(setCounts);
    },
    [fetchHistoryCounts, id]
  );
  const { eventsCount, reallocateCount } = counts;
  return (
    <Surface className="details-history">
      <div className="details-history__header">
        <div className="details-history__tabs">
          <GVTabs value={tab} onChange={setTab}>
            <GVTab
              value={TABS.STRUCTURE}
              label={
                <TooltipLabel
                  tooltipContent={t("fund-details-page.tooltip.structure")}
                  labelText={t("fund-details-page.history.tabs.structure")}
                  className="tooltip__label--cursor-pointer"
                />
              }
            />
            <GVTab
              value={TABS.EVENTS}
              label={t("fund-details-page.history.tabs.events")}
              count={eventsCount}
              visible={isAuthenticated && !!eventsCount}
            />
            <GVTab
              value={TABS.REALLOCATE_HISTORY}
              label={t("fund-details-page.history.tabs.reallocate-history")}
              count={reallocateCount}
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
        {tab === TABS.REALLOCATE_HISTORY && (
          <FundReallocateHistory
            getFundReallocateHistory={getFundReallocateHistory}
          />
        )}
      </div>
    </Surface>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

interface StateProps extends AuthState {}

enum TABS {
  EVENTS = "events",
  STRUCTURE = "structure",
  REALLOCATE_HISTORY = "reallocate history"
}

interface Props extends StateProps, WithTranslation, OwnProps {}

interface OwnProps {
  id: string;
  fetchFundStructure(fundId: string): Promise<FundAssetsListInfo>;
  getFundReallocateHistory(
    fundId: string,
    filters?: FilteringType
  ): Promise<ReallocationsViewModel>;
  fetchHistoryCounts: (id: string) => Promise<HistoryCountsType>;
  fetchPortfolioEvents: GetItemsFuncType;
  eventTypeFilterValues: SelectFilterValue<string>[];
  isInvested: boolean;
}

const FundDetailsHistorySection = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps),
  React.memo
)(_FundDetailsHistorySection);
export default FundDetailsHistorySection;
