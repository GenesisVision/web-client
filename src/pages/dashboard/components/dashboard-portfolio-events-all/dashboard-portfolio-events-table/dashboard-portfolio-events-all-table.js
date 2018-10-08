import "./dashboard-portfolio-events-all-table.scss";

import moment from "moment";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "components/profitability/profitability";
import Surface from "components/surface/surface";
import { TableCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import SelectFilter from "modules/table/components/filtering/select-filter/select-filter";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import { ASSET_TYPE_FILTER_VALUES } from "modules/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { EVENT_TYPE_FILTER_VALUES } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";
import { DATE_RANGE_FILTER_NAME } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { EVENT_TYPE_FILTER_NAME } from "modules/table/components/filtering/event-type-filter/event-type-filter.constants";

import { fetchPortfolioEvents } from "../../../services/dashboard-events.services";
import {
  PORTFOLIO_EVENTS_COLUMNS,
  PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  PORTFOLIO_EVENTS_FILTERS,
  PORTFOLIO_EVENTS_TYPES_ENUM
} from "./dashboard-portfolio-events-all-table.constants";

class PortfolioEventsTableComponent extends Component {
  render() {
    const { t, filtering } = this.props;
    return (
      <Surface className="portfolio-events">
        <TableModule
          title={t("dashboard.portfolio-events.table-title")}
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
                />
              )}
            </Fragment>
          )}
          paging={DEFAULT_PAGING}
          columns={PORTFOLIO_EVENTS_COLUMNS}
          renderHeader={column => (
            <span
              className={`portfolio-events__cell portfolio-events__cell--${
                column.name
              }`}
            >
              {t(`dashboard.portfolio-events.table-header.${column.name}`)}
            </span>
          )}
          renderBodyRow={event => (
            <TableRow className="portfolio-events__row">
              <TableCell className="portfolio-events__cell portfolio-events__cell--date">
                {moment(event.date).format("DD-MM-YYYY, hh:mm a")}
              </TableCell>
              <TableCell className="portfolio-events__cell portfolio-events__cell--type">
                {t(
                  `dashboard.portfolio-events.types.${
                    PORTFOLIO_EVENTS_TYPES_ENUM[event.type]
                  }`
                )}
              </TableCell>
              <TableCell className="portfolio-events__cell portfolio-events__cell--type">
                {event.title}
              </TableCell>
              <TableCell className="portfolio-events__cell portfolio-events__cell--amount">
                <Profitability value={event.value}>
                  <NumberFormat
                    value={Math.abs(event.value)}
                    decimalScale={2}
                    displayType="text"
                  />
                </Profitability>
              </TableCell>
            </TableRow>
          )}
        />
      </Surface>
    );
  }
}

PortfolioEventsTableComponent.defaultProps = {
  filtering: PORTFOLIO_EVENTS_DEFAULT_FILTERING
};

export default translate()(PortfolioEventsTableComponent);
