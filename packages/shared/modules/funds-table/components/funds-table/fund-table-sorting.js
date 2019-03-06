import React from "react";
import { translate } from "react-i18next";

const FundTableSortingValue = ({ t, column, isAuthenticated }) => {
  if (!isAuthenticated && column.name === "favorite") return null;
  return t(`funds-page.funds-header.${column.name}`);
};

export default translate()(FundTableSortingValue);
