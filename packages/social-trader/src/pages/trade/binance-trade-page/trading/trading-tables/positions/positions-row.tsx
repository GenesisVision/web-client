import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { Position } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";

interface Props {
  marginRatio: number;
  position: Position;
}

const _PositionsRow: React.FC<Props> = ({
  marginRatio,
  position: { entryPrice, leverage, positionAmount, symbol, unrealizedProfit }
}) => {
  return (
    <TableRow>
      <TableCell firstOffset={false}>
        {symbol} {leverage}x
      </TableCell>
      <TableCell>{positionAmount}</TableCell>
      <TableCell>{entryPrice}</TableCell>
      {/*<TableCell>{markPrice}</TableCell>*/}
      <TableCell>{0}</TableCell>
      {/*<TableCell>{liquidationPrice}</TableCell>*/}
      <TableCell>{0}</TableCell>
      <TableCell>{marginRatio}</TableCell>
      <TableCell>
        {/*{(+positionAmount * +markPrice) / +leverage} ({marginType})*/}
        {(+positionAmount * +0) / +leverage} ({"Cross"})
      </TableCell>
      <TableCell>{unrealizedProfit}</TableCell>
    </TableRow>
  );
};

export const PositionsRow = React.memo(_PositionsRow);
