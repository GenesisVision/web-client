import { SignalTradingEvent } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import TableContainer from "shared/components/table/components/table-container";

import { getCopytradingTradesLog } from "../services/copytrading-tables.service";
import { COPYTRADING_TRADES_LOG_COLUMNS } from "./copytrading-tables.constants";
import { dashboardTradesLogTableSelector } from "./copytrading-tables.selectors";
import TradesLogRow from "./trades-log-row";

const _TradesLogTable: React.FC<Props> = ({ currency }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      getItems={getCopytradingTradesLog(currency)}
      dataSelector={dashboardTradesLogTableSelector}
      isFetchOnMount={true}
      columns={COPYTRADING_TRADES_LOG_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`investor.copytrading-tables.trades-log-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={(event: SignalTradingEvent) => (
        <TradesLogRow event={event} />
      )}
    />
  );
};

interface Props {
  currency?: string;
}

const TradesLogTable = React.memo(_TradesLogTable);
export default TradesLogTable;
