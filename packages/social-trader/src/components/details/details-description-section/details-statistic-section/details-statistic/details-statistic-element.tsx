import {
  ILabeledValueProps,
  LabeledValue
} from "components/labeled-value/labeled-value";
import { IRowItemProps, RowItem } from "components/row-item/row-item";
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
