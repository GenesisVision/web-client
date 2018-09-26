import React, { Component } from "react";

class TableToolbar extends Component {
  render() {
    const { title, renderFilters, updateFilter, filtering } = this.props;
    return (
      <div className="table__toolbar">
        {title && <div className="table__title">{title}</div>}
        {renderFilters && (
          <div className="table__filters">
            {renderFilters(updateFilter, filtering)}
          </div>
        )}
      </div>
    );
  }
}

export default TableToolbar;
