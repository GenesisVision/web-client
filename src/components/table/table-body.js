import React, { Fragment } from "react";

const TableBody = ({ items, children }) => {
  const renderItems = () => {
    if (items === undefined)
      return <div className="table__row">Loading...</div>;
    if (items.length === 0)
      return <div className="table__row">There are no items.</div>;
    return items.map(x => <Fragment key={x.id}>{children(x)}</Fragment>);
  };

  return <div className="table__body">{renderItems()}</div>;
};

export default TableBody;
