import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { DEFAULT_TICKSIZE } from "pages/trade/binance-trade-page/trading/terminal.helpers";
import React from "react";

import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";

interface Props {
  asset: string;
  walletBalance: number;
  unrealizedPnl: number;
  available: number;
  marginBalance: number;
}

const _AssetsRow: React.FC<Props> = ({
  asset,
  walletBalance,
  unrealizedPnl,
  available,
  marginBalance
}) => {
  return (
    <TableRow>
      <TableCell firstOffset={false}>{asset}</TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: walletBalance,
          tickSize: DEFAULT_TICKSIZE
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: unrealizedPnl,
          tickSize: DEFAULT_TICKSIZE
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: available,
          tickSize: DEFAULT_TICKSIZE
        })}
      </TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: marginBalance,
          tickSize: DEFAULT_TICKSIZE
        })}
      </TableCell>
    </TableRow>
  );
};

export const AssetsRow = React.memo(_AssetsRow);
