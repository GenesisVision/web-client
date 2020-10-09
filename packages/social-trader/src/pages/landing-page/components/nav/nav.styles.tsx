import { mediaBreakpointDesktop } from "components/gv-styles/gv-media";
import { resetList } from "pages/landing-page/styles/landing-styles";
import styled from "styled-components";

export const NavListContainer = styled.nav<{ isMobile?: boolean }>`
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

export const NavListStyledUl = styled.ul`
  ${resetList};
  ${mediaBreakpointDesktop("display: grid; grid-auto-flow: column;")}
`;
