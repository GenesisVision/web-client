import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import { FormikActions } from "formik";
import * as React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

class GVNumberField extends React.PureComponent<Props, State> {
  state = {
    init: true
  };
  handleOnChange = (value: NumberFormatValues) => {
    const { form, name, onChange } = this.props;
    if (onChange) onChange(value.value);
    this.setState({ init: false });
    form.setFieldValue(name, value.value);
  };

  input?: HTMLDivElement;

  componentDidMount() {
    if (this.input && this.props.autoFocus) {
      const input = this.input;
      setImmediate(() => {
        input.focus && input.focus();
      });
    }
  }

  render() {
    const { emptyInit, name, value, autoFocus, ...props } = this.props;
    const setEmpty = emptyInit && this.state.init;
    return (
      //@ts-ignore
      <GVTextField
        {...props}
        value={setEmpty ? "" : value}
        name={name}
        //@ts-ignore
        onValueChange={this.handleOnChange}
        InputComponent={NumberFormat}
        getInputRef={(ref: HTMLDivElement) => (this.input = ref)}
      />
    );
  }
}
type Props = GVTextFieldProps & {
  form: FormikActions<void>;
  onChange(value: string): void;
  emptyInit: boolean;
};
interface State {
  init: boolean;
}

export default GVNumberField;
