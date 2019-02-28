import "./open-trades-table.scss";

import { OrderOpenSignalSlaveModel } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import { closeTrade } from "pages/dashboard/services/dashboard.service";
import React, { Component, ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import { CloseIcon } from "shared/components/icon/close-icon";
import Profitability from "shared/components/profitability/profitability";
import { TableCell } from "shared/components/table/components";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import {
  composeManagerDetailsUrl,
  composeProgramDetailsUrl
} from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";
import { formatPercent } from "shared/utils/formatter";

import { clearDashboardTradesTable } from "../../actions/dashboard.actions";
import { getDashboardOpenTrades } from "../../services/dashboard-trades.service";
import { DASHBOARD_OPEN_TRADES_COLUMNS } from "./dashboard-trades.constants";
import { dashboardOpenTradesTableSelector } from "./dashboard-trades.selectors";

interface IOpenTradesTableOwnProps {
  title: string;
}

interface IOpenTradesDispatchProps {
  service: {
    clearDashboardTradesTable(): void;
    closeTrade(id: string, onSuccess: () => void): void;
  };
}

interface IOpenTradesTableState {
  isConfirmPopupOpen: boolean;
}

class OpenTradesTable extends Component<
  IOpenTradesTableOwnProps & InjectedTranslateProps & IOpenTradesDispatchProps,
  IOpenTradesTableState
> {
  state = {
    isConfirmPopupOpen: false
  };

  componentWillUnmount() {
    this.props.service.clearDashboardTradesTable();
  }

  openConfirmPopup = () => {
    this.setState({ isConfirmPopupOpen: true });
  };

  closeConfirmPopup = () => {
    this.setState({ isConfirmPopupOpen: false });
  };

  closeTrade = (id: string, onSuccess: any) => () => {
    this.props.service.closeTrade(id, onSuccess);
    this.closeConfirmPopup();
  };

  render() {
    const { t, title } = this.props;
    const { isConfirmPopupOpen } = this.state;
    return (
      <TableContainer
        className="open-trades-table"
        getItems={getDashboardOpenTrades}
        dataSelector={dashboardOpenTradesTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_OPEN_TRADES_COLUMNS}
        renderHeader={(column: Column) =>
          t(`investor.dashboard-page.open-trades-header.${column.name}`)
        }
        renderBodyRow={(
          signalTrade: OrderOpenSignalSlaveModel,
          updateRow: any
        ) => (
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
              <Profitability
                value={+formatPercent(signalTrade.profit)}
                prefix="sign"
              >
                <NumberFormat
                  value={formatPercent(signalTrade.profit)}
                  allowNegative={false}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" %"
                />
              </Profitability>
            </TableCell>
            <TableCell>
              <GVButton
                className="gv-btn--no-padding close-btn"
                color="secondary"
                onClick={this.openConfirmPopup}
              >
                <CloseIcon />
              </GVButton>
              <ConfirmPopup
                open={isConfirmPopupOpen}
                onClose={this.closeConfirmPopup}
                onApply={this.closeTrade(signalTrade.id, updateRow)}
                header={t(
                  "investor.dashboard-page.trades.close-trade-confirm.header"
                )}
                body={t(
                  "investor.dashboard-page.trades.close-trade-confirm.body",
                  {
                    symbol: signalTrade.symbol,
                    volume: formatValue(signalTrade.volume)
                  }
                )}
                applyButtonText={t("buttons.confirm")}
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators(
    { clearDashboardTradesTable, closeTrade },
    dispatch
  )
});

export default compose<ComponentType<IOpenTradesTableOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(OpenTradesTable);
