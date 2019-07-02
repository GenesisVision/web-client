import { SignalTradingEvent } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";

const _TradesLogRow: React.FC<Props> = ({ event }) => (
  <TableRow className="details-trades__row">
    <TableCell className="details-trades__cell ">
      {moment(event.date).format()}
    </TableCell>
    <TableCell className="details-trades__cell ">{event.message}</TableCell>
  </TableRow>
);

const TradesLogRow = React.memo(_TradesLogRow);
export default TradesLogRow;

interface Props {
  event: SignalTradingEvent;
}
