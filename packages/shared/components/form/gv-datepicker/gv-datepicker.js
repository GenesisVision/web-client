import classnames from "classnames";
import React, { PureComponent } from "react";
import DatePicker from "react-datepicker";
import { UncontrolledTooltip } from "reactstrap";

class GVDatePicker extends PureComponent {
  state = { isOpen: false };
  render() {
    const {
      material,
      field,
      label,
      helpMessage,
      onChange,
      form: { touched, errors, setFieldValue },
      ...other
    } = this.props;

    const { isOpen } = this.state;

    const handleChange = value => {
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

    const showError = () =>
      touched[field.name] &&
      errors[field.name] && (
        <div className="gv-datepicker__invalid">{errors[field.name]}</div>
      );

    const renderHelpIcon = () => {
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
        className={classnames(
          "gv-datepicker",
          { "gv-datepicker--material": material },
          { "gv-datepicker--is-open": isOpen },
          { "gv-datepicker--is-filled": !!field.value },
          { "gv-datepicker--has-error": hasError }
        )}
      >
        {renderHelpIcon()}
        <label
          className={classnames(
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
            className={classnames(
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
