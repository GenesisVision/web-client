import PortfolioEventsTableFiltering from "components/portfolio-events-table/portfolio-events-table-filtering";
import PortfolioEventsTableHeaderCell from "components/portfolio-events-table/portfolio-events-table-header-cell";
import { THistoryType } from "components/portfolio-events-table/portfolio-events-table.service";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { ASSET } from "constants/constants";
import { InvestmentEventViewModel } from "gv-api-web";
import { EVENT_LOCATION } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  allEventsSelector,
  assetTypeValuesSelector
} from "reducers/platform-reducer";

import { DashboardPortfolioEventsLoaderData } from "../dashboard/dashboard.loaders-data";
import PortfolioEventsTableRow from "./portfolio-events-table-row";
import {
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_MANAGER_COLUMNS
} from "./portfolio-events-table.constants";

const _PortfolioEventsTableContainer: React.FC<
  IPortfolioEventsTableOwnProps
> = ({
  historyType,
  title,
  getItems,
  selector,
  eventLocation,
  className,
  dateRangeStartLabel,
  asset
}) => {
  const eventTypeFilterValues = useSelector(allEventsSelector);
  const assetTypeValues = useSelector(assetTypeValuesSelector);
  const isOwner = true;
  const hideFeeColumn = isOwner && asset === ASSET.PROGRAM;
  const columns = useMemo(() => {
    return hideFeeColumn
      ? PORTFOLIO_EVENTS_MANAGER_COLUMNS
      : PORTFOLIO_EVENTS_COLUMNS;
  }, [hideFeeColumn]);
  return (
    <div className={className}>
      <TableContainer
        loaderData={DashboardPortfolioEventsLoaderData}
        title={title}
        getItems={getItems}
        dataSelector={selector}
        isFetchOnMount={true}
        renderFilters={(updateFilter, filtering) => (
          <PortfolioEventsTableFiltering
            assetType={asset}
            historyType={historyType}
            assetTypeValues={assetTypeValues}
            dateRangeStartLabel={dateRangeStartLabel}
            eventTypeFilterValues={eventTypeFilterValues!}
            updateFilter={updateFilter}
            filtering={filtering}
          />
        )}
        columns={columns}
        renderHeader={column => (
          <PortfolioEventsTableHeaderCell column={column} />
        )}
        renderBodyRow={(event: InvestmentEventViewModel) => (
          <PortfolioEventsTableRow
            event={event}
            eventLocation={eventLocation}
            hideFeeColumn={hideFeeColumn}
          />
        )}
      />
    </div>
  );
};

export interface IPortfolioEventsTableOwnProps {
  historyType: THistoryType;
  getItems: GetItemsFuncActionType;
  selector: TableSelectorType;
  eventLocation: EVENT_LOCATION;
  dateRangeStartLabel: string;
  className?: string;
  title?: string;
  asset?: ASSET;
}

const PortfolioEventsTableContainer = React.memo(
  _PortfolioEventsTableContainer
);
export default PortfolioEventsTableContainer;
