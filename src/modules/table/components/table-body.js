import React, { Fragment } from "react";

const TableBody = ({ items, children, tag: Tag, className }) => {
  const renderItems = () => {
    if (items === null || items === undefined)
      return Tag === "div" ? (
        <div className="message">Loading...</div>
      ) : (
        <tr>
          <td>
            <div className="message">Loading...</div>
          </td>
        </tr>
      );
    if (items.length === 0)
      return Tag === "div" ? (
        <div className="message">There are no items.</div>
      ) : (
        <tr>
          <td>
            <div className="message">There are no items.</div>
          </td>
        </tr>
      );
    return items.map(x => <Fragment key={x.id}>{children(x)}</Fragment>);
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default TableBody;
