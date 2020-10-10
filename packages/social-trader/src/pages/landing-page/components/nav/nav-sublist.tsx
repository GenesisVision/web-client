import NavSubItem from "pages/landing-page/components/nav/nav-subitem";
import { NavSubListStyledUl } from "pages/landing-page/components/nav/nav.styles";
import { TSubNav } from "pages/landing-page/static-data/nav-links";
import React from "react";

export interface Props {
  subNav: TSubNav[];
  isMobile?: boolean;
  subNavOpen?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const _NavSubList: React.FC<Props> = ({
  isMobile,
  subNav,
  subNavOpen,
  onClick
}) => (
  <NavSubListStyledUl subNavOpen={subNavOpen}>
    {subNavOpen &&
      subNav.map((item, index) => (
        <NavSubItem
          isMobile={isMobile}
          key={index}
          name={item.name}
          href={item.href}
          state={item.state}
          hideMobile={item.hideMobile}
          onClick={onClick}
        />
      ))}
  </NavSubListStyledUl>
);

const NavSubList = React.memo(_NavSubList);
export default NavSubList;
