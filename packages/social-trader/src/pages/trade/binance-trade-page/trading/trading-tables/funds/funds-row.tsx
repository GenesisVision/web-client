import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { formatValueWithTick } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TransferButton } from "pages/trade/binance-trade-page/trading/transfer/transfer.button";
import React, { useContext } from "react";

interface Props {
  asset: string;
  amountInCurrency: number;
  available: number;
  locked: number;
}

const _FundsFRow: React.FC<Props> = ({
  amountInCurrency,
  asset,
  available,
  locked
}) => {
  const { terminalType } = useContext(TerminalInfoContext);
  const total = formatValueWithTick(+available + +locked, "0.00000001");
  return (
    <tr>
      <td>{asset}</td>
      <td>{total}</td>
      <td>{formatValueWithTick(available, "0.00000001")}</td>
      <td>{locked}</td>
      <td>{amountInCurrency}</td>
      {terminalType === "futures" && (
        <td>
          <TransferButton asset={asset} />
        </td>
      )}
    </tr>
  );
};

export const FundsRow = React.memo(_FundsFRow);
