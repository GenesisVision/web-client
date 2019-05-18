import * as React from "react";
import {
  FilteringType,
  TDefaultFilters
} from "shared/components/table/components/filtering/filter.type";
import TableModule from "shared/components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderFiltersFuncType,
  TableToggleFavoriteType
} from "shared/components/table/components/table.types";
import { IPaging } from "shared/components/table/helpers/paging.helpers";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { FAVORITE_COLUMN_NAME } from "./programs-table";
import { PROGRAMS_COLUMNS } from "./programs.constants";

interface IProgramTableModuleProps {
  getItems: GetItemsFuncType;
  renderFilters?: RenderFiltersFuncType;
  sorting: string;
  filtering: FilteringType;
  defaultFilters: TDefaultFilters;
  paging: IPaging;
  isAuthenticated?: boolean;
  showRating?: boolean;
  title: string;
  disableTitle?: boolean;
  toggleFavorite: TableToggleFavoriteType;
}

class ProgramTableModule extends React.PureComponent<IProgramTableModuleProps> {
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
            condition={
              !isAuthenticated ||
              (isAuthenticated && column.name !== FAVORITE_COLUMN_NAME)
            }
            column={column}
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
