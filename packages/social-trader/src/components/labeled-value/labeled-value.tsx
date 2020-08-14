import { dynamicLabeledValueStyles } from "components/labeled-value/labeled-value.style";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
import { withStyles } from "decorators/withStyles";
import React from "react";
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

const _LabeledValue: React.FC<ILabeledValueProps> = ({
  className,
  weight,
  direction = "column",
  label,
  size = "middle",
  children
}) => {
  return (
    <div className={className}>
      <Row onlyOffset>
        <Text wrap={false} muted size={size}>
          {label}
        </Text>
      </Row>
      <Row
        onlyOffset
        size={direction !== "row" ? getChildOffsetValue(size) : undefined}
      >
        <Text
          weight={weight}
          sizeValue={size === "middle" ? "14px" : undefined}
        >
          {children}
        </Text>
      </Row>
    </div>
  );
};

export const LabeledValue = withStyles<ILabeledValueProps>({
  dynamicStyles: dynamicLabeledValueStyles
})(_LabeledValue);
