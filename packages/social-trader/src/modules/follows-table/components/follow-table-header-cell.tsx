import { SortingColumn } from "components/table/components/filtering/filter.type";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _FollowTableHeaderCell: React.FC<{ column: SortingColumn }> = ({
  column
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { t } = useTranslation();
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`follows-page.header.${column.name}`)}
    </span>
  );
};

const FollowTableHeaderCell = React.memo(_FollowTableHeaderCell);
export default FollowTableHeaderCell;
