import { dynamicLabeledValueStyles, StyleProps } from "components/labeled-value/labeled-value.style";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";
import { SizesType } from "utils/types";

const getChildOffsetValue = (size: SizesType): SizesType => {
  switch (size) {
    case "xlarge":
      return "large";
    case "large":
      return "middle";
    case "middle":
    default:
      return "small";
  }
};

const Container = styled.div<StyleProps>`
  ${dynamicLabeledValueStyles}
`;

export const LabeledValue: React.FC<ILabeledValueProps> = ({
  weight,
  direction = "column",
  label,
  size = "middle",
  children
}) => {
  return (
    <Container direction={direction}>
      <Row onlyOffset>
        <Text wrap={false} muted size={size}>
          {label}
        </Text>
      </Row>
      <Row
        onlyOffset
        size={direction === "row" ? "zero" : getChildOffsetValue(size)}
      >
        <Text weight={weight} sizeValue={size === "middle" ? "14" : undefined}>
          {children}
        </Text>
      </Row>
    </Container>
  );
};
