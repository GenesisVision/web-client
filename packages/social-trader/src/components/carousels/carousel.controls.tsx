import "react-alice-carousel/lib/alice-carousel.css";

import React from "react";
import styled from "styled-components";
import { $mainColor } from "utils/style/colors";
import { mediaBreakpointDesktop } from "utils/style/media";
import { $fontSizeH1, $fontSizeH2 } from "utils/style/sizes";

export enum POSITION_ARROW {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right"
}

interface IStyledCarouselButtonProps {
  isDisabled?: boolean;
  position: POSITION_ARROW;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledCarouselButton = styled.button<IStyledCarouselButtonProps>`
  display: none;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  width: auto;
  top: 50%;
  transform: translateY(-50%);
  ${mediaBreakpointDesktop(`
      display: block;
    `)}
  ${({ isDisabled }: IStyledCarouselButtonProps) =>
    isDisabled &&
    `
    opacity: 0.4;
    pointer-events: none;
  `};
  ${({ position }: IStyledCarouselButtonProps) => {
    switch (position) {
      case POSITION_ARROW.LEFT:
        return `
          left: -10px;
          transform: translateX(-50%) translateY(-50%);`;
      case POSITION_ARROW.RIGHT:
        return `
          right: -10px;
          transform: translateX(50%) translateY(-50%);`;
      case POSITION_ARROW.TOP:
        return `
          top: 0;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);`;
      case POSITION_ARROW.BOTTOM:
        return `
          bottom: 0;
          top: auto;
          left: 50%;
          transform: translateX(-50%) translateY(100%);`;
    }
  }}
`;

interface IArrowProps {
  position: POSITION_ARROW;
}

const Arrow = styled.div<IArrowProps>`
  display: inline-block;
  text-align: center;
  font-size: ${$fontSizeH1}px;
  line-height: ${$fontSizeH2}px;
  width: ${$fontSizeH2}px;
  color: ${$mainColor};
  ${({ position }: IArrowProps) => {
    switch (position) {
      case POSITION_ARROW.LEFT:
        return `
          transform: rotate(180deg)`;
      case POSITION_ARROW.TOP:
        return `
          transform: rotate(90deg)`;
      case POSITION_ARROW.BOTTOM:
        return `
        transform: rotate(-90deg)`;
    }
  }}
`;

export const _CarouselButton: React.FC<IStyledCarouselButtonProps> = ({
  isDisabled = false,
  position,
  onClick
}) => (
  <StyledCarouselButton
    isDisabled={isDisabled}
    position={position}
    onClick={onClick}
  >
    <Arrow position={position}>&rsaquo;</Arrow>
  </StyledCarouselButton>
);

export const CarouselButton = React.memo(_CarouselButton);
