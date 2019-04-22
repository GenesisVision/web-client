import "./portfolio-events-table.scss";
import "./portfolio-events.scss";

import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { isUseProfitability } from "shared/components/dashboard/helpers/dashboard-portfolio.helpers";
import Profitability from "shared/components/profitability/profitability";
import { ASSET_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatCurrencyValue } from "shared/utils/formatter";

import { PROFITABILITY_PREFIX } from "../profitability/profitability.helper";
import {
  FilteringType,
  SelectFilterValue
} from "../table/components/filtering/filter.type";
import { GetItemsFuncType } from "../table/components/table.types";
import {
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS,
  PORTFOLIO_EVENTS_TYPES
} from "./portfolio-events-table.constants";

const PortfolioEventsTable: React.FC<
  IPortfolioEventsTableProps & InjectedTranslateProps
> = ({
  t,
  filtering = PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  title,
  className,
  fetchPortfolioEvents,
  dateRangeStartLabel,
  eventTypeFilterValues
}) => {
  return (
    <div className={className}>
      <TableModule
        title={title}
        defaultFilters={PORTFOLIO_EVENTS_FILTERS}
        getItems={fetchPortfolioEvents}
        filtering={filtering}
        renderFilters={(updateFilter, filtering) => (
          <>
            {filtering["type"] && (
              <SelectFilter
                name={EVENT_TYPE_FILTER_NAME}
                label="Type"
                value={filtering["type"]}
                values={eventTypeFilterValues}
                onChange={updateFilter}
              />
            )}
            {filtering["assetType"] && (
              <SelectFilter
                name="assetType"
                label="Assets type"
                value={filtering["assetType"]}
                values={ASSET_TYPE_FILTER_VALUES}
                onChange={updateFilter}
              />
            )}
            {filtering["dateRange"] && (
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering["dateRange"]}
                onChange={updateFilter}
                startLabel={dateRangeStartLabel}
              />
            )}
          </>
        )}
        paging={DEFAULT_PAGING}
        columns={PORTFOLIO_EVENTS_COLUMNS}
        renderHeader={column => (
          <span
            className={`portfolio-events-all__cell portfolio-events-all__cell--${
              column.name
            }`}
          >
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.portfolio-events.table-header.${column.name}`
            )}
          </span>
        )}
        renderBodyRow={event => (
          <TableRow className="portfolio-events-all-table__row">
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--date">
              {moment(event.date).format("lll")}
            </TableCell>
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
              {event.description}
            </TableCell>
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--amount">
              {isUseProfitability(event) ? (
                <Profitability
                  value={event.value}
                  prefix={PROFITABILITY_PREFIX.SIGN}
                >
                  <NumberFormat
                    value={formatCurrencyValue(event.value, event.currency)}
                    allowNegative={false}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={" " + event.currency}
                  />
                </Profitability>
              ) : (
                <NumberFormat
                  value={formatCurrencyValue(event.value, event.currency)}
                  thousandSeparator=" "
                  displayType="text"
                  suffix={" " + event.currency}
                />
              )}
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

export interface IPortfolioEventsTableProps {
  fetchPortfolioEvents: GetItemsFuncType;
  dateRangeStartLabel: string;
  eventTypeFilterValues: SelectFilterValue[];
  className?: string;
  title?: string;
  filtering?: FilteringType;
}

export default React.memo(translate()(PortfolioEventsTable));
