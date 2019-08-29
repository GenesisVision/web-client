import "./portfolio-events-table.scss";
import "./portfolio-events.scss";

import { InvestmentEventViewModel } from "gv-api-web";
import moment from "moment";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { ASSET_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import {
  FilteringType,
  SelectFilterValue
} from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { GetItemsFuncType } from "shared/components/table/components/table.types";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { ASSET, ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { formatCurrencyValue } from "shared/utils/formatter";

import { EVENT_LOCATION } from "../programs/program-details/services/program-details.service";
import PortfolioEventsDetails from "./portfolio-event-details";
import {
  EVENT_PROFITABILITY_VALUES,
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS,
  PORTFOLIO_EVENTS_MANAGER_COLUMNS
} from "./portfolio-events-table.constants";

const _PortfolioEventsTable: React.FC<IPortfolioEventsTableOwnProps> = ({
  eventLocation,
  filtering = PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  title,
  className,
  fetchPortfolioEvents,
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
                value={filtering["type"] as SelectFilterType} //TODO fix filtering types
                values={eventTypeFilterValues}
                onChange={updateFilter}
              />
            )}
            {filtering["assetType"] && (
              <SelectFilter
                name="assetType"
                label="Assets type"
                value={filtering["assetType"] as SelectFilterType} //TODO fix filtering types
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
          <TableRow stripy>
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--date">
              {moment(event.date).format()}
            </TableCell>
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
              <div className="portfolio-events-all-table__description">
                {event.assetDetails && (
                  <PortfolioEventLogo
                    withAsset={eventLocation !== EVENT_LOCATION.Asset}
                    assetDetails={event.assetDetails}
                    icon={event.icon}
                  />
                )}
                <div>{event.title}</div>
              </div>
            </TableCell>
            {!hideFeeColumn && (
              <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
                {event.totalFeesAmount !== null ? (
                  <NumberFormat
                    value={formatCurrencyValue(
                      event.totalFeesAmount,
                      event.currency
                    )}
                    thousandSeparator=" "
                    displayType="text"
                    suffix={" " + event.currency}
                  />
                ) : (
                  <>&nbsp;</>
                )}
              </TableCell>
            )}
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--details">
              <PortfolioEventsDetails extendedInfo={event.extendedInfo} />
            </TableCell>
            <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--amount">
              <Profitability
                condition={!!event.amount}
                value={EVENT_PROFITABILITY_VALUES[event.changeState]}
                prefix={PROFITABILITY_PREFIX.SIGN}
              >
                <NumberFormat
                  value={formatCurrencyValue(event.amount, event.currency)}
                  allowNegative={false}
                  thousandSeparator=" "
                  displayType="text"
                  suffix={" " + event.currency}
                />
              </Profitability>
            </TableCell>
          </TableRow>
        )}
      />
    </div>
  );
};

const PortfolioEventsTable = React.memo(_PortfolioEventsTable);
export default PortfolioEventsTable;

export interface IPortfolioEventsTableOwnProps {
  eventLocation: EVENT_LOCATION;
  fetchPortfolioEvents: GetItemsFuncType;
  dateRangeStartLabel: string;
  eventTypeFilterValues: SelectFilterValue[];
  className?: string;
  title?: string;
  filtering?: FilteringType;
  asset?: ASSET;
}
