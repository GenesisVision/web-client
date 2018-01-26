import React from "react";
import "./FieldInput.css";

const FieldInput = ({
  input,
  placeholder,
  type,
  addon,
  meta: { touched, error }
}) => {
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
          {...input}
          placeholder={placeholder}
          type={type}
          className={`form-control${validationClass}`}
          autoComplete="off"
        />
        {showError && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default FieldInput;
