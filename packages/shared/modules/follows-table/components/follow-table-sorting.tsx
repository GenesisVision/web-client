import * as React from "react";
import { useTranslation } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import withLoader from "shared/decorators/with-loader";

const _FollowTableSortingValue: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  return t(`follows-page.follows-header.${column.name}`);
};

const ProgramTableSortingValue = withLoader(
  React.memo(_FollowTableSortingValue)
);
export default ProgramTableSortingValue;
