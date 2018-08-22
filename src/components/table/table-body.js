import React, { Fragment } from "react";

const TableBody = ({ items, children }) => {
  if (items === undefined) return <div>Loading...</div>;

  return (
    <div className="table__body">
      {items.map(x => (
        <Fragment key={x.id}>{children(x)}</Fragment>
      ))}
    </div>
  );
};

export default TableBody;
