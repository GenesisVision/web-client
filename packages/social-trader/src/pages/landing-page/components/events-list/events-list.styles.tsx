import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointTablet
} from "components/gv-styles/gv-media";
import { resetList } from "pages/landing-page/styles/landing-styles";
import styled from "styled-components";

export const EventsListUl = styled.ul<{ height: number }>`
  ${mediaBreakpointTablet("grid-column: 3/11;")}
  ${mediaBreakpointLandscapeTablet("grid-column: 4/10;")}
  ${resetList}
  position: relative;
  min-height: 600px;
  height: ${({ height }) => height}px;
`;
