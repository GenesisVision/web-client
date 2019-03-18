import { ProgramDetails } from "gv-api-web";
import * as React from "react";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import { IPaging } from "shared/components/table/helpers/paging.helpers";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { PROGRAMS_COLUMNS } from "./programs.constants";

export interface TableToggleFavorite {
  (program: ProgramDetails, updateRow: (row: any) => void): (
    programId: string,
    isFavorite: boolean
  ) => void;
}

interface IProgramTableModuleProps {
  getItems(): void;
  renderFilters?(
    updateFilter: (filter: any) => void,
    filtering: FilteringType
  ): JSX.Element;
  sorting: string;
  filtering: FilteringType;
  defaultFilters: any[];
  paging: IPaging;
  isAuthenticated: boolean;
  showRating: boolean;
  title: string;
  disableTitle?: boolean;
  toggleFavorite: TableToggleFavorite;
}

class ProgramTableModule extends React.Component<IProgramTableModuleProps> {
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
        renderBodyRow={(
          program,
          updateRow: any //TODO fix updateRow
        ) => (
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
