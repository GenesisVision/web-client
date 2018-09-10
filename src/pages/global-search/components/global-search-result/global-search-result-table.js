import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "modules/programs-table/programs.constants";
import { Table, TableHeadCell } from "modules/table/components";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import withTable from "../../../../modules/table/components/with-table";
import { DEFAULT_PAGING } from "../../../../modules/table/reducers/table-paging.reducer";
import { globalSearchGetPrograms } from "../../services/global-search-result.service";

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
      renderHeader={
        <Fragment>
          {PROGRAMS_COLUMNS.map(x => {
            return (
              <TableHeadCell
                key={x.name}
                className={`programs-table__cell--${x.name}`}
              >
                {t(`programs-page.programs-header.${x.name}`)}
              </TableHeadCell>
            );
          })}
        </Fragment>
      }
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
