import "./input-text.css";

import * as React from "react";
import NumberFormat from "react-number-format";
import { FormikActions, FormikState } from "formik";

interface IInputTextProps {
  field: { name: string; value: any }; // { name, value, onChange, onBlur }
  addon: string;
  number: boolean;
  controllClass: string;
  form: FormikState<any> & FormikActions<any>;
}

const InputText: React.FC<IInputTextProps> = ({
  field, // { name, value, onChange, onBlur }
  addon,
  number,
  controllClass,
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const showError = (): JSX.Element =>
    touched[field.name] &&
    errors[field.name] && (
      <div className="field-input__invalid">{errors[field.name]}</div>
    );

  const renderAddon = (): JSX.Element => {
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
    ? errors[field.name]
      ? "is-invalid"
      : "is-valid"
    : "";

  const renderInput = (): JSX.Element => {
    if (number) {
      return (
        <NumberFormat
          className={`${controllClass || "form-control"} ${validationClass}`}
          value={field.value}
          onValueChange={(values, e) => {
            setFieldValue(field.name, values.value);
          }}
          {...props}
        />
      );
    }
    return (
      <input
        type="text"
        className={`${controllClass || "form-control"} ${validationClass}`}
        autoComplete="off"
        {...field}
        {...props}
      />
    );
  };

  return (
    <div className="form-group">
      <div className="input-group">
        {renderAddon()}
        {renderInput()}
        {showError()}
      </div>
    </div>
  );
};

export default InputText;
