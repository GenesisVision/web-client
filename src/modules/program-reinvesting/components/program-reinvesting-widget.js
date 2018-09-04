import classNames from "classnames";
import React from "react";
import { translate } from "react-i18next";

const ProgramReinvestingWidget = ({
  t,
  className,
  isReinvesting,
  toggleReinvesting
}) => (
  <span
    className={classNames("reinvesting-widget", className, {
      "reinvesting-widget--active": isReinvesting
    })}
    onClick={toggleReinvesting}
  >
    {t("program-details-page.description.reinvest")}
  </span>
);

export default translate()(ProgramReinvestingWidget);
