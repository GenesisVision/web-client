import {
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall,
  $paddingXxxsmall
} from "components/gv-styles/gv-sizes";
import { IRowProps } from "components/row/row.types";
import { css } from "styled-components";
import { adaptiveMargin, cursorPointer } from "utils/style/style-mixins";

export const RowDynamicStyles = css`
  ${cursorPointer}
  display: ${({ hide, onlyOffset }: IRowProps) =>
    hide ? "none" : !onlyOffset ? "flex" : "block"};
  width: ${({ wide }: IRowProps) => (wide ? "100%" : "auto")};
  &:not(:first-child){
  ${({ size = "middle" }: IRowProps) => {
    switch (size) {
      case "xsmall":
        return adaptiveMargin("top", $paddingXxxsmall);
      case "small":
        return adaptiveMargin("top", $paddingXxsmall);
      case "middle":
        return adaptiveMargin("top", $paddingXsmall);
      case "large":
        return adaptiveMargin("top", $paddingSmall);
      case "xlarge":
        return adaptiveMargin("top", $paddingMedium);
    }
  }}
  }
`;
