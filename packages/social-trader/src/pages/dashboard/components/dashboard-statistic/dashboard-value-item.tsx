import StatisticItem from "components/statistic-item/statistic-item";
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
    <StatisticItem big={big} accent label={label}>
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
    </StatisticItem>
  );
};

interface Props {
  big?: boolean;
  value: number;
  label: string;
  currency?: CurrencyEnum;
}

const DashboardValueItem = React.memo(_DashboardValueItem);
export default DashboardValueItem;
