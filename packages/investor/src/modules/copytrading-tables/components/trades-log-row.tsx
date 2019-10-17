import { SignalTradingEvent } from "gv-api-web";
import * as React from "react";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import { formatDate } from "shared/utils/dates";

const _TradesLogRow: React.FC<Props> = ({ event }) => (
  <TableRow stripy>
    <TableCell className="details-trades__cell ">
      {formatDate(event.date)}
    </TableCell>
    <TableCell className="details-trades__cell ">{event.message}</TableCell>
  </TableRow>
);

const TradesLogRow = React.memo(_TradesLogRow);
export default TradesLogRow;

interface Props {
  event: SignalTradingEvent;
}
