import { OrderSignalModel } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatValue } from "shared/utils/formatter";

const DECIMAL_SCALE = 8;

const TradeRow: React.FC<{ trade: OrderSignalModel }> = ({ trade }) => (
  <TableRow className="details-trades__row">
    <TableCell className="details-trades__cell program-details-trades__cell--direction">
      <BaseProfitability
        isPositive={trade.direction === "Buy"}
        isNegative={trade.direction === "Sell"}
      >
        {trade.direction}
      </BaseProfitability>
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--symbol">
      {trade.symbol}
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--volume">
      <NumberFormat
        value={formatValue(trade.volume, DECIMAL_SCALE / 2)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--price">
      <NumberFormat
        value={formatValue(trade.price, DECIMAL_SCALE)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--profit">
      <Profitability
        value={+formatValue(trade.profit, DECIMAL_SCALE)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatValue(trade.profit, DECIMAL_SCALE)}
          thousandSeparator=" "
          allowNegative={false}
          displayType="text"
        />
      </Profitability>
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--date">
      {moment(trade.date).format("lll")}
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--ticket">
      {trade.ticket}
    </TableCell>

    <TableCell className="details-trades__cell program-details-trades__cell--entry">
      {trade.entry}
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--entry">
      {trade.providers.map(provider => `${provider.program.title}, `)}
    </TableCell>
  </TableRow>
);

export default React.memo(TradeRow);
