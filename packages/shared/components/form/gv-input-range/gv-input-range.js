import "./gv-input-range.css";

import React from "react";
import InputRange from "react-input-range";

const GVInputRange = ({ field, setFieldValue, ...other }) => {
  const handleChange = value => {
    setFieldValue(field.name, value);
  };
  return <InputRange onChange={handleChange} {...other} />;
};

export default GVInputRange;
