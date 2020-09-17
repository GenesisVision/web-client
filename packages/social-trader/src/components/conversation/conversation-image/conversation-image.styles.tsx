import ImageBase from "components/avatar/image-base";
import ImageBaseElement from "components/avatar/image-base.element";
import { $panelBackgroundColor } from "components/gv-styles/gv-colors/gv-colors";
import {
  $borderRadius,
  $fontSizeXsmall,
  $paddingXxsmall
} from "components/gv-styles/gv-sizes";
import styled, { css } from "styled-components";
import {
  adaptiveBorderRadius,
  adaptiveFullPadding,
  fontSize,
  transition,
  unselectable
} from "utils/style/style-mixins";
import { SizesType } from "utils/types";

const $imageHeightSmall = "100px";
const $imageHeightMiddle = "200px";
const $imageHeightLarge = "600px";
const $imageHeightFull = "90vh";
const $imageWidthFull = "90vw";
const $imageFullButtonSize = 30;

const imageStyles = css<{ size: SizesType }>`
  display: block;
  ${adaptiveBorderRadius($borderRadius)};
  cursor: pointer;
  ${({ size }) => {
    switch (size) {
      case "small":
        return `height: ${$imageHeightSmall};`;
      case "middle":
        return `height: ${$imageHeightMiddle};`;
      case "large":
        return `
        max-width: 100%;
        min-height: ${$imageHeightSmall};
        max-height: ${$imageHeightLarge};
        `;
    }
  }};
`;

export const ConversationImageImageBaseElement = styled(ImageBaseElement)<{
  size: SizesType;
}>`
  ${imageStyles};
`;

export const ConversationImageEmptyImageContainer = styled.div<{
  size: SizesType;
}>`
  ${imageStyles};
  ${unselectable};
  cursor: default;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  ${fontSize($fontSizeXsmall)};
  ${adaptiveFullPadding($paddingXxsmall)};
`;

export const ConversationImagesFullContainer = styled.div`
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConversationImagesFullWrapper = styled(
  ConversationImagesFullContainer
)`
  height: auto;
  position: relative;
  background: ${$panelBackgroundColor};
`;

export const ConversationImagesFullImage = styled(ImageBase)`
  display: block;
  cursor: pointer;
  min-height: ${$imageHeightMiddle};
  max-height: ${$imageHeightFull};
  max-width: ${$imageWidthFull};
`;

export const ConversationImagesFullButton = styled.div<{
  left?: boolean;
  right?: boolean;
  show?: boolean;
}>`
  padding: ${$imageFullButtonSize / 4}px;
  cursor: pointer;
  position: absolute;
  top: calc(50% - ${$imageFullButtonSize / 2}px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${$imageFullButtonSize}px;
  height: ${$imageFullButtonSize}px;
  border-radius: 50%;
  background: ${$panelBackgroundColor};
  font-size: ${$imageFullButtonSize}px;
  font-weight: bold;
  ${transition("opacity")};
  ${({ left, right }) => {
    if (left) return `left: ${$imageFullButtonSize / 4}px;`;
    if (right) return `right: ${$imageFullButtonSize / 4}px;`;
  }};
  opacity: ${({ show }) => (show ? 0.5 : 0)};
  &:hover {
    opacity: 0.8;
  }
`;
