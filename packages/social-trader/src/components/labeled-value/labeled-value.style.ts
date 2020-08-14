import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import { css } from "styled-components";

export const dynamicLabeledValueStyles = css`
  display: flex;
  width: 100%;
  flex-direction: ${({ direction = "column" }: ILabeledValueProps) => {
    switch (direction) {
      case "column":
        return "column";
      case "row":
        return "row";
    }
  }};
  ${({ direction = "column" }: ILabeledValueProps) =>
    direction === "row" && "justify-content: space-between"}};
`;
