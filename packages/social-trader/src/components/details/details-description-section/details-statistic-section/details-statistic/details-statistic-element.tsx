import { LabeledValue } from "components/labeled-value/labeled-value";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
import { RowItem } from "components/row-item/row-item";
import { IRowItemProps } from "components/row-item/row-item.types";
import React from "react";

interface Props extends ILabeledValueProps, IRowItemProps {}

export const DetailsStatisticElement: React.FC<Props> = ({
  bottomOffset = true,
  label,
  children
}) => {
  return (
    <RowItem bottomOffset={bottomOffset}>
      <LabeledValue label={label}>{children}</LabeledValue>
    </RowItem>
  );
};
