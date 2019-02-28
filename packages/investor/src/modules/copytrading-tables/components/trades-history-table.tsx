import { OrderClosedSignalSlaveModel } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component, ComponentType, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import { IUpdateFilterFunc } from "shared/components/table/components/table.types";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";
import { formatPercent } from "shared/utils/formatter";

import { clearCopytradingTable } from "../actions/copytrading-tables.actions";
import { getCopytradingTradesHistory } from "../services/copytrading-tables.service";
import { COPYTRADING_TRADES_HISTORY_COLUMNS } from "./copytrading-tables.constants";
import { dashboardTradesHistoryTableSelector } from "./copytrading-tables.selectors";

interface ITradesHistoryTableOwnProps {
  title: string;
}

interface ITradesHistoryDispatchProps {
  service: {
    clearCopytradingTable(): void;
  };
}

class TradesHistoryTable extends Component<
  ITradesHistoryTableOwnProps &
    InjectedTranslateProps &
    ITradesHistoryDispatchProps
> {
  componentWillUnmount() {
    this.props.service.clearCopytradingTable();
  }
  render() {
    const { t, title } = this.props;
    return (
      <TableContainer
        getItems={getCopytradingTradesHistory}
        dataSelector={dashboardTradesHistoryTableSelector}
        isFetchOnMount={true}
        columns={COPYTRADING_TRADES_HISTORY_COLUMNS}
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
        renderHeader={(column: Column) =>
          t(`investor.copytrading-tables.trades-history-header.${column.name}`)
        }
        renderBodyRow={(signalTrade: OrderClosedSignalSlaveModel) => (
          <TableRow>
            <TableCell className="programs-table__cell dashboard-programs__cell--title">
              <div className="dashboard-programs__cell--avatar-title">
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signalTrade.program.url),
                    state: `/ ${title}`
                  }}
                >
                  <AssetAvatar
                    url={signalTrade.program.logo}
                    alt={signalTrade.program.title}
                    color={signalTrade.program.color}
                  />
                </Link>
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signalTrade.program.url),
                    state: `/ ${title}`
                  }}
                >
                  <GVButton variant="text" color="secondary">
                    {signalTrade.program.title}
                  </GVButton>
                </Link>
              </div>
            </TableCell>
            <TableCell className="managers-table__cell--username">
              <ProfileAvatar
                url={signalTrade.manager.avatar}
                alt={signalTrade.manager.username}
              />
              <Link
                to={{
                  pathname: composeManagerDetailsUrl(signalTrade.manager.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {signalTrade.manager.username}
                </GVButton>
              </Link>
            </TableCell>
            <TableCell>
              <BaseProfitability
                isPositive={signalTrade.direction === "Buy"}
                isNegative={signalTrade.direction === "Sell"}
              >
                {signalTrade.direction}
              </BaseProfitability>
            </TableCell>
            <TableCell>{moment(signalTrade.date).format("lll")}</TableCell>
            <TableCell>{moment(signalTrade.date).format("lll")}</TableCell>
            <TableCell>{signalTrade.symbol}</TableCell>
            <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.volume)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.price)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.priceClose)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell>
              <Profitability
                value={+formatPercent(signalTrade.profit)}
                prefix="sign"
              >
                <NumberFormat
                  value={formatPercent(signalTrade.profit)}
                  thousandSeparator=" "
                  displayType="text"
                  allowNegative={false}
                  suffix=" %"
                />
              </Profitability>
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearCopytradingTable }, dispatch)
});

export default compose<ComponentType<ITradesHistoryTableOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(TradesHistoryTable);
