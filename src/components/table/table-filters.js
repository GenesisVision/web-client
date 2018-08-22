import React, { Component } from "react";

class TableFilters extends Component {
  render() {
    return <div className="table__filters">{this.props.children()}</div>;
  }
}

export default TableFilters;
