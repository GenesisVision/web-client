import { formatValueWithTick } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React from "react";

interface Props {
  asset: string;
  amountInCurrency: number;
  available: number;
  locked: number;
}

const _FundsRow: React.FC<Props> = ({
  amountInCurrency,
  asset,
  available,
  locked
}) => {
  const total = formatValueWithTick(+available + +locked, "0.00000001");

  return (
    <tr>
      <td>{asset}</td>
      <td>{total}</td>
      <td>{formatValueWithTick(available, "0.00000001")}</td>
      <td>{locked}</td>
      <td>{amountInCurrency < 0 ? "—" : amountInCurrency}</td>
    </tr>
  );
};

export const FundsRow = React.memo(_FundsRow);
