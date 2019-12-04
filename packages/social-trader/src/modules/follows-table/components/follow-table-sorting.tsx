import { SortingColumn } from "components/table/components/filtering/filter.type";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _FollowTableSortingValue: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  return t(`follows-page.header.${column.name}`);
};

const FollowTableSortingValue = withLoader(
  React.memo(_FollowTableSortingValue)
);
export default FollowTableSortingValue;
