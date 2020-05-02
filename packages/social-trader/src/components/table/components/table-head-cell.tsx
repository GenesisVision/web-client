import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

import { SORTING_DIRECTION } from "../helpers/sorting.helpers";
import styles from "./table.module.scss";

interface ITableHeadCellProps extends React.HTMLAttributes<HTMLDivElement> {
  sortable: boolean;
  sortingDirection: SORTING_DIRECTION;
  className?: string;
  onClick(): void;
}

const _TableHeadCell: React.FC<ITableHeadCellProps> = ({
  sortable,
  sortingDirection,
  className,
  onClick,
  children
}) => {
  return (
    <th
      className={classNames(
        styles["table__cell"],
        styles["table__cell--head"],
        className
      )}
      onClick={sortable ? onClick : undefined}
    >
      {sortable ? (
        <span
          className={classNames({
            [styles["sortable-asc"]]:
              sortingDirection === SORTING_DIRECTION.ASC,
            [styles["sortable-desc"]]:
              sortingDirection === SORTING_DIRECTION.DESC
          })}
        >
          {children}
        </span>
      ) : (
        <MutedText>{children}</MutedText>
      )}
    </th>
  );
};

const TableHeadCell = React.memo(_TableHeadCell);
export default TableHeadCell;
