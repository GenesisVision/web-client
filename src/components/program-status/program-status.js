import "./program-status.scss";

import classNames from "classnames";
import React from "react";
import { translate } from "react-i18next";

const getStatusClassName = (status, className) => {
  return classNames("program-status", className, {
    "program-status__active": status === "Active",
    "program-status__investing": status === "Investing",
    "program-status__withdrawing": status === "Withdrawing",
    "program-status__ended": status === "Ended"
  });
};

const ProgramStatus = ({ t, className, status }) => {
  return (
    <span className={getStatusClassName(status, className)}>
      {t(`program-statuses.${status}`)}
    </span>
  );
};

export default translate()(ProgramStatus);
