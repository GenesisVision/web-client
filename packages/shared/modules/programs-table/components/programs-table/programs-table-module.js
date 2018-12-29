import React, { Component } from "react";
import TableModule from "shared/components/table/components/table-module";

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
      title,
      disableTitle,
      toggleFavorite
    } = this.props;

    return (
      <TableModule
        disableTitle={disableTitle}
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
        renderBodyRow={(program, updateRow) => (
          <ProgramTableRow
            showRating={showRating}
            title={title}
            program={program}
            toggleFavorite={toggleFavorite(program, updateRow)}
            isAuthenticated={isAuthenticated}
          />
        )}
      />
    );
  }
}

export default ProgramTableModule;
