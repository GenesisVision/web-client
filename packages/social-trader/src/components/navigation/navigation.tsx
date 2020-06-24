import { GvRootItem } from "components/navigation/gv-root-item";
import * as React from "react";
import { TMenuItem } from "routes/menu";

import { MenuNavigationItem } from "./menu-navigation-item";
import styles from "./navigation.module.scss";

interface INavigationProps {
  className?: string;
  menuItems: TMenuItem[];
}

const _Navigation: React.FC<INavigationProps> = ({ menuItems, className }) => {
  return (
    <div className={className}>
      <GvRootItem />
      <div className={styles["navigation"]}>
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
