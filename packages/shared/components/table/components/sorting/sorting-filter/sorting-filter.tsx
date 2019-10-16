import "./sorting-filter.scss";

import React, { useCallback } from "react";
import GVButton from "shared/components/gv-button";

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
    [isAsc, updateSorting]
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

  const isAsc = useCallback(
    (): boolean => getSortingDirection(sorting) === SORTING_DIRECTION.ASC
  );

  const columnValues = composeSortingColumnValues();

  return (
    <span className="sorting-filter">
      <SelectFilter
        name="sorting"
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
    </span>
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
