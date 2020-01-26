import "./programs.scss";

import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row-short";
import { programListLoaderData } from "./program-table.loader-data";
import { PROGRAMS_COLUMNS } from "./programs.constants";

const _ProgramTableModule: React.FC<Props> = ({
  renderMappings,
  getItems,
  renderFilters,
  sorting,
  filtering,
  defaultFilters,
  paging,
  showRating,
  title,
  disableTitle,
  columns
}) => {
  return (
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
      renderHeader={column => <ProgramTableHeaderCell column={column} />}
      renderBodyRow={(
        program,
        updateRow: any //TODO fix updateRow
      ) => (
        <ProgramTableRow
          updateRow={updateRow}
          showRating={showRating}
          program={program}
        />
      )}
    />
  );
};

interface Props extends ITableModuleProps {
  showRating?: boolean;
  title?: string;
}

const ProgramTableModule = React.memo(_ProgramTableModule);
export default ProgramTableModule;
