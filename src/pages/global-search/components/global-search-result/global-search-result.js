import ProgramTableRowShort from "modules/programs-table/components/programs-table/program-table-row-short";
import { PROGRAMS_COLUMNS } from "modules/programs-table/programs.constants";
import { Table, TableHeadCell } from "modules/table/components";
import withTableContainer from "modules/table/components/with-table-container";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";

import {
  getGlobalSearchProgramsStorePlace,
  globalSearchResult
} from "../../services/global-search-result.service";

const GlobalSearchResult = ({
  t,
  isPending,
  data,
  filtering,
  paging,
  sorting
}) => {
  return (
    <Table
      paging={paging}
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
        <ProgramTableRowShort
          program={program}
          onExpandClick={() => {}}
          isAuthenticated={false}
        />
      )}
    />
  );
};

export default compose(
  translate(),
  withTableContainer(globalSearchResult, getGlobalSearchProgramsStorePlace)
)(GlobalSearchResult);
