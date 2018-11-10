import InputRange from "react-input-range";
import React from "react";

import "./gv-input-range.css";

const GVInputRange = ({ field, setFieldValue, ...other }) => {
  const handleChange = value => {
    setFieldValue(field.name, value);
  };
  return <InputRange onChange={handleChange} {...other} />;
};

export default GVInputRange;
