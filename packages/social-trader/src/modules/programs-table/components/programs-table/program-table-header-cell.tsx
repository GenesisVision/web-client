import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _ProgramTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`programs-page.programs-header.${column.name}`)}
    </span>
  );
};

const ProgramTableHeaderCell = React.memo(_ProgramTableHeaderCell);
export default ProgramTableHeaderCell;
