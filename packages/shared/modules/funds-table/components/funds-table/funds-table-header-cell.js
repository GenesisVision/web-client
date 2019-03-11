import React from "react";
import { withTranslation } from "react-i18next";

const FundsTableHeaderCell = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span className={`funds-table__cell funds-table__cell--${column.name}`}>
      {t(`funds-page.funds-header.${column.name}`)}
    </span>
  );
};

export default withTranslation()(FundsTableHeaderCell);
