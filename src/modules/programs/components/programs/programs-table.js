import "./programs.scss";

import Table from "components/table/table";
import TableBody from "components/table/table-body";
import React from "react";
import { translate } from "react-i18next";

import { PROGRAMS_COLUMNS } from "../../programs.constants";
import ProgramTableRow from "./program-table-row";
import ProgramsTableHead from "./programs-table-head";

const ProgramsTable = ({ t, data, sorting, updateSorting }) => {
  return (
    <Table
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
    >
      <ProgramsTableHead updateSorting={updateSorting} sorting={sorting} />
      <TableBody>
        {program => <ProgramTableRow key={program.id} program={program} />}
      </TableBody>
      {/* <TableFooter /> */}
    </Table>
  );
};

export default translate()(ProgramsTable);
