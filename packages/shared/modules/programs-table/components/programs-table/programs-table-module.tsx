import * as React from "react";
import TableModule, {
  ITableModuleProps
} from "shared/components/table/components/table-module";
import { TableToggleFavoriteType } from "shared/components/table/components/table.types";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row";
import { programListLoaderData } from "./program-table.loader-data";
import { FAVORITE_COLUMN_NAME } from "./programs-table";
import { PROGRAMS_COLUMNS } from "./programs.constants";

const _ProgramTableModule: React.FC<Props> = ({
  renderMappings,
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
  toggleFavorite,
  columns
}) => (
  <TableModule
    loaderData={programListLoaderData}
    renderMappings={renderMappings}
    disableTitle={disableTitle}
    getItems={getItems}
    defaultFilters={defaultFilters}
    filtering={filtering}
    sorting={sorting}
    renderFilters={renderFilters}
    paging={paging}
    title={title}
    columns={columns || PROGRAMS_COLUMNS}
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

interface Props extends ITableModuleProps {
  isAuthenticated?: boolean;
  showRating?: boolean;
  title: string;
  toggleFavorite: TableToggleFavoriteType;
}

const ProgramTableModule = React.memo(_ProgramTableModule);
export default ProgramTableModule;
