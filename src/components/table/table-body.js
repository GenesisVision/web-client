import React from "react";

import { TableContext } from "./table";

const TableBody = ({ children }) => {
  const renderBody = context => {
    if (context === undefined) return <div>Loading</div>;
    return context.items.map(x => children(x));
  };

  return (
    <div className="table__body">
      <TableContext.Consumer>
        {context => renderBody(context)}
      </TableContext.Consumer>
    </div>
  );
};

export default TableBody;
