import PieContainer from "components/pie-container/pie-container";
import StatisticItem from "components/statistic-item/statistic-item";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import withLoader from "decorators/with-loader";
import React from "react";
import NumberFormat from "react-number-format";
import { getPercentageValue } from "utils/helpers";

const _PieStatisticItem: React.FC<Props> = ({
  tooltipContentLabel,
  total,
  label,
  value,
  suffix,
  color
}) => {
  const renderLabel = tooltipContentLabel ? (
    <TooltipLabel tooltipContent={tooltipContentLabel} labelText={label} />
  ) : (
    label
  );
  const percentValue = getPercentageValue(value, total);
  const renderValue = suffix ? (
    <NumberFormat
      value={value}
      thousandSeparator={" "}
      suffix={` ${suffix}`}
      displayType="text"
    />
  ) : (
    value
  );
  return (
    <div className="pie-statistics-item">
      <StatisticItemContainerBlock className="pie-statistics-item__pie-block">
        <PieContainer
          value={percentValue}
          label={`${percentValue} %`}
          color={color}
        />
      </StatisticItemContainerBlock>
      <StatisticItem accent label={renderLabel}>
        {renderValue}
      </StatisticItem>
    </div>
  );
};

interface Props {
  tooltipContentLabel?: string;
  color: string;
  label: string;
  total: number;
  value: number;
  suffix: string;
}

export const PieStatisticItem = withLoader(React.memo(_PieStatisticItem));
