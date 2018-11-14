import { PROGRAMS_COLUMNS } from "modules/programs-table/programs.constants";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import ProgramTableRowShort from "shared/components/programs-table/program-table-row-short";
import { Table } from "shared/components/table/components";
import withTable from "shared/components/table/components/with-table";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";

const ProgramsTable = ({ t, isPending, data, filtering, paging, title }) => {
  return (
    <Table
      paging={paging}
      updatePaging={() => {}}
      updateSorting={() => {}}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderHeader={column => (
        <span
          className={`programs-table__cell programs-table__cell--${
            column.name
          }`}
        >
          {t(`programs-page.programs-header.${column.name}`)}
        </span>
      )}
      renderBodyRow={program => (
        <ProgramTableRowShort
          title={title}
          program={program}
          onExpandClick={() => {}}
        />
      )}
    />
  );
};

export default compose(
  translate(),
  withTable({
    paging: DEFAULT_PAGING
  })
)(ProgramsTable);
