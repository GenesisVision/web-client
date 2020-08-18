import {
  ILabeledValueProps,
  LabeledValue
} from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";

interface Props extends ILabeledValueProps {}

export const InvestmentItem: React.FC<Props> = ({ children, label }) => {
  return (
    <RowItem size={"xlarge"}>
      <LabeledValue label={label}>
        <Text weight={"bold"} wrap={false}>
          {children}
        </Text>
      </LabeledValue>
    </RowItem>
  );
};
