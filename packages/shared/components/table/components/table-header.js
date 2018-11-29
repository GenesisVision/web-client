import React, { Component } from "react";

import {
  SortingDirection,
  getSortingColumnName,
  getSortingDirection
} from "../helpers/sorting.helpers";
import TableRow from "./table-row";
import TableHeadCell from "./table-head-cell";

class TableHeader extends Component {
  sortingName = () => getSortingColumnName(this.props.sorting);

  getSortingDirection = sortingName => {
    if (sortingName !== this.sortingName()) return SortingDirection.none;
    return getSortingDirection(this.props.sorting);
  };

  isSortable = sortingName => sortingName !== undefined;

  handleSorting = sortingName => e => {
    if (
      sortingName !== this.sortingName() ||
      SortingDirection.asc === getSortingDirection(this.props.sorting)
    ) {
      return this.props.updateSorting(sortingName + SortingDirection.desc);
    }

    return this.props.updateSorting(sortingName + SortingDirection.asc);
  };

  renderColumns = () => {
    return this.props.columns.map(column => {
      return (
        <TableHeadCell
          key={column.name}
          sortable={this.isSortable(column.sortingName)}
          onClick={this.handleSorting(column.sortingName)}
          sortingDirection={this.getSortingDirection(column.sortingName)}
        >
          {this.props.children(column)}
        </TableHeadCell>
      );
    });
  };

  render() {
    return (
      <thead className="table__head">
        <TableRow className="table__row--head">{this.renderColumns()}</TableRow>
      </thead>
    );
  }
}

export default TableHeader;
