import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

const ProgramTableSortingValue: React.FC<
  { column: SortingColumn; isAuthenticated: boolean } & InjectedTranslateProps
> = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`programs-page.programs-header.${column.name}`);
};

export default translate()(ProgramTableSortingValue);
