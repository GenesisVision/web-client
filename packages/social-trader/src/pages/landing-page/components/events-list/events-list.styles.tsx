import {
  $landingBgGray2,
  $landingColorIcon,
  $mainColor,
  $primaryColor
} from "components/gv-styles/gv-colors/gv-colors";
import {
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "components/gv-styles/gv-media";
import Link from "components/link/link";
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

export const EventItemLi = styled.li<{
  isShow?: boolean;
  transform: string;
  minHeight: number;
}>`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.5s, opacity 0.5s;
  border: 1px solid ${$landingBgGray2};
  background-color: ${$mainColor};
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  transform: ${({ transform }) => transform};
  min-height: ${({ minHeight }) => minHeight || 80}px;
  ${mediaBreakpointLargeDesktop("padding-left: 40px; padding-right: 40px;")}
`;

export const EventItemLink = styled(Link)`
  color: inherit;
  &:hover {
    color: ${$primaryColor};
  }
`;

export const EventItemAvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${$landingColorIcon};
  border-radius: 10px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mediaBreakpointTablet(`
    width: 60px;
    height: 60px;
    border-radius: 15px;
  `)}
  ${mediaBreakpointLargeDesktop(`
    width: 100px;
    height: 100px;
  `)}
`;
