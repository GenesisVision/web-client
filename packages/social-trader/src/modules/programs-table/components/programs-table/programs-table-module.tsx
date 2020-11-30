import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import ProgramTableHeaderCell from "./program-table-header-cell";
import ProgramTableRow from "./program-table-row-short";
import { programListLoaderData } from "./program-table.loader-data";
import { PROGRAMS_COLUMNS } from "./programs.constants";

interface Props extends ITableModuleProps {
  title?: string;
}

const _ProgramTableModule: React.FC<Props> = ({
  name,
  renderMappings,
  getItems,
  renderFilters,
  sorting,
  filtering,
  defaultFilters,
  paging,
  title,
  disableTitle,
  columns
}) => {
  return (
    <TableModule
      name={"ProgramTableModule" + name}
      cache
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
      renderBodyRow={program => <ProgramTableRow program={program} />}
    />
  );
};

const ProgramTableModule = React.memo(_ProgramTableModule);
export default ProgramTableModule;
