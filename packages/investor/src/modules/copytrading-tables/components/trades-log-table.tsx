import { SignalTradingEvent } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, bindActionCreators, compose, Dispatch } from "redux";
import TableContainer from "shared/components/table/components/table-container";

import { clearCopytradingTable } from "../actions/copytrading-tables.actions";
import { getCopytradingTradesLog } from "../services/copytrading-tables.service";
import { COPYTRADING_TRADES_LOG_COLUMNS } from "./copytrading-tables.constants";
import { dashboardTradesLogTableSelector } from "./copytrading-tables.selectors";
import TradesLogRow from "./trades-log-row";

class _TradesLogTable extends React.PureComponent<Props> {
  render() {
    const { t, currency } = this.props;
    return (
      <TableContainer
        getItems={getCopytradingTradesLog(currency)}
        dataSelector={dashboardTradesLogTableSelector}
        isFetchOnMount={true}
        columns={COPYTRADING_TRADES_LOG_COLUMNS}
        renderHeader={column => (
          <span
            className={`details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
          >
            {t(`investor.copytrading-tables.trades-log-header.${column.name}`)}
          </span>
        )}
        renderBodyRow={(event: SignalTradingEvent) => (
          <TradesLogRow event={event} />
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearCopytradingTable }, dispatch)
});

const TradesLogTable = compose<React.FC<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(_TradesLogTable);

export default TradesLogTable;

interface OwnProps {
  currency?: string;
}

interface DispatchProps {
  service: {
    clearCopytradingTable(): void;
  };
}

interface Props extends OwnProps, DispatchProps, WithTranslation {}
