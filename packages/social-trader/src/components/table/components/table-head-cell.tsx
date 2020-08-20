import clsx from "clsx";
import { SortableIcon } from "components/table/components/sortable-icon";
import { Text } from "components/text/text";
import * as React from "react";

import { SORTING_DIRECTION } from "../helpers/sorting.helpers";
import styles from "./table.module.scss";

interface ITableHeadCellProps extends React.HTMLAttributes<HTMLDivElement> {
  sortable: boolean;
  sortingDirection: SORTING_DIRECTION;
  className?: string;
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
      className={clsx(
        styles["table__cell--first-offset"],
        styles["table__cell"],
        styles["table__cell--medium"],
        styles["table__cell--head"],
        className
      )}
      onClick={sortable ? onClick : undefined}
    >
      {sortable ? (
        <SortableIcon sortingDirection={sortingDirection}>
          {children}
        </SortableIcon>
      ) : (
        <Text muted>{children}</Text>
      )}
    </th>
  );
};

const TableHeadCell = React.memo(_TableHeadCell);
export default TableHeadCell;
