import ImageBase from "components/avatar/image-base";
import ImageBaseElement from "components/avatar/image-base.element";
import styled, { css } from "styled-components";
import { $panelBackgroundColor } from "utils/style/colors";
import {
  adaptiveBorderRadius,
  adaptiveFullPadding,
  fontSize,
  transition,
  unselectable
} from "utils/style/mixins";
import {
  $borderRadius,
  $fontSizeXsmall,
  $paddingXxsmall
} from "utils/style/sizes";
import { SizesType } from "utils/types";

const $imageHeightSmall = 100;
const $imageHeightMiddle = 200;
const $imageHeightLarge = 600;
const $imageHeightFull = "90vh";
const $imageWidthFull = "90vw";
const $imageFullButtonSize = 30;

interface IImageStylesProps {
  size: SizesType;
  height?: number;
  width?: number;
}

const imageStyles = css<IImageStylesProps>`
  display: block;
  ${adaptiveBorderRadius($borderRadius)};
  cursor: pointer;
  ${({ size, height, width }) => {
    switch (size) {
      case "small":
        return `height: ${$imageHeightSmall}px;`;
      case "middle":
        return `height: ${$imageHeightMiddle}px;`;
      case "large":
        if (height && width && height >= width)
          return `height: ${Math.min($imageHeightLarge, height)}px;`;
        return `
        max-width: 100%;
        min-height: ${$imageHeightSmall}px;
        max-height: ${$imageHeightLarge}px;
        `;
    }
  }};
`;

export const ConversationImageImageBaseElement = styled(ImageBaseElement)<
  IImageStylesProps
>`
  ${imageStyles};
`;

export const ConversationImageEmptyImageContainer = styled.div<
  IImageStylesProps
>`
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
