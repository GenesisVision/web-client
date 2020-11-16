import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { TerminalTickerContext } from "pages/trade/binance-trade-page/trading/terminal-ticker.context";
import {
  formatValueWithTick,
  getSymbol
} from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TransferButton } from "pages/trade/binance-trade-page/trading/transfer/transfer.button";
import React, { useContext } from "react";

interface Props {
  asset: string;
  available: number;
  locked: number;
}

const _FundsFRow: React.FC<Props> = ({ asset, available, locked }) => {
  const { items: ticker } = useContext(TerminalTickerContext);
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
      <td>{formatValueWithTick(available, "0.00000001")}</td>
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
