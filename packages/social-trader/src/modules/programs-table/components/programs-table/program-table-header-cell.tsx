import { SortingColumn } from "components/table/components/filtering/filter.type";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _ProgramTableHeaderCell: React.FC<
  { column: SortingColumn } & WithTranslation
> = ({ t, column }) => (
  <span
    className={`programs-table__cell  programs-table__cell--${column.name}`}
  >
    {t(`programs-page.programs-header.${column.name}`)}
  </span>
);

const ProgramTableHeaderCell = withLoader(
  translate()(React.memo(_ProgramTableHeaderCell))
);
export default ProgramTableHeaderCell;
