import React, { Fragment } from "react";
import { translate } from "react-i18next";

const TableBody = ({ t, items, children, tag: Tag, className, isPending }) => {
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
    if (isPending || items === null || items === undefined)
      return setMessage(t("table.loading"));
    if (items.length === 0) return setMessage(t("table.no-items"));
    return items.map((x, idx) => (
      <Fragment key={x.id || idx}>{children(x)}</Fragment>
    ));
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default translate()(TableBody);
