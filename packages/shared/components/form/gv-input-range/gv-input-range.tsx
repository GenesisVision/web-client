import "./gv-input-range.css";

import * as React from "react";
import InputRange, { Range } from "react-input-range";

interface IGVInputRangeProps {
  field: { name: string; value: string | number };
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  value?: Range | number;
}

const GVInputRange: React.FC<IGVInputRangeProps> = ({
  field,
  setFieldValue,
  value,
  ...other
}) => {
  const handleChange = (value: Range | number) => {
    setFieldValue(field.name, value);
  };
  return <InputRange value={value} onChange={handleChange} {...other} />;
};

export default GVInputRange;
