import { OrderSignalProgramInfo } from "gv-api-web";
import * as React from "react";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";

const TradeSubRow: React.FC<Props> = props => {
  const { provider } = props;
  return (
    <TableRow key={provider.programId}>
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {provider.program.title}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction">
        {provider.volume}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
      <TableCell className="details-trades__cell program-details-trades__cell--direction" />
    </TableRow>
  );
};

export default TradeSubRow;

interface Props {
  provider: OrderSignalProgramInfo;
}
