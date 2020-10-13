import ImageBase from "components/avatar/image-base";
import Link from "components/link/link";
import { resetList } from "pages/landing-page/styles/landing-styles";
import styled from "styled-components";
import {
  $landingBgGray2,
  $landingColorIcon,
  $mainColor,
  $primaryColor,
  $rowColor
} from "utils/style/colors";
import {
  mediaBreakpointDesktop,
  mediaBreakpointLandscapeTablet,
  mediaBreakpointLargeDesktop,
  mediaBreakpointTablet
} from "utils/style/media";
import { transition } from "utils/style/mixins";

export const EventsListUl = styled.ul<{ height: number }>`
  ${mediaBreakpointTablet("grid-column: 3/11;")}
  ${mediaBreakpointLandscapeTablet("grid-column: 4/10;")}
  ${resetList}
  position: relative;
  min-height: 600px;
  height: ${({ height }) => height}px;
`;

export const EventItemLi = styled.li<{
  last?: boolean;
  isShow?: boolean;
  transform?: string;
  minHeight: number;
}>`
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  position: absolute;
  top: ${({ last }) => (last ? "auto" : 0)};
  ${({ last }) => last && "bottom: 0"};
  width: 100%;
  transition: transform 0.5s, opacity 0.5s;
  border: 1px solid ${$landingBgGray2};
  background-color: ${$mainColor};
  opacity: ${({ isShow, last }) => (isShow || last ? 1 : 0)};
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

export const EventItemAvatarContainer = styled.div<{ last?: boolean }>`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background: ${({ last }) =>
    last ? "linear-gradient(0deg, #f7f7f7, #f7f7f7);" : $landingColorIcon};
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

export const EventItemImage = styled(ImageBase)<{ last?: boolean }>`
  border-radius: ${({ last }) => (last ? 0 : "10px")};
  width: ${({ last }) => (last ? "36px" : "100%")};
  height: ${({ last }) => (last ? "20px" : "auto")};

  ${({ last }) => !last && mediaBreakpointTablet("border-radius: 15px;")};
`;

export const EventItemInfo = styled.div`
  margin-right: 5px;
`;

export const EventItemTitle = styled.div`
  ${transition("color")};
  font-weight: 600;
  font-size: 13px;
  line-height: 1;
  ${mediaBreakpointTablet("font-size: 20px;margin-bottom: 10px;")};
  ${mediaBreakpointLargeDesktop("font-size: 22px;")};
`;

export const EventItemText = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 21px;
  ${mediaBreakpointTablet("font-size: 14px;")};
  ${mediaBreakpointLargeDesktop("font-size: 16px;")};
`;

export const EventItemValues = styled.div`
  display: none;
  ${mediaBreakpointTablet(`
    display: block;
    margin-left: auto;
    text-align: center;
  `)};
`;

export const EventItemNumber = styled.div`
  ${mediaBreakpointTablet(`
    display: block;
    background-color: ${$landingBgGray2};
    border-radius: 20px;
    color: ${$rowColor};
    font-size: 13px;
    line-height: 1;
    font-weight: 600;
    padding: 10px 15px;
    margin-bottom: 5px;
  `)};
  ${mediaBreakpointLargeDesktop(`
    font-size: 16px;
    padding: 15px;
  `)};
`;

export const EventItemDate = styled.div`
  font-size: 11px;
  line-height: 1.6;
  ${mediaBreakpointDesktop(`
      font-size: 12px;
  `)};
  ${mediaBreakpointLargeDesktop(`
    font-size: 13px;
  `)};
`;

export const EventItemButton = styled.div`
  margin-left: auto;
`;

export const EventItemAdaptiveElem = styled.div<{
  mobile?: boolean;
  desktop?: boolean;
}>`
  ${({ mobile, desktop }) => {
    if (mobile) return mediaBreakpointTablet("display: none;");
    if (desktop)
      return `
      display: none;
      ${mediaBreakpointTablet("display: inline-block;")}
    `;
  }};
`;
