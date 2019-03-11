import React from "react";
import { withTranslation } from "react-i18next";

const ProgramTableSortingValue = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`programs-page.programs-header.${column.name}`);
};

export default withTranslation()(ProgramTableSortingValue);
