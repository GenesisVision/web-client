import React, { Component } from "react";

import { getSortingColumnName, isSortingAsc } from "../helpers/sorting.helpers";
import TableRow from "./table-row";

class TableHeader extends Component {
  sortingName = () => getSortingColumnName(this.props.sorting);

  isAsc = () => isSortingAsc(this.props.sorting);

  handleSorting = sortingName => e => {
    if (sortingName !== this.sortingName() || this.isAsc()) {
      return this.props.updateSorting(sortingName + "Desc");
    }

    return this.props.updateSorting(sortingName + "Asc");
  };

  renderChildren = column => {
    if (this.props.sorting !== undefined) {
      return this.props.children({
        column: column,
        sortingName: this.sortingName(),
        isAsc: this.isAsc(),
        handleSorting: this.handleSorting
      });
    }
    return this.props.children(column);
  };

  render() {
    return (
      <div className="table__head">
        <TableRow className="table__row--head">
          {this.props.columns.map(x => {
            return this.renderChildren(x);
          })}
        </TableRow>
      </div>
    );
  }
}

export default TableHeader;
