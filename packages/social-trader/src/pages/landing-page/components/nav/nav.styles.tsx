import Link from "components/link/link";
import { resetList } from "pages/landing-page/styles/landing-styles";
import styled, { css, keyframes } from "styled-components";
import { $landingLinkHover, $mainColor } from "utils/style/colors";
import { getHEXA } from "utils/style/generators";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { landingResetLink, transition } from "utils/style/mixins";

const appear = keyframes`
  0% {
      opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-2%);
  }
  100% {
    transform: translateX(0);
  }
`;

interface INavLinkProps {
  isMobile?: boolean;
}

const linkStyles = css<INavLinkProps>`
  ${transition("color")};
  ${landingResetLink};
  display: block;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  padding-top: 20px;
  padding-bottom: 20px;
  color: ${$mainColor};

  &:hover,
  &:focus,
  &:active {
    color: ${$landingLinkHover};
  }

  ${mediaBreakpointTablet(`
    font-weight: 600;
    font-size: 20px;
 `)};
  ${mediaBreakpointDesktop(`
    font-size: 14px;
    font-weight: 500;
    padding: 20px 30px;
    width: 135px;
 `)};

  ${({ isMobile }) =>
    isMobile
      ? css`
          transform: translateX(-2%);
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
          animation-name: ${slideIn};

          ${mediaBreakpointTablet("padding-top: 0; padding-bottom: 36px;")};
        `
      : mediaBreakpointTablet(`
    padding-top: 15px;
    padding-bottom: 15px;
 `)}
`;

const subLinkStyles = css<INavLinkProps>`
  font-size: 14px;
  font-weight: 400;
  color: ${getHEXA($mainColor, 0.5)};
  padding-left: 20px;

  &:hover,
  &:focus,
  &:active {
    color: ${$landingLinkHover};
  }

  ${mediaBreakpointTablet("font-size: 20px;")};
  ${mediaBreakpointDesktop(`
    font-size: 14px;
    font-weight: 500;
  `)};
  ${({ isMobile }) =>
    !isMobile && mediaBreakpointDesktop(`padding: 15px 30px;`)}
`;

export const NavItemA = styled.a<INavLinkProps>`
  ${linkStyles}
`;
export const NavItemLink = styled(Link)<INavLinkProps>`
  ${linkStyles}
`;

export const NavSubItemA = styled(NavItemA)`
  ${subLinkStyles}
`;
export const NavSubItemLink = styled(NavItemLink)`
  ${subLinkStyles}
`;

export const NavItemContainer = styled.li<{
  isMobile?: boolean;
  hideMobile?: boolean;
  subOpen?: boolean;
}>`
  position: relative;
  ${mediaBreakpointDesktop(`
    margin-right: 40px;
    text-align: center;

    &:last-child {
      margin-right: 0;
    }
  `)};
  ${mediaBreakpointLargeDesktop("margin-right: 60px;")};
  ${({ isMobile }) =>
    isMobile &&
    css`
      opacity: 0;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-name: ${appear};
    `};
  ${({ subOpen }) =>
    subOpen &&
    mediaBreakpointDesktop(`
      background-color: #1d1a3d;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    `)}
  ${({ hideMobile }) =>
    hideMobile &&
    `
    display: none;  
    ${mediaBreakpointDesktop(`display: block;`)}`}
`;

export const NavSubItemContainer = styled(NavItemContainer)`
  margin-right: 0;
  opacity: 0;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-name: ${appear};
`;

export const NavListContainer = styled.nav<{ isMobile?: boolean }>`
  ${({ isMobile }) =>
    !isMobile &&
    css`
      display: none;
      ${mediaBreakpointDesktop(`
        display: block;
        grid-column: 3/11;
        justify-self: end;
      `)}
    `};
`;

export const NavListStyledUl = styled.ul`
  ${resetList};
  ${mediaBreakpointDesktop("display: grid; grid-auto-flow: column;")};
`;

export const NavSubListStyledUl = styled(NavListStyledUl)<{
  subNavOpen?: boolean;
}>`
  ${mediaBreakpointDesktop(`
    position: absolute;
    left: 0;
    background-color: #1d1a3d;
    color: ${$mainColor};
    z-index: 3;
    overflow: auto;
    display: block;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding-bottom: 10px;
  `)};
  height: ${({ subNavOpen }) => (subNavOpen ? "auto" : 0)};
`;
