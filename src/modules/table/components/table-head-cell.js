import classnames from "classnames";
import React from "react";

import { SortingDirection } from "../helpers/sorting.helpers";

const TableHeadCell = ({
  sortable,
  sortingDirection,
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
          "table__cell--sortable-asc":
            sortingDirection === SortingDirection.asc,
          "table__cell--sortable-desc":
            sortingDirection === SortingDirection.desc
        })}
      >
        {children}
      </span>
    </th>
  );
};

export default TableHeadCell;
