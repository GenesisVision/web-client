import React, { Component } from "react";

class TableFilters extends Component {
  render() {
    const { filtering, children } = this.props;
    return (
      <div className="table__filters">{children(filtering.updateFilter)}</div>
    );
  }
}

export default TableFilters;
