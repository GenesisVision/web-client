import TableRow from "components/table/components/table-row";
import { Position } from "pages/trade/binance-trade-page/trading/terminal.types";
import React from "react";
import { ClosePositionContainer } from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.container";
import {
  CloseTableCell,
  StyledTableCell
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";

interface Props {
  marginRatio: number;
  position: Position;
}

const _PositionsRow: React.FC<Props> = ({
  marginRatio,
  position: {
    positionSide,
    entryPrice,
    leverage,
    positionAmount,
    symbol,
    unrealizedProfit
  }
}) => {
  return (
    <TableRow>
      <StyledTableCell firstOffset={false}>
        {symbol} {leverage}x
      </StyledTableCell>
      <StyledTableCell>{positionAmount}</StyledTableCell>
      <StyledTableCell>{entryPrice}</StyledTableCell>
      {/*<TableCell>{markPrice}</TableCell>*/}
      <StyledTableCell>{0}</StyledTableCell>
      {/*<TableCell>{liquidationPrice}</TableCell>*/}
      <StyledTableCell>{0}</StyledTableCell>
      <StyledTableCell>{marginRatio}</StyledTableCell>
      <StyledTableCell>
        {/*{(+positionAmount * +markPrice) / +leverage} ({marginType})*/}
        {(+positionAmount * +0) / +leverage} ({"Cross"})
      </StyledTableCell>
      <StyledTableCell>{unrealizedProfit}</StyledTableCell>
      <CloseTableCell>
        <ClosePositionContainer
          symbol={symbol}
          positionSide={positionSide}
          price={entryPrice}
          amount={positionAmount}
        />
      </CloseTableCell>
    </TableRow>
  );
};

export const PositionsRow = React.memo(_PositionsRow);
