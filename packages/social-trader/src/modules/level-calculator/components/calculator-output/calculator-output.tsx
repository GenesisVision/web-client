import classNames from "classnames";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import withLoader from "decorators/with-loader";
import * as React from "react";

import styles from "./calculator-output.module.scss";

const _CalculatorOutput: React.FC<Props> = ({
  label,
  value,
  className,
  tooltipContent
}) => {
  return (
    <div className={classNames(styles["calculator-output"], className)}>
      <StatisticItem
        label={
          <div className={styles["calculator-output__label"]}>
            <span>{label}</span>
            {tooltipContent && <TooltipLabel tooltipContent={tooltipContent} />}
          </div>
        }
        accent
      >
        <span className={styles["calculator-output__value"]}>{value}</span>
      </StatisticItem>
    </div>
  );
};

interface Props {
  label: string;
  value: string | React.ReactNode;
  tooltipContent?: string;
  className?: string;
}

const CalculatorOutput = React.memo(withLoader(_CalculatorOutput));
export default CalculatorOutput;
