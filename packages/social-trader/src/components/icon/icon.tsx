import * as React from "react";
import styled from "styled-components";
import {
  $iconColor,
  $primaryColor,
  $textAccentColor
} from "utils/style/colors";
import { transition } from "utils/style/mixins";

export interface IIconProps {
  onClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  type?: string;
  primary?: boolean;
  secondary?: boolean;
  rotate?: boolean;
  selected?: boolean;
  className?: string;
}

export const Icon = styled.div<IIconProps>`
  height: 100%;
  width: 100%;
  display: flex;
  background-repeat: no-repeat;
  background-size: contain;

  svg {
    height: 100%;
    width: 100%;
  }
  svg path {
    ${transition("fill", "stroke")};
  }
  ${({ rotate }: IIconProps) => rotate && `transform: rotate(180deg);`}

  svg [fill] {
    fill: ${({ primary, secondary, selected }: IIconProps) => {
      if (primary) return $primaryColor;
      if (secondary) return $iconColor;
      if (selected) return `${$primaryColor} !important`;
      return "white";
    }};
  }
  svg [stroke] {
    stroke: ${({ primary, secondary, selected }: IIconProps) => {
      if (primary) return $primaryColor;
      if (secondary) return $iconColor;
      if (selected) return `${$primaryColor} !important`;
      return "white";
    }};
  }

  ${({ selected }: IIconProps) =>
    selected &&
    `svg {
      fill: ${$primaryColor} !important;
      stroke: ${$primaryColor} !important;
    }
    &:hover {
      svg [stroke] {
        stroke: ${$textAccentColor};
      }
    }
    `}
`;
