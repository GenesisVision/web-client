import classnames from "classnames";
import { TranslationFunction } from "i18next";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators } from "redux";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import { IUpdateFilterFunc } from "shared/components/table/components/table.types";

import { getDashboardOpenTrades } from "../../services/dashboard-trades.service";
import { DASHBOARD_OPEN_TRADES_COLUMNS } from "./dashboard-trades.constants";
import { dashboardOpenTradesTableSelector } from "./dashboard-trades.selectors";

interface IOpenTradesTableProps {
  t: TranslationFunction;
}

interface IOpenTradesDispatchProps {
  getDashboardOpenTrades(): void;
}

class OpenTradesTable extends Component<
  IOpenTradesTableProps & IOpenTradesDispatchProps
> {
  render() {
    const { t, getDashboardOpenTrades } = this.props;
    return (
      <TableContainer
        getItems={getDashboardOpenTrades}
        dataSelector={dashboardOpenTradesTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_OPEN_TRADES_COLUMNS}
        renderFilters={(updateFilter: IUpdateFilterFunc, filtering: any) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        renderHeader={(column: Column) => (
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
        renderBodyRow={(program: any) => (
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ getDashboardOpenTrades }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(OpenTradesTable);
