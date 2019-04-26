import * as React from "react";

import {
  SORTING_DIRECTION,
  getSortingColumnName,
  getSortingDirection
} from "../helpers/sorting.helpers";
import { SortingColumn } from "./filtering/filter.type";
import TableHeadCell from "./table-head-cell";
import TableRow from "./table-row";

export interface ITableHeaderBaseProps {
  columns: SortingColumn[];
  renderHeader(column: SortingColumn): JSX.Element;
}
export interface ITableHeaderProps extends ITableHeaderBaseProps {
  sorting?: string;
  updateSorting?(opt: string): ((dispatch: any, getState: any) => void) | void;
}

class TableHeader extends React.PureComponent<ITableHeaderProps> {
  sortingName = (): string => getSortingColumnName(this.props.sorting);

  getSortingDirection = (sortingName?: string): SORTING_DIRECTION => {
    if (sortingName !== this.sortingName()) return SORTING_DIRECTION.NONE;
    return getSortingDirection(this.props.sorting);
  };

  isSortable = (sortingName?: string): boolean => sortingName !== undefined;

  handleSorting = (sortingName?: string) => ():
    | ((dispatch: any, getState: any) => void)
    | void => {
    const { sorting, updateSorting } = this.props;
    if (
      sortingName !== this.sortingName() ||
      getSortingDirection(sorting) === SORTING_DIRECTION.ASC
    ) {
      return (
        updateSorting && updateSorting(sortingName + SORTING_DIRECTION.DESC)
      );
    }

    return updateSorting && updateSorting(sortingName + SORTING_DIRECTION.ASC);
  };

  renderColumns = (): JSX.Element[] =>
    (this.props.columns || []).map(column => {
      return (
        <TableHeadCell
          key={column.name}
          sortable={
            !!this.props.updateSorting && this.isSortable(column.sortingName)
          }
          onClick={this.handleSorting(column.sortingName)}
          sortingDirection={this.getSortingDirection(column.sortingName)}
        >
          {this.props.renderHeader && this.props.renderHeader(column)}
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
