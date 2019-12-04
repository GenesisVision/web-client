import * as React from "react";

import { LIST_VIEW } from "../table.constants";
import TableLoaderCardRow from "./table-loader-card-row";
import TableLoaderTableRow from "./table-loader-table-row";

const TableLoader: React.FC<{ view?: LIST_VIEW }> = React.memo(({ view }) => {
  switch (view) {
    case LIST_VIEW.CARDS:
      return <TableLoaderCardRow />;
    case LIST_VIEW.TABLE:
    default:
      return (
        <>
          <TableLoaderTableRow />
          <TableLoaderTableRow />
        </>
      );
  }
});

export default React.memo(TableLoader);
