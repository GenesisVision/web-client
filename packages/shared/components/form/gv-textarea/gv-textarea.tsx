import "./gv-textarea.css";

import classNames from "classnames";
import * as React from "react";
import { FieldProps, FormikActions, FormikState } from "formik";

interface IGVTextareaProps {
  // field: { name: string; value: any }; // { name, value, onChange, onBlur }
  label: any;
  // form: FormikState<any> & FormikActions<any>;
}

const GVTextarea: React.FC<IGVTextareaProps & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  label,
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];

  return (
    <div className="gv-textarea">
      <textarea
        rows={4}
        className={classNames(
          "gv-textarea__textarea",
          { "gv-textarea__textarea--filled": field.value.length > 0 },
          { "gv-textarea__textarea--error": hasError }
        )}
        autoComplete="off"
        {...field}
        {...props}
      />
      <label
        className={classNames(
          "gv-textarea__label",
          {
            "gv-textarea__label--regular":
              touched[field.name] && !hasError && field.value.length > 0
          },
          { "gv-textarea__label--error": hasError }
        )}
      >
        {label}
      </label>
      <hr className="gv-textarea__hr-placeholder" />
      <hr
        className={classNames(
          "gv-textarea__hr",
          hasError ? "gv-textarea__hr--error" : "gv-textarea__hr--regular"
        )}
      />
      {hasError && (
        <div className="gv-textarea__error-message">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default GVTextarea;
