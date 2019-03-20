import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

interface Props {
  column: SortingColumn;
  isAuthenticated: boolean;
}

const FundTableSortingValue: React.FC<Props & InjectedTranslateProps> = ({
  t,
  column,
  isAuthenticated
}) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`funds-page.funds-header.${column.name}`);
};

export default translate()(React.memo(FundTableSortingValue));
