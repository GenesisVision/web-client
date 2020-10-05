import { ButtonIcon } from "components/button-icon/button-icon";
import { ShortArrowSource } from "components/icon/short-arrow/short-arrow.source";
import React from "react";
import styled from "styled-components";

export type ShortArrowDirectionType = "top" | "right" | "bottom" | "left";

interface Props {
  direction?: ShortArrowDirectionType;
}

const StyledButtonIcon = styled(ButtonIcon)<Props>`
  transform: rotate(
    ${({ direction }) => {
      switch (direction) {
        case "top":
          return "180deg";
        case "right":
          return "-90deg";
        case "bottom":
          return "0";
        case "left":
          return "90deg";
      }
    }}
  );
`;

const ShortArrow: React.FC<Props> = ({ direction = "right" }) => {
  return (
    <StyledButtonIcon direction={direction}>
      <ShortArrowSource />
    </StyledButtonIcon>
  );
};

export default ShortArrow;
