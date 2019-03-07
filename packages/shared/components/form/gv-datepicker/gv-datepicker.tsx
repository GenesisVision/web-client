import classNames from "classnames";
import * as React from "react";
import * as DatePicker from "react-datepicker";
import { UncontrolledTooltip } from "reactstrap";
import { Nullable } from "shared/utils/types";
import { FieldProps, FormikActions, FormikState } from "formik";

interface IGVDatePickerProps {
  material: boolean;
  // field: { name: string; value: string | number };
  label: any;
  helpMessage: string;
  onChange(): void;
  // form: FormikState<any> & FormikActions<any>;
}

interface IGVDatePickerState {
  isOpen: boolean;
}

class GVDatePicker extends React.Component<
  IGVDatePickerProps & FieldProps,
  IGVDatePickerState
> {
  state = { isOpen: false };
  render() {
    const {
      material,
      field,
      label,
      helpMessage,
      form: { touched, errors, setFieldValue },
      ...other
    } = this.props;

    const { isOpen } = this.state;

    const handleChange = (value: string | number) => {
      setFieldValue(field.name, value);
      this.setState({
        isOpen: false
      });
    };

    const handleBlur = () => {
      this.setState({
        isOpen: false
      });
    };

    const handleFocus = () => {
      this.setState({
        isOpen: true
      });
    };

    const hasError = touched[field.name] && errors[field.name];

    const showError = (): JSX.Element =>
      touched[field.name] &&
      errors[field.name] && (
        <div className="gv-datepicker__invalid">{errors[field.name]}</div>
      );

    const renderHelpIcon = (): Nullable<JSX.Element> => {
      if (!helpMessage) return null;
      return (
        <span className="gv-datepicker__help">
          <i id={field.name} className="fas fa-question-circle" />
          <UncontrolledTooltip target={field.name}>
            {helpMessage}
          </UncontrolledTooltip>
        </span>
      );
    };

    return (
      <div
        className={classNames(
          "gv-datepicker",
          { "gv-datepicker--material": material },
          { "gv-datepicker--is-open": isOpen },
          { "gv-datepicker--is-filled": !!field.value },
          { "gv-datepicker--has-error": hasError }
        )}
      >
        {renderHelpIcon()}
        <label
          className={classNames(
            "gv-datepicker__label",
            { "gv-datepicker__label--material": material },
            {
              "gv-datepicker__label--regular":
                touched[field.name] && !hasError && !!field.value
            },
            { "gv-datepicker__label--error": hasError }
          )}
        >
          {label}
        </label>
        <DatePicker
          id={field.name}
          name={field.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          autoComplete="off"
          {...other}
        />
        {material && <hr className="gv-datepicker__hr-placeholder" />}
        {material && (
          <hr
            className={classNames(
              "gv-datepicker__hr",
              hasError
                ? "gv-datepicker__hr--error"
                : "gv-datepicker__hr--regular"
            )}
          />
        )}
        {showError()}
      </div>
    );
  }
}

export default GVDatePicker;
