import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

const ProgramTableHeaderCell: React.FC<
  { column: SortingColumn; isAuthenticated?: boolean } & InjectedTranslateProps
> = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`programs-page.programs-header.${column.name}`)}
    </span>
  );
};

export default translate()(ProgramTableHeaderCell);
