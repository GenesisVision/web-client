import "./gv-select.css";

import React from "react";
import Select from "react-select";

const GVSelect = ({ field, setFieldValue, onChange, onBlur, ...other }) => {
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
