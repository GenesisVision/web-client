import React, { Component } from "react";

import TableFilters from "./table-filters";

class TableToolbar extends Component {
  render() {
    const { title, filtering, updateFilter, renderFilters } = this.props;
    return (
      <div className="table__toolbar">
        {title && <div className="table__title">{title}</div>}
        {filtering && (
          <TableFilters filtering={filtering} updateFilter={updateFilter}>
            {renderFilters}
          </TableFilters>
        )}
      </div>
    );
  }
}

export default TableToolbar;
