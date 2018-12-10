import React, { Fragment } from "react";

import { CARDS_VIEW, TABLE_VIEW } from "../table.constants";
import TableLoaderCardRow from "./table-loader-card-row";
import TableLoaderTableRow from "./table-loader-table-row";

const TableLoader = ({ view }) => {
  switch (view) {
    case CARDS_VIEW:
      return <TableLoaderCardRow />;
    case TABLE_VIEW:
    default:
      return (
        <Fragment>
          <TableLoaderTableRow />
          <TableLoaderTableRow />
        </Fragment>
      );
  }
};

export default TableLoader;
