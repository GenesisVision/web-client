import "./portfolio-events-table.scss";
import "./portfolio-events.scss";

import PortfolioEventsTableFiltering from "components/portfolio-events-table/portfolio-events-table-filtering";
import PortfolioEventsTableHeaderCell from "components/portfolio-events-table/portfolio-events-table-header-cell";
import {
  SelectFilterValue,
  SortingColumn
} from "components/table/components/filtering/filter.type";
import TableModule from "components/table/components/table-module";
import { GetItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { InvestmentEventViewModel } from "gv-api-web";
import { EVENT_LOCATION } from "pages/programs/program-details/service/program-details.service";
import React from "react";
import { useSelector } from "react-redux";
import { assetTypeValuesSelector } from "reducers/platform-reducer";

import { DashboardPortfolioEventsLoaderData } from "../dashboard/dashboard.loaders-data";
import PortfolioEventsTableRow from "./portfolio-events-table-row";

const _PortfolioEventsTableModule: React.FC<IPortfolioEventsTableOwnProps> = ({
  columns,
  title,
  getItems,
  eventLocation,
  className,
  dateRangeStartLabel,
  eventTypeFilterValues
}) => {
  const assetTypeValues = useSelector(assetTypeValuesSelector);
  return (
    <div className={className}>
      <TableModule
        loaderData={DashboardPortfolioEventsLoaderData}
        title={title}
        getItems={getItems}
        renderFilters={(updateFilter, filtering) => (
          <PortfolioEventsTableFiltering
            assetTypeValues={assetTypeValues}
            dateRangeStartLabel={dateRangeStartLabel}
            eventTypeFilterValues={eventTypeFilterValues}
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

export interface IPortfolioEventsTableOwnProps {
  columns: SortingColumn[];
  getItems: GetItemsFuncType;
  eventLocation: EVENT_LOCATION;
  dateRangeStartLabel: string;
  eventTypeFilterValues: SelectFilterValue[];
  className?: string;
  title?: string;
}

const PortfolioEventsTableModule = React.memo(_PortfolioEventsTableModule);
export default PortfolioEventsTableModule;
