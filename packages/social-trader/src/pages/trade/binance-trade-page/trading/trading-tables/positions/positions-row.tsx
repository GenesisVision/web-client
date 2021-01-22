import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { FuturesPositionInformation } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";

interface Props {
  marginRatio: number;
  position: FuturesPositionInformation;
}

const _PositionsRow: React.FC<Props> = ({
  marginRatio,
  position: {
    liquidationPrice,
    entryPrice,
    leverage,
    markPrice,
    positionAmt,
    symbol,
    marginType,
    unRealizedProfit
  }
}) => {
  return (
    <TableRow>
      <TableCell firstOffset={false}>
        {symbol} {leverage}x
      </TableCell>
      <TableCell>{positionAmt}</TableCell>
      <TableCell>{entryPrice}</TableCell>
      <TableCell>{markPrice}</TableCell>
      <TableCell>{liquidationPrice}</TableCell>
      <TableCell>{marginRatio}</TableCell>
      <TableCell>
        {(+positionAmt * +markPrice) / +leverage} ({marginType})
      </TableCell>
      <TableCell>{unRealizedProfit}</TableCell>
    </TableRow>
  );
};

export const PositionsRow = React.memo(_PositionsRow);
