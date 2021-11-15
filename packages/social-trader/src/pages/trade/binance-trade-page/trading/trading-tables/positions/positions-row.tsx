import { Center } from "components/center/center";
import TableRow from "components/table/components/table-row";
import { Text } from "components/text/text";
import { BinanceFuturesMarginType, BinancePositionSide } from "gv-api-web";
import { SymbolState } from "pages/trade/binance-trade-page/trading/terminal.types";
import {
  CloseTableCell,
  LeverageBadge,
  StyledTableCell
} from "pages/trade/binance-trade-page/trading/trading-tables/positions/positions.styles";
import React from "react";

import LiquidationPriceCell from "../../components/liquidation-price/liquidation-price-cell";
import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";
import { getMarginRatioColor } from "../../margin-ratio/margin-ratio.helpers";
import { getTextColor } from "../../terminal.helpers";
import MarginTableCell from "../adjust-margin/margin-table-cell";
import TakeProfitStopLossTableCell from "../take-profit-stop-loss/take-profit-stop-loss-table-cell";
import { ClosePosition } from "./close-position/close-position";
import { USDTtickSize } from "./positions.helpers";

interface Props {
  marginRatio: number;
  maintMargin: number;
  margin: number;
  marginType: BinanceFuturesMarginType;
  pnl: number;
  roe: number;
  notionalSize: number;
  positionSide: BinancePositionSide;
  staleMarkPrice: number;
  markPrice: number;
  tickSize: string;
  stepSize: string;
  entryPrice: number;
  quantity: number;
  leverage: number;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  setSymbol: (symbol: SymbolState) => void;
  maintMarginRate?: number;
  maintAmount?: number;
}

const _PositionsRow: React.FC<Props> = ({
  marginRatio,
  maintMargin,
  maintMarginRate,
  maintAmount,
  margin,
  marginType,
  pnl,
  roe,
  notionalSize,
  positionSide,
  staleMarkPrice,
  markPrice,
  tickSize,
  stepSize,
  entryPrice,
  quantity,
  symbol,
  leverage,
  setSymbol,
  baseAsset,
  quoteAsset
}) => {
  return (
    <TableRow>
      <StyledTableCell
        style={{ cursor: "pointer" }}
        firstOffset={false}
        onClick={() => setSymbol({ baseAsset, quoteAsset })}
      >
        <Center>
          {symbol} <LeverageBadge>{leverage}x</LeverageBadge>
        </Center>
      </StyledTableCell>
      <StyledTableCell>
        <Text color={getTextColor(quantity)}>{`${quantity} ${baseAsset}`}</Text>
      </StyledTableCell>
      <StyledTableCell>
        <Text>
          {terminalMoneyFormat({
            amount: entryPrice,
            tickSize
          })}
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        <Text>
          {terminalMoneyFormat({
            amount: markPrice,
            tickSize
          })}
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        <LiquidationPriceCell
          tickSize={tickSize}
          symbol={symbol}
          positionSide={positionSide}
          quantity={quantity}
          marginType={marginType}
          entryPrice={entryPrice}
          maintMarginRate={maintMarginRate}
          maintAmount={maintAmount}
          isolatedWallet={margin}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Text color={getMarginRatioColor(marginRatio)}>
          {marginRatio.toFixed(2)} %
        </Text>
      </StyledTableCell>
      <StyledTableCell>
        <MarginTableCell
          maintAmount={maintAmount}
          maintMarginRate={maintMarginRate}
          maintMargin={maintMargin}
          entryPrice={entryPrice}
          leverage={leverage}
          markPrice={markPrice}
          quantity={quantity}
          marginType={marginType}
          quoteAsset={quoteAsset}
          tickSize={tickSize}
          margin={margin}
          positionSide={positionSide}
          symbol={symbol}
        />
      </StyledTableCell>
      <StyledTableCell>
        <Text wrap={false} as={"div"} color={getTextColor(pnl)}>
          {`${terminalMoneyFormat({
            amount: pnl,
            // fix hardcoded tickSize
            tickSize: USDTtickSize
          })} ${quoteAsset}`}
        </Text>
        <Text color={getTextColor(roe)}>{`(${terminalMoneyFormat({
          amount: roe * 100,
          // fix hardcoded tickSize
          tickSize: USDTtickSize
        })}%)`}</Text>
      </StyledTableCell>
      <StyledTableCell>
        <TakeProfitStopLossTableCell
          entryPrice={entryPrice}
          markPrice={markPrice}
          symbol={symbol}
          leverage={leverage}
          tickSize={tickSize}
          quantity={quantity}
          positionSide={positionSide}
        />
      </StyledTableCell>
      <StyledTableCell>
        {`${terminalMoneyFormat({
          amount: notionalSize,
          // fix hardcoded tickSize
          tickSize: USDTtickSize
        })} ${quoteAsset}`}
      </StyledTableCell>
      {/* <StyledTableCell>
        todo ADL
      </StyledTableCell> */}
      <CloseTableCell>
        <ClosePosition
          symbol={symbol}
          positionSide={positionSide}
          price={staleMarkPrice}
          quantity={quantity}
          tickSize={tickSize}
          stepSize={stepSize}
        />
      </CloseTableCell>
    </TableRow>
  );
};

export const PositionsRow = React.memo(_PositionsRow);
