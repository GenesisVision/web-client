import "modules/programs-table/components/programs-table/programs.scss";

import { Table } from "components/table/components";
import { ItemsViewModelProgramDetailsList } from "gv-api-web";
import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "modules/programs-table/components/programs-table/programs.constants";
import React from "react";
import { useTranslation } from "react-i18next";

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
        <ProgramTableRowShort title={title} program={program} />
      )}
    />
  );
};

export default React.memo(ProgramsTable);
