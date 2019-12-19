import "./nav.scss";

import classNames from "classnames";
import * as React from "react";
import NavItem from "routes/ssr/landing-page/components/nav/nav-item";

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
  menuItems: any;
  className?: string;
}

const NavList = React.memo(_NavList);
export default NavList;
