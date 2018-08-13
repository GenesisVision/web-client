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
    <div className="programs-header-wrapper">
      {PROGRAMS_COLUMNS.map(
        x =>
          x.sortingName === undefined ? (
            <div
              key={x.name}
              className={`programs-header programs-header__${x.name}`}
            >
              {t(`programs-page.programs-header.${x.name}`)}
            </div>
          ) : (
            <SortingHeader
              key={x.name}
              className={`programs-header programs-header__${x.name}`}
              isSelected={x.sortingName === sortingColumnName}
              isAsc={isAsc}
              onClick={handleSorting(x.sortingName)}
            >
              {t(`programs-page.programs-header.${x.name}`)}
            </SortingHeader>
          )
      )}
    </div>
  );
};

export default translate()(ProgramsHeader);
