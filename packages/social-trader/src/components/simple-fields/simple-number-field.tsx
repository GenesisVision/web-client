import {
  ISimpleFieldProps,
  SimpleField
} from "components/simple-fields/simple-field";
import React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _SimpleNumberField: React.FC<ISimpleNumberFieldProps> = props => {
  return (
    <SimpleField
      {...props}
      number
      valueCallback={({ value, floatValue }: NumberFormatValues) =>
        value ? value : floatValue
      }
      InputComponent={NumberFormat}
    />
  );
};

export interface ISimpleNumberFieldProps extends ISimpleFieldProps {
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleNumberField = React.memo(_SimpleNumberField);
