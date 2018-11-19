import React from "react";
import { translate } from "react-i18next";
import ProgramTableRowShort from "shared/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "shared/components/programs-table/programs.constants";
import { Table } from "shared/components/table/components";

const ProgramsTable = ({ t, isPending, data, title }) => {
  return (
    <Table
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

export default translate()(ProgramsTable);
