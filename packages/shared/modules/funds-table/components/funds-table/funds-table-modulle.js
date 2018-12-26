import React, { Component } from "react";
import TableModule from "shared/components/table/components/table-module";

import FundsTableRow from "./fund-table-row";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

class FundsTableModule extends Component {
  toggleFavorite = () => {};
  render() {
    const {
      getItems,
      renderFilters,
      sorting,
      filtering,
      defaultFilters,
      paging,
      isAuthenticated,
      title
    } = this.props;

    return (
      <TableModule
        getItems={getItems}
        defaultFilters={defaultFilters}
        filtering={filtering}
        sorting={sorting}
        renderFilters={renderFilters}
        paging={paging}
        title={title}
        columns={FUNDS_TABLE_COLUMNS}
        renderHeader={column => (
          <FundsTableHeaderCell
            column={column}
            isAuthenticated={isAuthenticated}
          />
        )}
        renderBodyRow={fund => (
          <FundsTableRow
            title={title}
            fund={fund}
            toggleFavorite={this.toggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
}

export default FundsTableModule;
