import { Center } from "components/center/center";
import { IRowProps } from "components/row/row.types";
import styled from "styled-components";
import { adaptiveMargin } from "utils/style/mixins";
import {
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall,
  $paddingXxxsmall
} from "utils/style/sizes";

export const RowStyledCenter = styled(Center)<IRowProps>`
  width: ${({ wide }: IRowProps) => (wide ? "100%" : "auto")};
  &:not(:first-child) {
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
