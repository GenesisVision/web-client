import { Center } from "components/center/center";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { BinanceWorkingType } from "gv-api-web";
import { FullPosition } from "pages/trade/binance-trade-page/trading/terminal.types";
import { ClosePositionContainer } from "pages/trade/binance-trade-page/trading/trading-tables/positions/close-position/close-position.container";
import {
  CloseTableCell,
  LeverageBadge,
  StyledTableCell
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";
import React, { useContext } from "react";

import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";
import { TerminalFuturesContext } from "../../contexts/terminal-futures.context";
import { TerminalInfoContext } from "../../contexts/terminal-info.context";
import { TerminalTickerContext } from "../../contexts/terminal-ticker.context";
import {
  getSymbolFilters,
  getSymbolFromState,
  getTextColor
} from "../../terminal.helpers";
import { calculateROE, calculateUnrealizedPNL } from "./positions.helpers";

interface Props {
  position: FullPosition;
  workingType: BinanceWorkingType;
}

const _PositionsRow: React.FC<Props> = ({
  workingType,
  position: {
    positionSide,
    entryPrice,
    isolated,
    leverage,
    quantity,
    symbol,
    unrealizedPnl,
    initialMargin,
    openOrderInitialMargin,
    maintMargin,
    maxNotional,
    positionInitialMargin,
    liquidationPrice,
    isAutoAddMargin,
    isolatedMargin,
    marginType,
    unrealizedPnL,
    updateTime
  }
}) => {
  const { markPrices, items } = useContext(TerminalTickerContext);
  const { exchangeInfo, setSymbol } = useContext(TerminalInfoContext);
  const symbolInfo = exchangeInfo!.symbols.find(
    item => symbol === item.baseAsset + item.quoteAsset
  );

  const {
    baseAsset,
    quoteAsset,
    priceFilter: { tickSize }
  } = symbolInfo!;

  const mark = markPrices?.find(item => item.symbol === symbol);
  const markPrice = mark ? mark.markPrice : 0;
  const item = items?.find(item => item.symbol === symbol);
  const lastPrice = item ? item.lastPrice : 0;

  const pnl = calculateUnrealizedPNL({
    quantity,
    entryPrice,
    workingType,
    lastPrice,
    markPrice
  });

  const roe = calculateROE({ quantity, pnl, markPrice, leverage });

  const notionalSize = Math.abs(markPrice * quantity);

  const margin = isolated
    ? isolatedMargin - unrealizedPnl
    : notionalSize / leverage;

  return (
    <TableRow>
      <StyledTableCell
        style={{ cursor: "pointer" }}
        firstOffset={false}
        onClick={() => setSymbol({ baseAsset, quoteAsset })}
      >
        {/* leverage обновлять leverage. Мб через сокет */}
        <Center>
          {symbol} <LeverageBadge>{leverage}x</LeverageBadge>
        </Center>
      </StyledTableCell>
      <StyledTableCell>
        {/* quantity обновлять через сокет */}
        <Text color={getTextColor(quantity)}>{`${quantity} ${baseAsset}`}</Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* entryPrice обновлять через сокет */}
        <Text>
          {terminalMoneyFormat({
            amount: entryPrice,
            tickSize: String(tickSize)
          })}
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        <Text>
          {terminalMoneyFormat({
            amount: markPrice,
            tickSize: String(tickSize)
          })}
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* liq price ебанутая формула. Возможно брать значение из positionRisk. Может быть -- */}
        <Text color={"yellow"}>
          {terminalMoneyFormat({
            amount: liquidationPrice,
            tickSize: String(tickSize)
          })}
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* margin ratio у cross одинаковая. maintmargin /   */}
        <Text>{"-"}</Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* margin можно добавлять и убирать маржу только в isolated */}
        <Text wrap={false} as={"div"}>
          {`${terminalMoneyFormat({
            amount: margin,
            tickSize: "0.01"
          })} USDT`}
        </Text>
        <Text>{isolated ? "(Isolated)" : "(Cross)"}</Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* pnl roe https://www.binance.com/en/support/faq/3a55a23768cb416fb404f06ffedde4b2 */}
        <Text wrap={false} as={"div"} color={getTextColor(pnl)}>
          {`${terminalMoneyFormat({
            amount: pnl,
            tickSize: "0.01"
          })} ${quoteAsset}`}
        </Text>
        <Text color={getTextColor(roe)}>{`(${terminalMoneyFormat({
          amount: roe * 100,
          tickSize: "0.01"
        })}%)`}</Text>
      </StyledTableCell>
      <StyledTableCell>
        {/* tp/sl сделать компонент с попапом. Первоначальные данные для отображения хз откуда брать */}
        {"TP/SL "}
      </StyledTableCell>
      <StyledTableCell>
        {`${terminalMoneyFormat({
          amount: notionalSize,
          tickSize: "0.01"
        })} ${quoteAsset}`}
      </StyledTableCell>
      {/* <StyledTableCell>
        adl есть отдельный запрос. Пока оставить
      </StyledTableCell> */}
      <CloseTableCell>
        <ClosePositionContainer
          symbol={symbol}
          positionSide={positionSide}
          price={entryPrice}
          amount={quantity}
        />
      </CloseTableCell>

      {/* <StyledTableCell> */}
      {/*{(+positionAmount * +markPrice) / +leverage} ({marginType})*/}
      {/* {(+positionAmount * +0) / +leverage} ({"Cross"}) */}
      {/* </StyledTableCell> */}
      {/* <StyledTableCell>{unrealizedProfit}</StyledTableCell> */}
    </TableRow>
  );
};

export const PositionsRow = React.memo(_PositionsRow);
