import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatDate } from "shared/utils/dates";
import { formatValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramOpenPositionsRow: React.FC<Props> = ({ position, currency }) => (
  <TableRow stripy>
    <TableCell className="details-trades__cell program-details-trades__cell--date">
      {formatDate(position.date)}
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--symbol">
      {position.symbol}
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--direction">
      <BaseProfitability
        isPositive={position.direction === "Buy"}
        isNegative={position.direction === "Sell"}
      >
        {position.direction}
      </BaseProfitability>
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--volume">
      <NumberFormat
        value={formatValue(position.volume, DEFAULT_DECIMAL_SCALE / 2)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--price">
      <NumberFormat
        value={formatValue(position.price, DEFAULT_DECIMAL_SCALE)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--priceCurrent">
      <NumberFormat
        value={formatValue(position.priceCurrent, DEFAULT_DECIMAL_SCALE)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    <TableCell className="details-trades__cell program-details-trades__cell--profit">
      <Profitability
        value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
          thousandSeparator=" "
          displayType="text"
          allowNegative={false}
          suffix={` ${currency}`}
        />
      </Profitability>
    </TableCell>
  </TableRow>
);

interface Props {
  currency: CurrencyEnum;
  position: OrderModel;
}

const ProgramOpenPositionsRow = React.memo(_ProgramOpenPositionsRow);
export default ProgramOpenPositionsRow;
