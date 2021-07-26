import { Center } from "components/center/center";
import { GvRootItem } from "components/navigation/gv-root-item";
import * as React from "react";
import { TMenuItem } from "routes/menu";

import { MenuNavigationItem } from "./menu-navigation-item";

interface INavigationProps {
  className?: string;
  menuItems: TMenuItem[];
}

const _Navigation: React.FC<INavigationProps> = ({ className, menuItems }) => {
  return (
    <>
      <GvRootItem />
      <Center
        itemScope
        itemType="http://www.schema.org/SiteNavigationElement"
        as="nav"
      >
        {menuItems.map(item => (
          <MenuNavigationItem
            item={item}
            popover
            key={item.label || item.route}
          />
        ))}
      </Center>
    </>
  );
};

const Navigation = React.memo(_Navigation);
export default Navigation;
