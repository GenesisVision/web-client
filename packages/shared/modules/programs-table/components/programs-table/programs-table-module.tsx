import * as React from "react";
import {
  FilteringType,
  SortingColumn,
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
import { programListLoaderData } from "./program-table.loader-data";

const ProgramTableModule: React.FC<Props> = React.memo(
  ({
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
  )
);

interface Props {
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
  columns?: SortingColumn[];
}

export default ProgramTableModule;
