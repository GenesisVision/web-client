import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _FollowTableSortingValue: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`follows-page.header.${column.name}`);
};

const FollowTableSortingValue = React.memo(_FollowTableSortingValue);
export default FollowTableSortingValue;
