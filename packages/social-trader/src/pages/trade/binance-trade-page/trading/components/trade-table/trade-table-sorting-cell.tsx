import clsx from "clsx";
import {
  SORTING_DIRECTION,
  switchDirection
} from "components/table/helpers/sorting.helpers";
import React, { useCallback } from "react";
import { AnyObjectType } from "utils/types";

import { TradeTableSortingType } from "./table-trade.helpers";
import styles from "./trade-table.module.scss";

interface Props {
  right?: boolean;
  dataType: "number" | "string";
  setSorting: (sorting: TradeTableSortingType) => void;
  field: keyof AnyObjectType;
  sorting: TradeTableSortingType;
}

export const TradeTableHeaderCell: React.FC<Props> = React.memo(
  ({ right, dataType, field, sorting, children, setSorting }) => {
    const handleChangeSorting = useCallback(
      (field: keyof AnyObjectType) => () => {
        const direction =
          field !== sorting.field
            ? sorting.direction
            : switchDirection(sorting.direction);
        setSorting({ dataType, field, direction });
      },
      [setSorting, sorting, dataType]
    );
    const isSelected = field === sorting.field;
    return (
      <th
        className={clsx({
          [styles["trading-table-sorting-cell--right"]]: right
        })}
        onClick={handleChangeSorting(field)}
      >
        <span
          className={clsx({
            [styles["trading-table-sorting-cell--asc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.ASC,
            [styles["trading-table-sorting-cell--desc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.DESC
          })}
        >
          {children}
        </span>
      </th>
    );
  }
);
