import "./gv-select.css";

import * as React from "react";
import Select from "react-select";

interface IGVSelectProps {
  field: { name: string; value: string | number };
  setFieldValue(field: string, value: any, shouldValidate?: boolean): void;
  onChange(value: any): void;
  onBlur(value: any, flag: boolean): void;
}

const GVSelect: React.FC<IGVSelectProps> = ({
  field,
  setFieldValue,
  onChange,
  onBlur,
  ...other
}) => {
  const handleChange = value => {
    setFieldValue(field.name, value);
    const newValue = value ? value.value : "";
    onChange(newValue);
  };

  const handleBlur = () => {
    onBlur(field.name, true);
  };

  return (
    <Select
      id={field.name}
      name={field.name}
      onChange={handleChange}
      onBlur={handleBlur}
      {...other}
    />
  );
};

export default GVSelect;
