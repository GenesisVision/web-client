import { SortingColumn } from "components/table/components/filtering/filter.type";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

const _ProgramTableSortingValue: React.FC<
  { column: SortingColumn } & WithTranslation
> = ({ t, column }) => t(`programs-page.programs-header.${column.name}`);

const ProgramTableSortingValue = withLoader(
  translate()(React.memo(_ProgramTableSortingValue))
);
export default ProgramTableSortingValue;
