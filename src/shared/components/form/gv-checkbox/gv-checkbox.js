import React from "react";

import "./gv-checkbox.css";

const GVCheckbox = ({ name, label, value, onChange }) => {
  const handleChange = e => {
    onChange(e.target.checked);
  };

  return (
    <label htmlFor={name} className="gv-checkbox__container">
      {label}
      <input
        type="checkbox"
        className="gv-checkbox__input"
        id={name}
        checked={!!value}
        onChange={handleChange}
      />
      <span className="gv-checkbox__check-container">
        <i className="gv-checkbox__check fas fa-check" />
      </span>
    </label>
  );
};

export default GVCheckbox;
