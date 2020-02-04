import "./nav-list.scss";

import React from "react";
import NavItem from "routes/ssr/landing-page/components/nav/nav-item";
import { TNavHeader } from "routes/ssr/landing-page/static-data/nav-links";

const _NavList: React.FC<Props> = ({
  menuItems,
  className,
  onClick,
  subNavOpen
}) => (
  <nav className={className}>
    <ul className="nav-list">
      {menuItems.map((item, index) => (
        <NavItem
          key={index}
          name={item.name}
          href={item.href}
          state={item.state}
          hideMobile={item.hideMobile}
          subNav={item.subNav}
          onClick={onClick}
          subNavOpen={subNavOpen}
        />
      ))}
    </ul>
  </nav>
);

export interface Props {
  menuItems: TNavHeader[];
  className?: string;
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const NavList = React.memo(_NavList);
export default NavList;
