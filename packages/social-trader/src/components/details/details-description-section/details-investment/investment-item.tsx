import { LabeledValue } from "components/labeled-value/labeled-value";
import { ILabeledValueProps } from "components/labeled-value/labeled-value.types";
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
