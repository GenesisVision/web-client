import "shared/modules/programs-table/components/programs-table/programs.scss";

import { ItemsViewModelProgramDetailsList } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import { Table } from "shared/components/table/components";
import ProgramTableRowShort from "shared/modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "shared/modules/programs-table/components/programs-table/programs.constants";

import { SearchTableProps } from "./global-search-result";

const ProgramsTable: React.FC<
  SearchTableProps<ItemsViewModelProgramDetailsList>
> = ({ data, title }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={PROGRAMS_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span
          className={`programs-table__cell programs-table__cell--${column.name}`}
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

export default React.memo(ProgramsTable);
