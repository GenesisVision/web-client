import "./navigation.scss";

import * as React from "react";
import { TMenuItem } from "routes/menu";

import { MenuNavigationItem } from "./menu-navigation-item";

interface INavigationProps {
  className?: string;
  menuItems: TMenuItem[];
}

const _Navigation: React.FC<INavigationProps> = ({ menuItems, className }) => {
  return (
    <div className={className}>
      <div className="navigation">
        {menuItems.map(item => (
          <MenuNavigationItem
            item={item}
            popover
            key={item.label || item.route}
          />
        ))}
      </div>
    </div>
  );
};

const Navigation = React.memo(_Navigation);
export default Navigation;
