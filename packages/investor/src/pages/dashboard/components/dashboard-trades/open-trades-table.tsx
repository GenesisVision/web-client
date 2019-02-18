import { OpenSignalTrade } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component, ComponentType } from "react";
import { TranslationFunction, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import Profitability from "shared/components/profitability/profitability";
import { TableCell } from "shared/components/table/components";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";
import { formatPercent } from "shared/utils/formatter";

import { getDashboardOpenTrades } from "../../services/dashboard-trades.service";
import { DASHBOARD_OPEN_TRADES_COLUMNS } from "./dashboard-trades.constants";
import { dashboardOpenTradesTableSelector } from "./dashboard-trades.selectors";

interface IOpenTradesTableOwnProps {
  title: string;
}

interface IOpenTradesTableProps {
  t: TranslationFunction;
}

interface IOpenTradesDispatchProps {
  service: {
    getDashboardOpenTrades(): void;
  };
}

class OpenTradesTable extends Component<
  IOpenTradesTableOwnProps & IOpenTradesTableProps & IOpenTradesDispatchProps
> {
  render() {
    const { t, title } = this.props;
    return (
      <TableContainer
        getItems={getDashboardOpenTrades}
        dataSelector={dashboardOpenTradesTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_OPEN_TRADES_COLUMNS}
        renderHeader={(column: Column) =>
          t(`investor.dashboard-page.open-trades-header.${column.name}`)
        }
        renderBodyRow={(signalTrade: OpenSignalTrade) => (
          <TableRow>
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
                value={formatValue(signalTrade.openPrice)}
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
            <TableCell>{moment(signalTrade.openDate).format("lll")}</TableCell>
            <TableCell>
              <Profitability
                value={+formatValue(signalTrade.profit)}
                prefix="sign"
              >
                <NumberFormat
                  value={formatPercent(signalTrade.profit)}
                  thousandSeparator=" "
                  displayType="text"
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
  service: bindActionCreators({ getDashboardOpenTrades }, dispatch)
});

export default compose<ComponentType<IOpenTradesTableOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(OpenTradesTable);
