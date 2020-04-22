import classNames from "classnames";
import {
  SORTING_DIRECTION,
  switchDirection
} from "components/table/helpers/sorting.helpers";
import { SortingType } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback } from "react";

interface Props {
  setSorting: (sorting: SortingType) => void;
  field: keyof MergedTickerSymbolType;
  sorting: SortingType;
}

export const MarketWatchHeaderCell: React.FC<Props> = React.memo(
  ({ field, sorting, children, setSorting }) => {
    const handleChangeSorting = useCallback(
      (field: keyof MergedTickerSymbolType) => () => {
        const direction =
          field !== sorting.field
            ? sorting.direction
            : switchDirection(sorting.direction);
        setSorting({ field, direction });
      },
      [setSorting, sorting]
    );
    const isSelected = field === sorting.field;
    return (
      <th className="market-watch__th" onClick={handleChangeSorting(field)}>
        <span
          className={classNames({
            "market-watch__th--asc":
              isSelected && sorting.direction === SORTING_DIRECTION.ASC,
            "market-watch__th--desc":
              isSelected && sorting.direction === SORTING_DIRECTION.DESC
          })}
        >
          {children}
        </span>
      </th>
    );
  }
);
