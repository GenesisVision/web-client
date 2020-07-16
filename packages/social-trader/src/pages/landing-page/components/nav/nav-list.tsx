import clsx from "clsx";
import NavItem from "pages/landing-page/components/nav/nav-item";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

import styles from "./nav-list.module.scss";

const _NavList: React.FC<Props> = ({
  menuItems,
  className,
  onClick,
  subNavOpen,
  isMobile
}) => (
  <nav className={className}>
    <ul
      className={clsx(styles["nav-list"], {
        [styles["nav-list--is-mobile"]]: isMobile
      })}
    >
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
  isMobile?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const NavList = React.memo(_NavList);
export default NavList;
