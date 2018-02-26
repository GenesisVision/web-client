import React from "react";

import "./input-text.css";

const InputText = ({ addon, touched, error, ...props }) => {
  const showError = touched && error;
  const validationClass = touched ? (error ? " is-invalid" : " is-valid") : "";

  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <span className={`${addon} field-input__addon`} />
          </span>
        </div>
        <input
          className={`form-control${validationClass}`}
          autoComplete="off"
          {...props}
        />
        {showError && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default InputText;
