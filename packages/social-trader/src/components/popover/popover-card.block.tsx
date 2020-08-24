import { $secondaryBackgroundColor } from "components/gv-styles/gv-colors/gv-colors";
import {
  $fontSizeCommon,
  $modalWidth,
  $paddingSmall,
  $paddingXsmall,
  $popoverPaddingLarge,
  $popoverPaddingMedium,
  $popoverPaddingSmall
} from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";
import {
  adaptiveFullPadding,
  fontSize,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/style-mixins";
import { SizesType } from "utils/types";

interface IPopoverContentCardBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  className?: string;
  size?: SizesType | null;
  stretched?: boolean;
  fixed?: boolean;
}

export const PopoverContentCardBlock = styled.div<
  IPopoverContentCardBlockProps
>`
  box-sizing: border-box;
  background-color: ${({ dark }) =>
    dark ? $secondaryBackgroundColor : "#23303c"};
  ${({ fixed }) =>
    fixed &&
    `
    max-width: ${$modalWidth};
  `}
  ${({ stretched, size = "middle" }) => {
    switch (size) {
      case "small":
        return `
        ${fontSize($fontSizeCommon)};
        ${adaptiveFullPadding($popoverPaddingSmall)};
        ${stretched &&
          `
            ${horizontalPaddings($popoverPaddingSmall)};
            ${verticalPaddings($paddingXsmall)};
        `}
        `;
      case "middle":
        return `
        ${adaptiveFullPadding($popoverPaddingMedium)};
        ${stretched &&
          `
            ${horizontalPaddings($popoverPaddingMedium)};
            ${verticalPaddings($paddingSmall)};
        `}
        `;
      case "large":
        return adaptiveFullPadding($popoverPaddingLarge);
    }
  }}
`;
