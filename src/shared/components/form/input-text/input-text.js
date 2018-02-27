import React from "react";

const InputText = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const showError = () =>
    touched[field.name] &&
    errors[field.name] && (
      <div className="invalid-feedback">{errors[field.name]}</div>
    );
  const validationClass = touched[field.name]
    ? errors[field.name] ? " is-invalid" : " is-valid"
    : "";
  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <span className={`${props.addon} field-input__addon`} />
          </span>
        </div>
        <input
          type="text"
          className={`form-control${validationClass}`}
          autoComplete="off"
          {...field}
          {...props}
        />
        {showError()}
      </div>
    </div>
  );
};

export default InputText;
