import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import withLoader from "shared/decorators/with-loader";

const _ProgramTableHeaderCell: React.FC<
  { column: SortingColumn } & InjectedTranslateProps
> = ({ t, column }) => (
  <span
    className={`programs-table__cell  programs-table__cell--${column.name}`}
  >
    {t(`programs-page.programs-header.${column.name}`)}
  </span>
);

const ProgramTableHeaderCell = withLoader(
  React.memo(translate()(_ProgramTableHeaderCell))
);
export default ProgramTableHeaderCell;
