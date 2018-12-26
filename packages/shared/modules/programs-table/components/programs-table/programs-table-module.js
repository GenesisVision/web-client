import React, { Component } from "react";
import TableModule from "shared/components/table/components/table-module";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { PROGRAMS_COLUMNS } from "./programs.constants";

class ProgramTableModule extends Component {
  render() {
    const {
      getItems,
      renderFilters,
      sorting,
      filtering,
      defaultFilters,
      paging,
      isAuthenticated,
      showRating,
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
        columns={PROGRAMS_COLUMNS}
        renderHeader={column => (
          <ProgramTableHeaderCell
            column={column}
            isAuthenticated={isAuthenticated}
          />
        )}
        renderBodyRow={program => (
          <ProgramTableRow
            showRating={showRating}
            title={title}
            program={program}
            toggleFavorite={this.toggleFavorite}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
}

export default ProgramTableModule;
