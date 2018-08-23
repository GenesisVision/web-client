import "./programs.scss";

import classnames from "classnames";
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
      title="All programs"
      sorting={sorting}
      filtering="123"
      paging={paging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={() => (
        <Fragment>
          <TableFilter label="Levels" value="All">
            <div>
              <div value="All" className={classnames({ "is-selected": true })}>
                All
              </div>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
            </div>
          </TableFilter>
          <TableFilter label="Currency" value="All">
            Currency
          </TableFilter>
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
                onCdivck={handleSorting(x.sortingName)}
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
