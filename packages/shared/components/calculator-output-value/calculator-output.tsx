import "./calculator-output.scss";

import classNames from "classnames";
import * as React from "react";
import NumberFormat from "react-number-format";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import withLoader from "shared/decorators/with-loader";

const _CalculatorOutput: React.FC<Props> = ({
  label,
  value,
  valueSuffix,
  className,
  tooltipContent
}) => {
  return (
    <div className={classNames("calculator-output", className)}>
      <StatisticItem
        label={
          <div className="calculator-output__label">
            <span>{label}</span>
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
        }
        accent
      >
        <span className="calculator-output__value">
          <NumberFormat
            value={value}
            thousandSeparator={" "}
            displayType="text"
            suffix={valueSuffix}
          />
        </span>
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

const CalculatorOutput = React.memo(withLoader(_CalculatorOutput));
export default CalculatorOutput;
