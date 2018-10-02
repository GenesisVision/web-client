import "./icon.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export const Icon = ({
  type,
  className,
  onClick,
  primary,
  secondary,
  children,
  rotate
}) => {
  return (
    <span
      className={classnames("icon", `icon--${type}`, className, {
        "icon--primary": primary,
        "icon--secondary": secondary,
        "icon--rotate": rotate
      })}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string
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
export const QuestionCircleIcon = props => {
  return <Icon type={"question-circle"} {...props} />;
};

export const ControlsIcon = props => {
  return <Icon type={"controls"} {...props} />;
};

export const SearchIcon = props => {
  return <Icon type={"search"} {...props} />;
};

export const ArrowIcon = props => {
  return <Icon type={"arrow"} {...props} />;
};

export const MenuIcon = props => {
  return <Icon type={"menu"} {...props} />;
};

export const TableIcon = props => {
  return <Icon type={"table"} {...props} />;
};

export const CardsIcon = props => {
  return <Icon type={"cards"} {...props} />;
};

export const ActionsIcon = props => {
  return <Icon type={"actions"} {...props} />;
};
