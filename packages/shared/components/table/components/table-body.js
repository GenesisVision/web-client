import React, { Fragment } from "react";
import { translate } from "react-i18next";

import { CARDS_VIEW, TABLE_VIEW } from "../table.constants";
import TableLoader from "./table-loader";

const TableBody = ({
  t,
  items,
  children,
  tag: Tag,
  className,
  isPending,
  view
}) => {
  const setMessage = message => {
    switch (view) {
      case CARDS_VIEW:
        return <div className="message">{message}</div>;
      case TABLE_VIEW:
      default:
        return (
          <tr>
            <td colSpan="11">
              <div className="message">{message}</div>
            </td>
          </tr>
        );
    }
  };

  const renderItems = () => {
    if (isPending || items === null || items === undefined)
      return <TableLoader view={view} />;
    if (items.length === 0) return setMessage(t("table.no-items"));
    return items.map((x, idx) => (
      <Fragment key={x.id || idx}>{children(x)}</Fragment>
    ));
  };

  return <Tag className={className}>{renderItems()}</Tag>;
};

export default translate()(TableBody);
