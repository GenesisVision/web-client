import { BlurContainer } from "components/blur-container/blur-container";
import {
  ILabeledValueProps,
  LabeledValue
} from "components/labeled-value/labeled-value";
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
