import { mediaBreakpointDesktop } from "components/gv-styles/gv-media";
import NavItem from "pages/landing-page/components/nav/nav-item";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import { resetList } from "pages/landing-page/styles/landing-styles";
import React from "react";
import styled from "styled-components";

export interface Props {
  menuItems: TNavHeader[];
  subNavOpen?: boolean;
  isMobile?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Container = styled.nav<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    `
      display: none;
      ${mediaBreakpointDesktop(`
        display: block;
        grid-column: 3/11;
        justify-self: end;
      `)}`};
`;

const StyledUl = styled.ul`
  ${resetList};
  ${mediaBreakpointDesktop("display: grid; grid-auto-flow: column;")}
`;

const _NavList: React.FC<Props> = ({
  menuItems,
  onClick,
  subNavOpen,
  isMobile
}) => (
  <Container isMobile={isMobile}>
    <StyledUl>
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
    </StyledUl>
  </Container>
);

const NavList = React.memo(_NavList);
export default NavList;
