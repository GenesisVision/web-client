import "./programs.scss";

import Table from "components/table/table";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import TableFilter from "../../../../components/table/table-filter";
import TableHeadCell from "../../../../components/table/table-head-cell";
import { PROGRAMS_COLUMNS } from "../../programs.constants";
import ProgramTableRow from "./program-table-row";

const ProgramsTable = ({ t, data, isPending, sorting, paging }) => {
  return (
    <Table
      name="All programs"
      sorting={sorting}
      filtering="123"
      paging={paging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={() => (
        <Fragment>
          <TableFilter label="Levels" value="All" />
          <TableFilter label="Currency" value="All" />
        </Fragment>
      )}
      renderHeader={({ sortingName, isAsc, handleSorting }) => (
        <Fragment>
          {PROGRAMS_COLUMNS.map(x => {
            return (
              <TableHeadCell
                key={x.name}
                className={`programs-table__cell--${x.name}`}
                sortable={x.sortingName !== undefined}
                active={x.sortingName === sortingName}
                isAsc={isAsc}
                onClick={handleSorting(x.sortingName)}
              >
                {t(`programs-page.programs-header.${x.name}`)}
              </TableHeadCell>
            );
          })}
          <TableHeadCell className="programs-table__cell--favorite" />
        </Fragment>
      )}
      renderBodyRow={program => <ProgramTableRow program={program} />}
    />
  );
};

export default translate()(ProgramsTable);
