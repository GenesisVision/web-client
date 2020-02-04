import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

interface Props {
  column: SortingColumn;
}

const _FundsTableHeaderCell: React.FC<Props> = ({ column }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span className="funds-table__cell">
      {t(`funds-page.funds-header.${column.name}`)}
    </span>
  );
};

const FundsTableHeaderCell = React.memo(_FundsTableHeaderCell);
export default FundsTableHeaderCell;
