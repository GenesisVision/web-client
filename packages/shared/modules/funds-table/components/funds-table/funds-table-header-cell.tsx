import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";

interface Props {
  column: SortingColumn;
  isAuthenticated: boolean;
}

const FundsTableHeaderCell: React.FC<Props & InjectedTranslateProps> = ({
  t,
  column,
  isAuthenticated
}) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span className={`funds-table__cell funds-table__cell--${column.name}`}>
      {t(`funds-page.funds-header.${column.name}`)}
    </span>
  );
};

export default translate()(React.memo(FundsTableHeaderCell));
