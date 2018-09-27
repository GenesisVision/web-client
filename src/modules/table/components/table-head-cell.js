import classnames from "classnames";
import React from "react";

const TableHeadCell = ({
  sortable,
  active,
  isAsc,
  className,
  onClick,
  children
}) => {
  return (
    <th
      className={classnames("table__cell table__cell--head", className, {
        "table__cell--sortable": sortable
      })}
      onClick={sortable ? onClick : undefined}
    >
      <span
        className={classnames({
          "table__cell--sortable-asc": sortable && active && isAsc,
          "table__cell--sortable-desc": sortable && active && !isAsc
        })}
      >
        {children}
      </span>
    </th>
  );
};

export default TableHeadCell;
