import PortfolioEventsTableFiltering from "components/portfolio-events-table/portfolio-events-table-filtering";
import PortfolioEventsTableHeaderCell from "components/portfolio-events-table/portfolio-events-table-header-cell";
import {
  DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  DASHBOARD_PORTFOLIO_EVENTS_FILTERS
} from "components/portfolio-events-table/portfolio-events-table.constants";
import { THistoryType } from "components/portfolio-events-table/portfolio-events-table.service";
import {
  SelectFilterValue,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { InvestmentEventViewModel } from "gv-api-web";
import { EVENT_LOCATION } from "pages/invest/programs/program-details/service/program-details.service";
import React from "react";
import { useSelector } from "react-redux";
import { allEventsSelector } from "reducers/platform-reducer";

import { DashboardPortfolioEventsLoaderData } from "../dashboard/dashboard.loaders-data";
import PortfolioEventsTableRow from "./portfolio-events-table-row";

export interface IPortfolioEventsTableOwnProps {
  assetTypeValues: SelectFilterValue<string>[];
  historyType: THistoryType;
  columns: SortingColumn[];
  getItems: GetItemsFuncType;
  eventLocation: EVENT_LOCATION;
  dateRangeStartLabel: string;
  className?: string;
  title?: string;
}

const _PortfolioEventsTableModule: React.FC<IPortfolioEventsTableOwnProps> = ({
  assetTypeValues,
  historyType,
  columns,
  title,
  getItems,
  eventLocation,
  className,
  dateRangeStartLabel
}) => {
  const eventTypeFilterValues = useSelector(allEventsSelector);
  return (
    <div className={className}>
      <TableModule
        name={"PortfolioEventsTableModule"}
        cache
        filtering={DASHBOARD_PORTFOLIO_EVENTS_DEFAULT_FILTERING}
        defaultFilters={DASHBOARD_PORTFOLIO_EVENTS_FILTERS}
        loaderData={DashboardPortfolioEventsLoaderData}
        title={title}
        getItems={getItems}
        renderFilters={(updateFilter, filtering) => (
          <PortfolioEventsTableFiltering
            historyType={historyType}
            assetTypeValues={assetTypeValues}
            eventTypeFilterValues={eventTypeFilterValues!}
            dateRangeStartLabel={dateRangeStartLabel}
            updateFilter={updateFilter}
            filtering={filtering}
          />
        )}
        paging={DEFAULT_PAGING}
        columns={columns}
        renderHeader={column => (
          <PortfolioEventsTableHeaderCell column={column} />
        )}
        renderBodyRow={(event: InvestmentEventViewModel) => (
          <PortfolioEventsTableRow
            event={event}
            eventLocation={eventLocation}
            hideFeeColumn={false}
          />
        )}
      />
    </div>
  );
};

const PortfolioEventsTableModule = React.memo(_PortfolioEventsTableModule);
export default PortfolioEventsTableModule;
