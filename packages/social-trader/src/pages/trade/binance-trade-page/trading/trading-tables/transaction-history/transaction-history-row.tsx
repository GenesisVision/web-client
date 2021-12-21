import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { BinanceIncomeType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

import { terminalMoneyFormat } from "../../components/terminal-money-format/terminal-money-format";
import { DEFAULT_TICKSIZE } from "../../terminal.helpers";
import { getIncomeTypeLabel } from "./transaction-history.helpers";

interface Props {
  time: Date;
  asset: string;
  symbol: string;
  incomeType: BinanceIncomeType;
  income: number;
}

export const TransactionHistoryRow: React.FC<Props> = ({
  time,
  asset,
  symbol,
  income,
  incomeType
}) => {
  const [t] = useTranslation();
  return (
    <TableRow>
      <TableCell firstOffset={false}>{formatDate(new Date(time))}</TableCell>
      <TableCell>{getIncomeTypeLabel(t, incomeType)}</TableCell>
      <TableCell>
        {terminalMoneyFormat({
          amount: income,
          tickSize: DEFAULT_TICKSIZE
        })}
      </TableCell>
      <TableCell>{asset}</TableCell>
      <TableCell>{symbol}</TableCell>
    </TableRow>
  );
};
