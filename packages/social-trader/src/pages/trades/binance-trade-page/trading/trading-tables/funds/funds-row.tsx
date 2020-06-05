import { getSymbolPrice } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import {
  formatValueWithTick,
  getSymbol
} from "pages/trades/binance-trade-page/trading/terminal.helpers";
import { TradingTickerContext } from "pages/trades/binance-trade-page/trading/trading-ticker.context";
import { TransferButton } from "pages/trades/binance-trade-page/trading/transfer/transfer.button";
import React, { useContext } from "react";

interface Props {
  asset: string;
  available: string;
  locked: string;
}

const _FundsFRow: React.FC<Props> = ({ asset, available, locked }) => {
  const ticker = useContext(TradingTickerContext);
  const { tickSize, terminalType } = useContext(TerminalInfoContext);
  const symbol = getSymbol(asset, "BTC");
  // const price = ticker ? getSymbolPrice(ticker, symbol) : 0;
  const price = "0";
  const total = formatValueWithTick(+available + +locked, "0.00000001");
  const btcValue = formatValueWithTick(+total * +price, tickSize);
  return (
    <tr>
      <td>{asset}</td>
      <td>{total}</td>
      <td>{available}</td>
      <td>{locked}</td>
      <td>{btcValue}</td>
      {terminalType === "futures" && (
        <td>
          <TransferButton asset={asset} />
        </td>
      )}
    </tr>
  );
};

export const FundsRow = React.memo(_FundsFRow);
