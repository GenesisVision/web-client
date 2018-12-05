import "./dashboard-portfolio-events-all-table.scss";
import "./dashboard-portfolio-events-all.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { isUseProfitability } from "shared/components/dashboard/helpers/dashboard-portfolio.helpers";
import Profitability from "shared/components/profitability/profitability";
import { ASSET_TYPE_FILTER_VALUES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  EVENT_TYPE_FILTER_NAME,
  EVENT_TYPE_FILTER_VALUES
} from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatValue } from "shared/utils/formatter";

import {
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS
} from "./dashboard-portfolio-events-all-table.constants";

class PortfolioEventsTableComponent extends Component {
  render() {
    const {
      t,
      filtering,
      tableTitle,
      className,
      fetchPortfolioEvents,
      dateRangeStartLabel
    } = this.props;
    return (
      <div className={className}>
        <TableModule
          title={tableTitle}
          defaultFilters={PORTFOLIO_EVENTS_FILTERS}
          getItems={fetchPortfolioEvents}
          filtering={filtering}
          renderFilters={(updateFilter, filtering) => (
            <Fragment>
              {filtering["type"] && (
                <SelectFilter
                  name={EVENT_TYPE_FILTER_NAME}
                  label="Type"
                  value={filtering["type"]}
                  values={EVENT_TYPE_FILTER_VALUES}
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
            </Fragment>
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
                }.dashboard-pageportfolio-events.table-header.${column.name}`
              )}
            </span>
          )}
          renderBodyRow={event => (
            <TableRow className="portfolio-events-all-table__row">
              <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--date">
                {moment(event.date).format("DD-MM-YYYY, hh:mm a")}
              </TableCell>
              {/*<TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
                {PORTFOLIO_EVENTS_TYPES_ENUM[event.type] &&
                  t(
                    dashboard-pageportfolio-events.types.${
                      PORTFOLIO_EVENTS_TYPES_ENUM[event.type]
                    }`
                  )}
              </TableCell>*/}
              <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--type">
                {event.description}
              </TableCell>
              <TableCell className="portfolio-events-all-table__cell portfolio-events-all-table__cell--amount">
                {isUseProfitability(event) ? (
                  <Profitability value={formatValue(event.value)} prefix="sign">
                    <NumberFormat
                      value={formatValue(event.value)}
                      thousandSeparator=" "
                      displayType="text"
                      suffix={" " + event.currency}
                    />
                  </Profitability>
                ) : (
                  <NumberFormat
                    value={formatValue(event.value)}
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
  }
}

PortfolioEventsTableComponent.defaultProps = {
  filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING
};

export default translate()(PortfolioEventsTableComponent);
