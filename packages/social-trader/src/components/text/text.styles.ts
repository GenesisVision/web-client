import { ITextProps } from "components/text/text.types";
import { css } from "styled-components";
import {
  $labelColor,
  $negativeColor,
  $positiveColor,
  $textLightColor,
  $yellow
} from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import {
  $fontSizeCommon,
  $fontSizeH2,
  $fontSizeH4,
  $fontSizeSmall,
  $fontSizeXsmall
} from "utils/style/sizes";

export const dynamicTextStyles = css`
  white-space: ${({ wrap = true, preWrap }: ITextProps) => {
    if (wrap && !preWrap) return "normal";
    if (preWrap) return "pre-wrap";
    return "nowrap";
  }};
  font-weight: ${({ weight = "normal" }: ITextProps) => {
    switch (weight) {
      case "thin":
        return 200;
      case "normal":
        return 400;
      case "bold":
        return 600;
      case "bolder":
        return 800;
    }
  }};
  ${({ size = "middle", sizeValue }: ITextProps) => {
    if (sizeValue) return fontSize(+sizeValue);
    switch (size) {
      case "xsmall":
        return fontSize($fontSizeXsmall);
      case "small":
        return fontSize($fontSizeSmall);
      case "middle":
        return fontSize($fontSizeCommon);
      case "large":
        return fontSize($fontSizeH4);
      case "xlarge":
        return fontSize($fontSizeH2);
    }
  }};
  color: ${({ color, muted }: ITextProps) => {
    if (muted) return $labelColor;
    switch (color) {
      case "white":
        return $textLightColor;
      case "#00ff00":
      case "green":
        return $positiveColor;
      case "red":
      case "#ff0000":
        return $negativeColor;
      case "yellow":
        return $yellow;
    }
  }};
`;
