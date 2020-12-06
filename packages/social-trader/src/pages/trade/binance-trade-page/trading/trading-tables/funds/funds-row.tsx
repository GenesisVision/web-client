import { useAccountCurrency } from "hooks/account-currency.hook";
import { useGetRate } from "hooks/get-rate.hook";
import { TerminalInfoContext } from "pages/trade/binance-trade-page/trading/terminal-info.context";
import { formatValueWithTick } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import { TransferButton } from "pages/trade/binance-trade-page/trading/transfer/transfer.button";
import React, { useContext, useEffect } from "react";
import { formatCurrencyValue } from "utils/formatter";

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
  const currency = useAccountCurrency();
  const { rate, getRate } = useGetRate();
  const { terminalType } = useContext(TerminalInfoContext);
  const total = formatValueWithTick(+available + +locked, "0.00000001");

  useEffect(() => {
    getRate({ from: asset, to: currency });
  }, [currency, asset]);

  return (
    <tr>
      <td>{asset}</td>
      <td>{total}</td>
      <td>{formatValueWithTick(available, "0.00000001")}</td>
      <td>{locked}</td>
      <td>{formatCurrencyValue(+total * rate, currency)}</td>
      {terminalType === "futures" && (
        <td>
          <TransferButton asset={asset} />
        </td>
      )}
    </tr>
  );
};

export const FundsRow = React.memo(_FundsRow);
