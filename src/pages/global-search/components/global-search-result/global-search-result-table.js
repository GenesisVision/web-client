import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "modules/programs-table/programs.constants";
import { Table, TableHeadCell } from "modules/table/components";
import withTable from "modules/table/components/with-table";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

const GlobalSearchResult = ({
  t,
  isPending,
  data,
  filtering,
  paging,
  updatePaging
}) => {
  return (
    <Table
      paging={paging}
      updatePaging={updatePaging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderHeader={column => (
        <TableHeadCell
          key={column.name}
          className={`programs-table__cell--${column.name}`}
        >
          {t(`programs-page.programs-header.${column.name}`)}
        </TableHeadCell>
      )}
      renderBodyRow={program => (
        <ProgramTableRowShort program={program} onExpandClick={() => {}} />
      )}
    />
  );
};

export default compose(
  translate(),
  withTable({
    paging: DEFAULT_PAGING
  })
)(GlobalSearchResult);
