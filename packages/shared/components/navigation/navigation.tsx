import "./navigation.scss";

import classNames from "classnames";
import * as React from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { TMenuItem } from "shared/routes/menu";

import { MenuNavigationItem } from "./menu-navigation-item";

interface INavigationProps {
  className?: string;
  menuItems: TMenuItem[];
}

const _Navigation: React.FC<INavigationProps> = ({ menuItems, className }) => {
  return (
    <div className={classNames("navigation", className)}>
      {menuItems.map(item => (
        <MenuNavigationItem item={item} popover />
      ))}
    </div>
  );
};

const Navigation = compose<React.ComponentType<INavigationProps>>(
  withRouter,
  React.memo
)(_Navigation);
export default Navigation;
