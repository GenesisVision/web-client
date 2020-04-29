import { TableCell, TableRow } from "components/table/components";
import { SignalTradingEvent } from "gv-api-web";
import React from "react";
import { formatDate } from "utils/dates";

interface Props {
  trade: SignalTradingEvent;
}

const _ProgramTradingLogRow: React.FC<Props> = ({
  trade: { date, message }
}) => {
  return (
    <TableRow stripy>
      <TableCell>{formatDate(date)}</TableCell>
      <TableCell>{message}</TableCell>
    </TableRow>
  );
};
const ProgramTradingLogRow = React.memo(_ProgramTradingLogRow);
export default ProgramTradingLogRow;
