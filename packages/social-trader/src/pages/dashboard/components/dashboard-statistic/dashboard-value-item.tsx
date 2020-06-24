import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _DashboardValueItem: React.FC<Props> = ({
  value,
  label,
  currency,
  big
}) => {
  return (
    <RowItem xlarge>
      <LabeledValue size={big ? "xlarge" : undefined} label={label}>
        <Text size={"large"} weight={"bold"}>
          {currency ? (
            <NumberFormat
              value={formatCurrencyValue(value, currency)}
              thousandSeparator={" "}
              suffix={` ${currency}`}
              displayType="text"
            />
          ) : (
            value
          )}
        </Text>
      </LabeledValue>
    </RowItem>
  );
};

interface Props {
  big?: boolean;
  value: number;
  label: string | React.ReactNode;
  currency?: CurrencyEnum;
}

const DashboardValueItem = React.memo(_DashboardValueItem);
export default DashboardValueItem;
