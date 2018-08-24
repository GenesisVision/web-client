import "./programs.scss";

import Table from "components/table/table";
import TableHeadCell from "components/table/table-head-cell";
import Filter from "modules/filtering/components/filter";
import SelectFilter from "modules/filtering/components/select-filter";
import React, { Fragment } from "react";
import { translate } from "react-i18next";

import LevelFilter from "../../../filtering/components/level-filter";
import {
  CURRENCY_FILTER_VALUES,
  PROGRAMS_COLUMNS
} from "../../programs.constants";
import ProgramTableRow from "./program-table-row";

const ProgramsTable = ({ t, data, isPending, sorting, filtering, paging }) => {
  return (
    <Table
      title="All programs"
      sorting={sorting}
      filtering={filtering}
      paging={paging}
      columns={PROGRAMS_COLUMNS}
      items={data.programs}
      isPending={data.isPending}
      renderFilters={handleFilterChange => (
        <Fragment>
          <Filter
            label="Levels"
            name="level"
            value={filtering["level"].value}
            changeFilter={handleFilterChange}
          >
            <LevelFilter />
          </Filter>
          <Filter
            label="Currency"
            name="currency"
            value={filtering["currency"].value}
            changeFilter={handleFilterChange}
          >
            <SelectFilter
              values={[
                { value: undefined, label: "All" },
                ...CURRENCY_FILTER_VALUES.map(x => ({ value: x, label: x }))
              ]}
            />
          </Filter>
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
