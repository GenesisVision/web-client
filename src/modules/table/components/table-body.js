import React, { Fragment } from "react";

const TableBody = ({ items, children, tag: Tag, className }) => {
  const renderItems = () => {
    if (items === null || items === undefined)
      return <div className="message">Loading...</div>;
    if (items.length === 0)
      return <div className="message">There are no items.</div>;
    return items.map(x => <Fragment key={x.id}>{children(x)}</Fragment>);
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default TableBody;
