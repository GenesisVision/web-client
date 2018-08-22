import "./table.scss";

import React from "react";

export const TableContext = React.createContext({
  items: undefined,
  columns: undefined,
  isPending: false
});

const Table = ({ items, children }) => {
  return (
    <TableContext.Provider value={{ items: items }}>
      <div className="table">{children}</div>
    </TableContext.Provider>
  );
};

export default Table;
