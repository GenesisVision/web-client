import classNames from "classnames";
import * as React from "react";

import { SORTING_DIRECTION } from "../helpers/sorting.helpers";

interface ITableHeadCellProps extends React.HTMLAttributes<HTMLDivElement> {
  sortable: boolean;
  sortingDirection: SORTING_DIRECTION;
  className?: string;
  onClick(): void;
}

const TableHeadCell: React.FC<ITableHeadCellProps> = ({
  sortable,
  sortingDirection,
  className,
  onClick,
  children
}) => {
  return (
    <th
      className={classNames("table__cell table__cell--head", className, {
        "table__cell--sortable": sortable
      })}
      onClick={sortable ? onClick : undefined}
    >
      <span
        className={classNames({
          "table__cell--sortable-asc":
            sortingDirection === SORTING_DIRECTION.ASC,
          "table__cell--sortable-desc":
            sortingDirection === SORTING_DIRECTION.DESC
        })}
      >
        {children}
      </span>
    </th>
  );
};

export default React.memo(TableHeadCell);
