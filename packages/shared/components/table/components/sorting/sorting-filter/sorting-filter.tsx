import "./sorting-filter.scss";

import { GVButton } from "gv-react-components";
import * as React from "react";

import {
  SORTING_DIRECTION,
  getSortingColumnName,
  getSortingDirection
} from "../../../helpers/sorting.helpers";
import SelectFilter from "../../filtering/select-filter/select-filter";
import {
  SelectFilterValue,
  SortingColumn,
  TFilter
} from "../../filtering/filter.type";

interface ISortingFilterProps {
  sorting: string;
  columns?: SortingColumn[];
  renderValueText?(value: SortingColumn): JSX.Element | string;
  onChange?(): void;
  updateSorting(value: string): void;
}

class SortingFilter extends React.Component<ISortingFilterProps> {
  composeSortingColumnValues = (): SelectFilterValue[] =>
    (this.props.columns || [])
      .filter(x => x.sortingName)
      .map(x => ({
        value: x.sortingName,
        label: this.props.renderValueText && this.props.renderValueText(x)
      }));

  composeSortingColumnName = (): string =>
    getSortingColumnName(this.props.sorting);

  isAsc = (): boolean =>
    getSortingDirection(this.props.sorting) === SORTING_DIRECTION.ASC;

  handleOnSelectChange = ({ value }: TFilter<any>): void =>
    this.props.updateSorting(
      value + (this.isAsc() ? SORTING_DIRECTION.ASC : SORTING_DIRECTION.DESC)
    );

  handleOnDirectionChange = (isAsc: boolean) => (): void =>
    this.props.updateSorting(
      this.composeSortingColumnName() +
        (isAsc ? SORTING_DIRECTION.ASC : SORTING_DIRECTION.DESC)
    );

  render() {
    const columnValues = this.composeSortingColumnValues();
    return (
      <span className="sorting-filter">
        <SelectFilter
          name="sorting"
          label="Order By"
          value={this.composeSortingColumnName()}
          values={columnValues}
          onChange={this.handleOnSelectChange}
        />
        <GVButton
          variant="text"
          color="secondary"
          className="sorting-filter__btn"
          onClick={this.handleOnDirectionChange(!this.isAsc())}
        >
          {this.isAsc() ? <span>&uarr;</span> : <span>&darr;</span>}
        </GVButton>
      </span>
    );
  }
}

export default SortingFilter;
