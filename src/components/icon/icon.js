import "./icon.scss";

import classnames from "classnames";
import React from "react";

export const Icon = ({ type, className, onClick }) => {
  return (
    <span
      className={classnames("icon", `icon--${type}`, className)}
      onClick={onClick}
    />
  );
};

export const ProgramIcon = props => {
  return <Icon type={"programs"} {...props} />;
};

export const DashboardIcon = props => {
  return <Icon type={"dashboard"} {...props} />;
};
