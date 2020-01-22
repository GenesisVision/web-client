import "./sorting-filter.scss";

import GVButton from "components/gv-button";
import { TableToolbarItemBlock } from "components/table/components/table-toolbar-item.block";
import React, { useCallback } from "react";

import {
  getSortingColumnName,
  getSortingDirection,
  SORTING_DIRECTION
} from "../../../helpers/sorting.helpers";
import {
  SelectFilterValue,
  SortingColumn,
  TFilter
} from "../../filtering/filter.type";
import SelectFilter from "../../filtering/select-filter/select-filter";

export const SORTING_FILTER_NAME = "sorting";

const _SortingFilter: React.FC<ISortingFilterProps> = ({
  renderValueText,
  columns,
  updateSorting,
  sorting
}) => {
  const handleOnSelectChange = useCallback(
    ({ value }: TFilter<any>): void =>
      updateSorting &&
      updateSorting(
        value + (isAsc() ? SORTING_DIRECTION.ASC : SORTING_DIRECTION.DESC)
      ),
    [updateSorting]
  );

  const handleOnDirectionChange = (isAsc: boolean) => (): void =>
    updateSorting &&
    updateSorting(
      composeSortingColumnName() +
        (isAsc ? SORTING_DIRECTION.ASC : SORTING_DIRECTION.DESC)
    );

  const composeSortingColumnName = (): string => getSortingColumnName(sorting);

  const composeSortingColumnValues = (): SelectFilterValue[] =>
    (columns || [])
      .filter(x => x.sortingName)
      .map(x => ({
        value: x.sortingName,
        label: renderValueText && renderValueText(x)
      }));

  const isAsc = (): boolean =>
    getSortingDirection(sorting) === SORTING_DIRECTION.ASC;

  const columnValues = composeSortingColumnValues();

  return (
    <TableToolbarItemBlock className="sorting-filter">
      <SelectFilter
        name={SORTING_FILTER_NAME}
        label="Order By"
        value={composeSortingColumnName()}
        values={columnValues}
        onChange={handleOnSelectChange}
      />
      <GVButton
        variant="text"
        color="secondary"
        className="sorting-filter__btn"
        onClick={handleOnDirectionChange(!isAsc())}
      >
        {isAsc() ? <span>&uarr;</span> : <span>&darr;</span>}
      </GVButton>
    </TableToolbarItemBlock>
  );
};

interface ISortingFilterProps {
  sorting?: string;
  columns?: SortingColumn[];
  renderValueText?(value: SortingColumn): JSX.Element | string;
  onChange?(): void;
  updateSorting?(value: string): void;
}

const SortingFilter = React.memo(_SortingFilter);
export default SortingFilter;
