import { UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";
import React, { PureComponent } from "react";
import Select from "react-select";

import "./gv-select.css";

class GVSelect extends PureComponent {
  state = { isOpen: false };
  render() {
    const {
      field,
      label,
      helpMessage,
      onChange = val => {},
      onBlur,
      material,
      form: { touched, errors, setFieldValue },
      ...other
    } = this.props;

    const { isOpen } = this.state;

    const handleChange = value => {
      const newValue = value ? value.value : "";
      setFieldValue(field.name, newValue);
      onChange(newValue);
      this.setState({
        isOpen: false
      });
    };

    const handleBlur = () => {
      onBlur(field.name, true);
      this.setState({
        isOpen: false
      });
    };

    const handleOpen = () => {
      this.setState({
        isOpen: true
      });
    };

    const hasError = touched[field.name] && errors[field.name];

    const showError = () =>
      touched[field.name] &&
      errors[field.name] && (
        <div className="gv-select__invalid">{errors[field.name]}</div>
      );

    const renderHelpIcon = () => {
      if (!helpMessage) return null;
      return (
        <span className="gv-select__help">
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
          "gv-select",
          { "gv-select--material": material },
          { "gv-select--is-open": isOpen },
          { "gv-select--is-filled": !!field.value },
          { "gv-select--has-error": hasError }
        )}
      >
        {renderHelpIcon()}
        <label
          className={classnames(
            "gv-select__label",
            { "gv-select__label--material": material },
            {
              "gv-select__label--regular":
                touched[field.name] && !hasError && !!field.value
            },
            { "gv-select__label--error": hasError }
          )}
        >
          {label}
        </label>
        <Select
          id={field.name}
          name={field.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onOpen={handleOpen}
          {...other}
        />
        {material && <hr className="gv-select__hr-placeholder" />}
        {material && (
          <hr
            className={classnames(
              "gv-select__hr",
              hasError ? "gv-select__hr--error" : "gv-select__hr--regular"
            )}
          />
        )}
        {showError()}
      </div>
    );
  }
}

export default GVSelect;
