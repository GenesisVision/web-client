import React from "react";
import { translate } from "react-i18next";

const ProgramTableHeaderCell = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return (
    <span
      className={`programs-table__cell  programs-table__cell--${column.name}`}
    >
      {t(`programs-page.programs-header.${column.name}`)}
    </span>
  );
};

export default translate()(ProgramTableHeaderCell);
