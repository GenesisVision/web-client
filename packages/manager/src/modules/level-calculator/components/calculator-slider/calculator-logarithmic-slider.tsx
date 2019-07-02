import * as React from "react";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

import CalculatorSlider, { ICalculatorSliderProps } from "./calculator-slider";

const CalculatorLogarithmicSlider: React.FC<ICalculatorSliderProps> = ({
  name,
  value,
  max,
  label,
  valueSuffix,
  className,
  tooltipContent,
  onChange
}) => {
  const handleChange = React.useCallback(
    (name: string, newValue: number) => {
      const val = Math.pow(newValue, 4);
      const t = max * val;
      onChange(name, +formatValue(t, 2));
    },
    [max]
  );

  const logarithmicValue = React.useCallback(
    value => {
      const val = value / max;
      let t = Math.pow(val, 1 / 4);
      return +formatValue(t, 2);
    },
    [max]
  );

  return (
    <CalculatorSlider
      name={name}
      min={0}
      max={1}
      step={0.0001}
      value={logarithmicValue(value)}
      label={label}
      minLabel={<NumberFormat value={0} displayType="text" />}
      maxLabel={
        <NumberFormat value={max} displayType="text" thousandSeparator=" " />
      }
      formattedValue={value}
      valueSuffix={valueSuffix}
      className={className}
      tooltipContent={tooltipContent}
      onChange={handleChange}
    />
  );
};

export default CalculatorLogarithmicSlider;
