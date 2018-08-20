import TableHead from "components/table/table-head";
import TableHeadCell from "components/table/table-head-cell";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";

import { PROGRAMS_COLUMNS } from "../../programs.constants";

class ProgramsTableHead extends Component {
  render() {
    const { t, sorting } = this.props;
    return (
      <TableHead sorting={sorting}>
        {({ sortingName, isAsc, handleSorting }) => (
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
      </TableHead>
    );
  }
}

export default translate()(ProgramsTableHead);
