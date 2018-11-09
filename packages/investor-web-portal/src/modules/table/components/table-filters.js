import React, { Component } from "react";

class TableFilters extends Component {
  render() {
    const { children } = this.props;
    return <div className="table__filters">{children()}</div>;
  }
}

export default TableFilters;
