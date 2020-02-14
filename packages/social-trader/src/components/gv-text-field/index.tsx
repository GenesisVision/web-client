import "./style.scss";

import classNames from "classnames";
import React from "react";

import GVTextArea from "./gv-text-area";

export interface GVTextFieldProps {
  noMargin?: boolean;
  wide?: boolean;
  name: string;
  type?: string;
  label?: string;
  value?: string | number;
  placeholder?: string;
  autoComplete?: string;
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
  autoFocus?: boolean;
}

export interface GVTextFieldState {
  focused: boolean;
}

class GVTextField extends React.PureComponent<
  GVTextFieldProps,
  GVTextFieldState
> {
  input = React.createRef<HTMLInputElement | HTMLTextAreaElement>();

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
        className={classNames(
          "gv-text-field__error",
          this.props.errorClassName
        )}
      >
        {this.props.error}
      </div>
    );

  renderLabel = () => {
    if (!this.props.label) return null;
    return (
      <label
        className={classNames(
          "gv-text-field__label",
          this.props.labelClassName,
          {
            "gv-text-field__label--shrink":
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
        className={classNames("gv-text-field__adornment", adornmentClassName, {
          "gv-text-field__adornment--start": adornmentPosition === "start",
          "gv-text-field__adornment--end": adornmentPosition === "end"
        })}
      >
        {adornment}
      </div>
    );
  };

  componentDidMount() {
    if (this.props.autoFocus && this.input.current) {
      const input = this.input.current;
      setImmediate(() => {
        input.focus && input.focus();
      });
    }
  }

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
      autoFocus,
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
        ref={this.input}
        type={type}
        className={classNames("gv-text-field__input", inputClassName)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...otherProps}
      />
    );
  };
  render() {
    const {
      noMargin,
      wide,
      className,
      wrapperClassName,
      disabled,
      touched,
      error
    } = this.props;
    return (
      <div
        className={classNames("gv-text-field__wrapper", wrapperClassName, {
          "gv-text-field__wrapper--no-margin": noMargin,
          "gv-text-field__wrapper--wide": wide
        })}
      >
        {this.renderLabel()}
        <div
          className={classNames("gv-text-field", className, {
            "gv-text-field--disabled": disabled,
            "gv-text-field--invalid": touched && error,
            "gv-text-field--focused": this.state.focused
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
