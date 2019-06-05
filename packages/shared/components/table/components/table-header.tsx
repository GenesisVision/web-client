import * as React from "react";
import { useCallback } from "react";
import { Dispatch } from "redux";
import withLoader from "shared/decorators/with-loader";
import { TGetState } from "shared/utils/types";

import {
  SORTING_DIRECTION,
  getSortingColumnName,
  getSortingDirection as getSortingDirectionHelper
} from "../helpers/sorting.helpers";
import { SortingColumn } from "./filtering/filter.type";
import TableHeadCell from "./table-head-cell";
import TableRow from "./table-row";
import { UpdateSortingFuncType } from "./table.types";

export interface ITableHeaderProps {
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  columns?: SortingColumn[];
  renderHeader?(column: SortingColumn): JSX.Element;
}

const TableHeader: React.FC<ITableHeaderProps> = ({
  sorting,
  updateSorting,
  columns,
  renderHeader
}) => {
  const getSortingName = (): string => getSortingColumnName(sorting);

  const getSortingDirection = useCallback(
    (name?: string): SORTING_DIRECTION =>
      (name !== getSortingName() && SORTING_DIRECTION.NONE) ||
      getSortingDirectionHelper(sorting),
    [sorting]
  );

  const isSortable = useCallback(
    (sortingName?: string): boolean => sortingName !== undefined,
    []
  );

  const handleSorting: HandleSortingType = useCallback(
    name => () => {
      if (
        name !== getSortingName() ||
        getSortingDirectionHelper(sorting) === SORTING_DIRECTION.ASC
      ) {
        return updateSorting && updateSorting(name + SORTING_DIRECTION.DESC);
      }
      return updateSorting && updateSorting(name + SORTING_DIRECTION.ASC);
    },
    [updateSorting, sorting]
  );

  return (
    <thead className="table__head">
      <TableRow className="table__row--head">
        <Columns
          condition={!!columns}
          columns={columns!}
          updateSorting={updateSorting}
          renderHeader={renderHeader}
          isSortable={isSortable}
          handleSorting={handleSorting}
          getSortingDirection={getSortingDirection}
        />
      </TableRow>
    </thead>
  );
};

const _Columns: React.FC<IColumnsProps> = ({
  columns,
  updateSorting,
  renderHeader,
  isSortable,
  handleSorting,
  getSortingDirection
}) => (
  <>
    {columns.map(column => (
      <TableHeadCell
        key={column.name}
        sortable={!!updateSorting && isSortable(column.sortingName)}
        onClick={handleSorting(column.sortingName)}
        sortingDirection={getSortingDirection(column.sortingName)}
      >
        {renderHeader && renderHeader(column)}
      </TableHeadCell>
    ))}
  </>
);
const Columns = React.memo(withLoader(_Columns));

interface IColumnsProps {
  getSortingDirection: (name?: string) => SORTING_DIRECTION;
  isSortable: (sortingName?: string) => boolean;
  handleSorting: HandleSortingType;
  columns: SortingColumn[];
  updateSorting?: UpdateSortingFuncType;
  renderHeader?(column: SortingColumn): JSX.Element;
}

type HandleSortingType = (
  sortingName?: string
) => () => ((dispatch: Dispatch, getState: TGetState) => void) | void;

export default TableHeader;
