import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  column: SortingColumn;
  isAuthenticated?: boolean;
}

const FundsTableHeaderCell: React.FC<Props> = ({ column, isAuthenticated }) => {
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span className={`funds-table__cell funds-table__cell--${column.name}`}>
      {t(`funds-page.funds-header.${column.name}`)}
    </span>
  );
};

export default React.memo(FundsTableHeaderCell);
