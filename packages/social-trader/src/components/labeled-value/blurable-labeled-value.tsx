import { BlurContainer } from "components/blur-container/blur-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import React from "react";

interface Props extends ILabeledValueProps {
  isPending?: boolean;
}

export const BlurableLabeledValue: React.FC<Props> = ({
  isPending,
  children,
  ...otherProps
}) => {
  return (
    <LabeledValue {...otherProps}>
      <BlurContainer blur={!!isPending}>{children}</BlurContainer>
    </LabeledValue>
  );
};
