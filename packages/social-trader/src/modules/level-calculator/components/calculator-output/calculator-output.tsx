import { Center } from "components/center/center";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { RowItem } from "components/row-item/row-item";
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
    <div className={className}>
      <LabeledValue
        label={
          <Center className={styles["calculator-output__label"]}>
            <RowItem size={"small"}>{label}</RowItem>
            {tooltipContent && (
              <RowItem>
                <TooltipLabel tooltipContent={tooltipContent} />
              </RowItem>
            )}
          </Center>
        }
      >
        <div className={styles["calculator-output__value"]}>{value}</div>
      </LabeledValue>
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
