import "./programs.scss";

import Table from "components/table/table";
import TableBody from "components/table/table-body";
import TableFooter from "components/table/table-footer";
import React from "react";
import { translate } from "react-i18next";

import { PROGRAMS_COLUMNS } from "../../programs.constants";
import ProgramTableRow from "./program-table-row";
import ProgramsTableHead from "./programs-table-head";

const ProgramsTable = ({ t, data, isPending, sorting, paging }) => {
  return (
    <Table
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
    >
      <ProgramsTableHead sorting={sorting} />
      <TableBody>
        {program => <ProgramTableRow key={program.id} program={program} />}
      </TableBody>
      <TableFooter paging={paging} />
    </Table>
  );
};

export default translate()(ProgramsTable);
