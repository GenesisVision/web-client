import SortingHeader from "modules/sorting/components/sorting-header/sorting-header";
import {
  getSortingColumnName,
  isSortingAsc
} from "modules/sorting/helpers/sorting-helpers";
import React from "react";
import { translate } from "react-i18next";

import { PROGRAMS_COLUMNS } from "../../programs.constants";

const ProgramsHeader = ({ t, sorting, updateSorting }) => {
  const sortingColumnName = getSortingColumnName(sorting);
  const isAsc = isSortingAsc(sorting);
  const handleSorting = sortingName => () => {
    if (sortingName !== sortingColumnName)
      return updateSorting(sortingName + "Asc");

    if (isAsc) return updateSorting(sortingName + "Desc");
    return updateSorting(sortingName + "Asc");
  };
  return (
    <div className="programs-table__row programs-table__row--header">
      {PROGRAMS_COLUMNS.map(
        x =>
          x.sortingName === undefined ? (
            <div
              key={x.name}
              className={`programs-table__cell programs-table__cell--header programs-table__cell--${
                x.name
              }`}
            >
              {t(`programs-page.programs-header.${x.name}`)}
            </div>
          ) : (
            <SortingHeader
              key={x.name}
              className={`programs-table__cell programs-table__cell--header programs-table__cell--${
                x.name
              }`}
              isSelected={x.sortingName === sortingColumnName}
              isAsc={isAsc}
              onClick={handleSorting(x.sortingName)}
            >
              {t(`programs-page.programs-header.${x.name}`)}
            </SortingHeader>
          )
      )}
      <div className="programs-table__cell programs-table__cell--header programs-table__cell--favorite">
        &nbsp;
      </div>
    </div>
  );
};

export default translate()(ProgramsHeader);
