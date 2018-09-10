import React, { Component } from "react";

class TableFilters extends Component {
  render() {
    const { updateFilter, children } = this.props;
    return <div className="table__filters">{children(updateFilter)}</div>;
  }
}

export default TableFilters;
