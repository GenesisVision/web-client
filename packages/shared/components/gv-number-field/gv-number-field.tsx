import { FormikActions } from "formik";
import { GVTextField } from "gv-react-components";
import { GVTextFieldProps } from "gv-react-components/dist/gv-text-field";
import * as React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

class GVNumberFiled extends React.Component<
  GVTextFieldProps & { form: FormikActions<void> }
> {
  handleOnChange = (value: NumberFormatValues) => {
    const { form, name, onChange } = this.props;
    if (onChange) onChange(value.value);
    form.setFieldValue(name, value.value);
  };
  render() {
    const { name, ...props } = this.props;
    return (
      <GVTextField
        {...props}
        name={name}
        onValueChange={this.handleOnChange}
        InputComponent={NumberFormat}
      />
    );
  }
}

export default GVNumberFiled;
