import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

interface Props {
  column: SortingColumn;
}

const _FundTableSortingValue: React.FC<Props> = ({ column }) => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`funds-page.funds-header.${column.name}`);
};

const FundTableSortingValue = React.memo(_FundTableSortingValue);
export default FundTableSortingValue;
