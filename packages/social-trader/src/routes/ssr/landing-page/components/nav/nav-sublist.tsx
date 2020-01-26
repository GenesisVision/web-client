import "./nav-list.scss";

import classNames from "classnames";
import React from "react";
import NavSubItem from "routes/ssr/landing-page/components/nav/nav-subitem";
import {
  TNavHeader,
  TSubNav
} from "routes/ssr/landing-page/static-data/nav-links";

const _NavSubList: React.FC<Props> = ({ subNav, subNavOpen, onClick }) => (
  <ul
    className={classNames("nav-list nav-list--sub", {
      "nav-list--sub-open": subNavOpen
    })}
  >
    {subNavOpen &&
      subNav.map((item, index) => (
        <NavSubItem
          key={index}
          name={item.name}
          href={item.href}
          state={item.state}
          hideMobile={item.hideMobile}
          onClick={onClick}
        />
      ))}
  </ul>
);

export interface Props {
  subNav: TSubNav[];
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const NavSubList = React.memo(_NavSubList);
export default NavSubList;
