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

export const RingIcon = props => {
  return <Icon type={"ring"} {...props} />;
};

export const RingCircleIcon = props => {
  return <Icon type={"ring-circle"} {...props} />;
};

export const WalletIcon = props => {
  return <Icon type={"wallet"} {...props} />;
};

export const DetailsIcon = props => {
  return <Icon type={"details"} {...props} />;
};

export const SettingsIcon = props => {
  return <Icon type={"settings"} {...props} />;
};

export const LogoutIcon = props => {
  return <Icon type={"logout"} {...props} />;
};
