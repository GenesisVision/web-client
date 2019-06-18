import { FormikActions } from "formik";
import * as React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import GVTextField, { GVTextFieldProps } from "shared/components/gv-text-field";

class GVNumberFiled extends React.PureComponent<Props, State> {
  state = {
    init: true
  };
  handleOnChange = (value: NumberFormatValues) => {
    const { form, name, onChange } = this.props;
    if (onChange) onChange(value.value);
    this.setState({ init: false });
    form.setFieldValue(name, value.value);
  };
  render() {
    const { emptyInit, name, value, ...props } = this.props;
    const setEmpty = emptyInit && this.state.init;
    return (
      //@ts-ignore
      <GVTextField
        {...props}
        value={setEmpty ? "" : value}
        name={name}
        onValueChange={this.handleOnChange}
        InputComponent={NumberFormat}
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

export default GVNumberFiled;
