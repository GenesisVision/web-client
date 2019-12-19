import "./nav.scss";

import * as React from "react";
import NavItem from "routes/ssr/landing-page/components/nav/nav-item";
import { TNavHeader } from "routes/ssr/landing-page/routes/nav";

const _NavList: React.FC<Props> = ({ menuItems, className }) => {
  return (
    <nav className={className}>
      <ul className="nav-list">
        {menuItems.map((item: any, index: number) => (
          <NavItem
            key={index}
            name={item.name}
            href={item.href}
            state={item.state}
          />
        ))}
      </ul>
    </nav>
  );
};

export interface Props {
  menuItems: TNavHeader[];
  className?: string;
}

const NavList = React.memo(_NavList);
export default NavList;
