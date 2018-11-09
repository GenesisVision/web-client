import classnames from "classnames";
import { GVSwitch } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const ProgramReinvestingWidget = ({
  t,
  className,
  isReinvesting,
  toggleReinvesting
}) => (
  <span
    className={classnames("reinvesting-widget", className, {
      "reinvesting-widget--active": isReinvesting
    })}
    onClick={toggleReinvesting}
  >
    <GVSwitch
      value={isReinvesting}
      color="primary"
      onChange={toggleReinvesting}
      label={t("program-details-page.description.reinvest")}
    />
  </span>
);

export default translate()(ProgramReinvestingWidget);
