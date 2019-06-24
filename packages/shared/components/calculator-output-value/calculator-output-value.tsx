import "./calculator-output-value.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import withLoader from "shared/decorators/with-loader";

const _CalculatorOutputValue: React.FC<Props> = ({
  label,
  value,
  valueSuffix,
  className,
  tooltipContent
}) => {
  return (
    <div className={classNames("calculator-output-value", className)}>
      <StatisticItem
        label={
          <div className="calculator-output-value__label">
            {label}
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
        }
        accent
      >
        <NumberFormat
          value={value}
          thousandSeparator={" "}
          displayType="text"
          suffix={valueSuffix}
        />
      </StatisticItem>
    </div>
  );
};

interface Props {
  label: string;
  value: string | number;
  tooltipContent?: string;
  valueSuffix?: string;
  className?: string;
}

const CalculatorOutputValue = React.memo(withLoader(_CalculatorOutputValue));
export default CalculatorOutputValue;
