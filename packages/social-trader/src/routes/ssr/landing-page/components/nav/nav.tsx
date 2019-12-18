import "./header.scss";

import * as React from "react";
import NavItem from "routes/ssr/landing-page/components/nav/nav-item";

const _Nav: React.FC<Props> = ({ menuItems }) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {menuItems.map((item: any) => (
          <NavItem name={item.name} href={item.href} state={item.state} />
        ))}
      </ul>
    </nav>
  );
};

export interface Props {
  menuItems: any;
}

const Nav = React.memo(_Nav);
export default Nav;
