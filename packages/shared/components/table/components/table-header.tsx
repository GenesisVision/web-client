import * as React from "react";

import {
  getSortingColumnName,
  getSortingDirection,
  SORTING_DIRECTION
} from "../helpers/sorting.helpers";
import TableHeadCell from "./table-head-cell";
import TableRow from "./table-row";
import { SortingColumn } from "./filtering/filter.type";

interface ITableHeaderProps {
  sorting: string;
  updateSorting(opt: string): () => void;
  columns: SortingColumn[];
  children(column: SortingColumn): JSX.Element;
}

class TableHeader extends React.Component<ITableHeaderProps> {
  sortingName = (): string => getSortingColumnName(this.props.sorting);

  getSortingDirection = (sortingName: string): SORTING_DIRECTION => {
    if (sortingName !== this.sortingName()) return SORTING_DIRECTION.NONE;
    return getSortingDirection(this.props.sorting);
  };

  isSortable = (sortingName: string): boolean => sortingName !== undefined;

  handleSorting = (sortingName: string) => (): (() => void) => {
    if (
      sortingName !== this.sortingName() ||
      getSortingDirection(this.props.sorting) === SORTING_DIRECTION.ASC
    ) {
      return this.props.updateSorting(sortingName + SORTING_DIRECTION.DESC);
    }

    return this.props.updateSorting(sortingName + SORTING_DIRECTION.ASC);
  };

  renderColumns = (): JSX.Element[] =>
    this.props.columns.map(column => {
      return (
        <TableHeadCell
          key={column.name}
          sortable={
            !!this.props.updateSorting && this.isSortable(column.sortingName)
          }
          onClick={this.handleSorting(column.sortingName)}
          sortingDirection={this.getSortingDirection(column.sortingName)}
        >
          {this.props.children(column)}
        </TableHeadCell>
      );
    });

  render() {
    return (
      <thead className="table__head">
        <TableRow className="table__row--head">{this.renderColumns()}</TableRow>
      </thead>
    );
  }
}

export default TableHeader;
