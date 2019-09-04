import "./portfolio-events-table.scss";
import "./portfolio-events.scss";

import { InvestmentEventViewModel } from "gv-api-web";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import {
  ASSET_TYPE_FILTER_NAME,
  ASSET_TYPE_FILTER_VALUES
} from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { ASSET, ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";

import PortfolioEventsTableRow from "./portfolio-events-table-row";
import {
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_MANAGER_COLUMNS
} from "./portfolio-events-table.constants";

const _PortfolioEventsTable: React.FC<IPortfolioEventsTableOwnProps> = ({
  title,
  getItems,
  selector,
  eventLocation,
  className,
  dateRangeStartLabel,
  eventTypeFilterValues,
  asset
}) => {
  const [t] = useTranslation();
  const role = useRole();
  const hideFeeColumn = useMemo(
    () => role === ROLE.MANAGER && asset === ASSET.PROGRAM,
    [asset, role]
  );
  const columns = useMemo(
    () => {
      return hideFeeColumn
        ? PORTFOLIO_EVENTS_MANAGER_COLUMNS
        : PORTFOLIO_EVENTS_COLUMNS;
    },
    [hideFeeColumn]
  );
  return (
    <div className={className}>
      <TableContainer
        title={title}
        getItems={getItems}
        dataSelector={selector}
        isFetchOnMount={true}
        renderFilters={(updateFilter, filtering) => (
          <>
            {filtering[EVENT_TYPE_FILTER_NAME] && (
              <SelectFilter
                name={EVENT_TYPE_FILTER_NAME}
                label="Type"
                value={filtering[EVENT_TYPE_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
                values={eventTypeFilterValues}
                onChange={updateFilter}
              />
            )}
            {filtering[ASSET_TYPE_FILTER_NAME] && (
              <SelectFilter
                name={ASSET_TYPE_FILTER_NAME}
                label="Assets type"
                value={filtering[ASSET_TYPE_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
                values={ASSET_TYPE_FILTER_VALUES}
                onChange={updateFilter}
              />
            )}
            {filtering[DATE_RANGE_FILTER_NAME] && (
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering[DATE_RANGE_FILTER_NAME]}
                onChange={updateFilter}
                startLabel={dateRangeStartLabel}
              />
            )}
          </>
        )}
        paging={DEFAULT_PAGING}
        columns={columns}
        renderHeader={column => (
          <span
            className={`portfolio-events-all-table__cell portfolio-events-all-table__head-cell--${
              column.name
            }`}
          >
            {t(
              `${role}.dashboard-page.portfolio-events.table-header.${
                column.name
              }`
            )}
          </span>
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

const PortfolioEventsTable = React.memo(_PortfolioEventsTable);
export default PortfolioEventsTable;

export interface IPortfolioEventsTableOwnProps {
  getItems: GetItemsFuncActionType;
  selector: TableSelectorType;
  eventLocation: EVENT_LOCATION;
  dateRangeStartLabel: string;
  eventTypeFilterValues: SelectFilterValue[];
  className?: string;
  title?: string;
  asset?: ASSET;
}
