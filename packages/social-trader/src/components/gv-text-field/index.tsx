import "./style.scss";

import classNames from "classnames";
import { GvInput, IPropsGvInput } from "components/gv-input/gv-input";
import React from "react";

import GVTextArea from "./gv-text-area";

export interface GVTextFieldProps extends IPropsGvInput {
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  InputComponent: React.ComponentType<any> | string;
  inputClassName?: string;
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
      adornmentPosition,
      type,
      className,
      inputClassName,
      errorClassName,
      InputComponent,
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
    return <GvInput {...this.props} inputElement={this.renderInput()} />;
  }
}

export default GVTextField;
