import "./reinvest-widget.scss";

import className from "classnames";
import { QuestionCircleIcon } from "components/icon/icon";
import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";

const ReinvestWidget = ({ t, isActive, onClick, children }) => (
  <GVButton
    className="reinvest-widget"
    variant="text"
    color="secondary"
    onClick={onClick}
  >
    <QuestionCircleIcon />
    {children}
    <div
      className={className("reinvest-widget__toggler", {
        "reinvest-widget__toggler--active": isActive,
        "reinvest-widget__toggler--inactive": !isActive
      })}
    />
  </GVButton>
);

export default translate()(ReinvestWidget);
