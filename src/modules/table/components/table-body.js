import React, { Fragment } from "react";

const TableBody = ({ items, children, tag: Tag, className }) => {
  const setMessage = message => {
    return Tag === "tbody" ? (
      <tr>
        <td colSpan="11">
          <div className="message">{message}</div>
        </td>
      </tr>
    ) : (
      <div className="message">{message}</div>
    );
  };
  const renderItems = () => {
    if (items === null || items === undefined) return setMessage("Loading...");
    if (items.length === 0) return setMessage("There are no items.");
    return items.map((x, idx) => <Fragment key={idx}>{children(x)}</Fragment>);
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default TableBody;
