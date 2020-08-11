import {
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall,
  $paddingXxxsmall
} from "components/gv-styles/gv-sizes";
import { IRowItemProps } from "components/row-item/row-item.types";
import { css } from "styled-components";
import { adaptiveMargin } from "utils/style/style-mixins";

export const RowItemStaticStyles = {
  "box-sizing": "border-box"
};

const getOffset = (size: number, bottom: boolean) => {
  return `${adaptiveMargin("right", size)}${
    bottom ? adaptiveMargin("bottom", size) : ""
  }`;
};

export const RowItemDynamicStyles = css`
  cursor: ${({ onClick }: IRowItemProps) => (onClick ? "pointer" : "default")};
  display: ${({ hide }: IRowItemProps) => (hide ? "none" : "block")};
  width: ${({ wide }: IRowItemProps) => (wide ? "100%" : "auto")};
  ${({ size = "middle", bottomOffset }: IRowItemProps) => {
    switch (size) {
      case "xsmall":
        return getOffset($paddingXxxsmall, !!bottomOffset);
      case "small":
        return getOffset($paddingXxsmall, !!bottomOffset);
      case "middle":
        return getOffset($paddingXsmall, !!bottomOffset);
      case "large":
        return getOffset($paddingSmall, !!bottomOffset);
      case "xlarge":
        return getOffset($paddingMedium, !!bottomOffset);
    }
  }}
`;
