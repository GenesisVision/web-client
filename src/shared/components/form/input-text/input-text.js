import React from "react";

const InputText = ({
  field, // { name, value, onChange, onBlur }
  addon,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const showError = () =>
    touched[field.name] &&
    errors[field.name] && (
      <div className="invalid-feedback">{errors[field.name]}</div>
    );

  const renderAddon = () => {
    if (addon) {
      return (
        <div className="input-group-prepend">
          <span className="input-group-text">
            <span className={`${addon} field-input__addon`} />
          </span>
        </div>
      );
    }
    return null;
  };
  const validationClass = touched[field.name]
    ? errors[field.name] ? " is-invalid" : " is-valid"
    : "";
  return (
    <div className="form-group">
      <div className="input-group">
        {renderAddon()}
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
