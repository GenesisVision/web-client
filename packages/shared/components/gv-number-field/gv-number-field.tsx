import { FormikActions } from "formik";
import { GVTextField } from "gv-react-components";
import { GVTextFieldProps } from "gv-react-components/dist/gv-text-field";
import React, { Component } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

export interface IGVNumberProps {
  [key: string]: any;
}

class GVNumberFiled extends Component<
  GVTextFieldProps & { form: FormikActions<void> }
> {
  handleOnChange = (value: NumberFormatValues) => {
    const { form, name } = this.props;
    form.setFieldValue(name, value.value);
  };
  render() {
    const { onChange, form, ...props } = this.props;
    return (
      <GVTextField
        {...props}
        name={props.name}
        onValueChange={this.handleOnChange}
        InputComponent={NumberFormat}
      />
    );
  }
}

export default GVNumberFiled;
