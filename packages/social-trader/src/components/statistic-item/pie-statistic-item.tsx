import { Center } from "components/center/center";
import PieContainer from "components/pie-container/pie-container";
import { RowItem } from "components/row-item/row-item";
import { StatisticItemContainerBlock } from "components/statistic-item/statistic-item-container.block";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
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
    <StatisticItemContainerBlock>
      <Center>
        <RowItem>
          <PieContainer
            value={percentValue}
            label={`${percentValue} %`}
            color={color}
          />
        </RowItem>
        <StatisticItemInner accent label={renderLabel}>
          {renderValue}
        </StatisticItemInner>
      </Center>
    </StatisticItemContainerBlock>
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
