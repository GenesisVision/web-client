import NavItem from "pages/landing-page/components/nav/nav-item";
import {
  NavListContainer,
  NavListStyledUl
} from "pages/landing-page/components/nav/nav.styles";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

export interface Props {
  menuItems: TNavHeader[];
  subNavOpen?: boolean;
  isMobile?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const _NavList: React.FC<Props> = ({
  menuItems,
  onClick,
  subNavOpen,
  isMobile
}) => (
  <NavListContainer isMobile={isMobile}>
    <NavListStyledUl>
      {menuItems.map((item, index) => (
        <NavItem
          isMobile={isMobile}
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
    </NavListStyledUl>
  </NavListContainer>
);

const NavList = React.memo(_NavList);
export default NavList;
