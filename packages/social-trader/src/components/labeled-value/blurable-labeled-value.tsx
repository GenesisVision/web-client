import { BlurContainer } from "components/blur-container/blur-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import React from "react";
import { TagType } from "utils/types";

interface Props extends ILabeledValueProps {
  isPending?: boolean;
  tag?: TagType;
}

export const BlurableLabeledValue: React.FC<Props> = ({
  isPending,
  children,
  tag,
  ...otherProps
}) => {
  return (
    <LabeledValue {...otherProps}>
      <BlurContainer blur={!!isPending} tag={tag}>
        {children}
      </BlurContainer>
    </LabeledValue>
  );
};
