import classnames from "classnames";
import { TranslationFunction } from "i18next";
import React, { Component, Fragment } from "react";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";

import { DASHBOARD_OPEN_TRADES_COLUMNS } from "./dashboard-trades.constants";
import { dashboardOpenTradesTableSelector } from "./dashboard-trades.selectors";

interface IOpenTradesTableProps {
  t: TranslationFunction;
}

class OpenTradesTable extends Component<IOpenTradesTableProps> {
  render() {
    const { t } = this.props;
    return (
      <TableContainer
        getItems={getDashboardPrograms}
        dataSelector={dashboardOpenTradesTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_OPEN_TRADES_COLUMNS}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        renderHeader={column => (
          <span
            className={`programs-table__cell dashboard-programs__cell dashboard-programs__cell--${
              column.name
            }`}
          >
            {t(
              `${
                process.env.REACT_APP_PLATFORM
              }.dashboard-page.programs-header.${column.name}`
            )}
          </span>
        )}
        renderBodyRow={(program, updateRow) => (
          <TableRow
            className={classnames({
              "table__row--pretender": program.rating.canLevelUp
            })}
          >
            <TableCell className="">%</TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default OpenTradesTable;
