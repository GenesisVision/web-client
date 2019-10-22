import "./open-trades-table.scss";

import { OrderSignalModel } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import TableContainer from "shared/components/table/components/table-container";

import { getCopytradingOpenTrades } from "../services/copytrading-tables.service";
import { COPYTRADING_OPEN_TRADES_COLUMNS } from "./copytrading-tables.constants";
import { dashboardOpenTradesTableSelector } from "./copytrading-tables.selectors";
import TradeRow from "./trade-row";

const OpenTradesTable: React.FC<Props> = ({ title, currency }) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      className="open-trades-table"
      getItems={getCopytradingOpenTrades(currency)}
      dataSelector={dashboardOpenTradesTableSelector}
      isFetchOnMount={true}
      columns={COPYTRADING_OPEN_TRADES_COLUMNS}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`investor.copytrading-tables.open-trades-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={(trade: OrderSignalModel, updateRow) => (
        <TradeRow
          key={trade.id}
          trade={trade}
          title={title}
          update={updateRow!}
        />
      )}
    />
  );
};

interface Props {
  title: string;
  currency?: string;
}

export default React.memo(OpenTradesTable);
