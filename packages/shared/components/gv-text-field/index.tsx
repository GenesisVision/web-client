import classnames from "classnames";
import React from "react";

import GVTextArea from "./gv-text-area";

export interface GVTextFieldProps {
  name: string;
  type?: string;
  label?: string;
  value?: string | number;
  touched?: boolean;
  error?: string;
  InputComponent: React.ComponentType<any> | string;
  adornment?: React.ReactNode;
  adornmentPosition?: "start" | "end";
  disabled?: boolean;
  className?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  adornmentClassName?: string;
  onBlur?: (e: any) => void;
  onChange?: (e: React.ChangeEvent<any>) => void;
  form?: any;
}

export interface GVTextFieldState {
  focused: boolean;
}

class GVTextField extends React.Component<GVTextFieldProps, GVTextFieldState> {
  static defaultProps: Partial<GVTextFieldProps> = {
    type: "text",
    adornmentPosition: "end",
    InputComponent: "input"
  };

  constructor(props: GVTextFieldProps) {
    super(props);

    this.state = {
      focused: false
    };
  }

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = (e: any) => {
    this.setState({
      focused: false
    });

    if (this.props.onBlur) this.props.onBlur(e);
  };

  renderError = () =>
    this.props.touched &&
    this.props.error && (
      <div
        className={classnames("gv-text-field-error", this.props.errorClassName)}
      >
        {this.props.error}
      </div>
    );

  renderLabel = () => {
    if (!this.props.label) return null;
    return (
      <label
        className={classnames(
          "gv-text-field-label",
          this.props.labelClassName,
          {
            "gv-text-field-label-shrink":
              this.state.focused ||
              this.props.adornment ||
              (this.props.value !== undefined && this.props.value !== "")
          }
        )}
      >
        {this.props.label}
      </label>
    );
  };

  renderAdornment = () => {
    const { adornment, adornmentPosition, adornmentClassName } = this.props;
    if (!adornment) return null;
    return (
      <div
        className={classnames("gv-text-field-adornment", adornmentClassName, {
          "gv-text-field-adornment-start": adornmentPosition === "start",
          "gv-text-field-adornment-end": adornmentPosition === "end"
        })}
      >
        {adornment}
      </div>
    );
  };

  renderInput = () => {
    const {
      type,
      onBlur,
      className,
      wrapperClassName,
      inputClassName,
      labelClassName,
      errorClassName,
      adornmentClassName,
      touched,
      error,
      InputComponent,
      adornment,
      adornmentPosition,
      form,
      ...otherProps
    } = this.props;
    let Input: React.ComponentType<any> | string;
    switch (type) {
      case "textarea":
        Input = GVTextArea;
        break;
      default:
        Input = InputComponent;
    }
    return (
      <Input
        type={type}
        className={classnames("gv-text-field-input", inputClassName)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...otherProps}
      />
    );
  };
  render() {
    const {
      className,
      wrapperClassName,
      disabled,
      touched,
      error
    } = this.props;
    return (
      <div className={classnames("gv-text-field-wrapper", wrapperClassName)}>
        {this.renderLabel()}
        <div
          className={classnames("gv-text-field", className, {
            "gv-text-field-disabled": disabled,
            "gv-text-field-invalid": touched && error,
            "gv-text-field-focused": this.state.focused
          })}
        >
          {this.renderInput()}
          {this.renderAdornment()}
        </div>
        {this.renderError()}
      </div>
    );
  }
}

export default GVTextField;
