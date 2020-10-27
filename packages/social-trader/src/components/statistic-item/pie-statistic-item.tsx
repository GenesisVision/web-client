import { Center } from "components/center/center";
import { LabeledValue } from "components/labeled-value/labeled-value";
import PieContainer from "components/pie-container/pie-container";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import withLoader from "decorators/with-loader";
import React from "react";
import NumberFormat from "react-number-format";
import { getPercentageValue } from "utils/helpers";

interface Props {
  onClick?: VoidFunction;
  tooltipContentLabel?: string;
  color: string;
  label: string;
  total: number;
  value: number;
  suffix: string;
}

const _PieStatisticItem: React.FC<Props> = ({
  onClick,
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
    <RowItem bottomOffset onClick={onClick} size={"xlarge"}>
      <Center>
        <RowItem>
          <PieContainer
            value={percentValue}
            label={`${percentValue} %`}
            color={color}
          />
        </RowItem>
        <RowItem>
          <LabeledValue weight={"bold"} label={renderLabel}>
            <Text weight={"bold"} wrap={false}>
              {renderValue}
            </Text>
          </LabeledValue>
        </RowItem>
      </Center>
    </RowItem>
  );
};

export const PieStatisticItem = withLoader(React.memo(_PieStatisticItem));
