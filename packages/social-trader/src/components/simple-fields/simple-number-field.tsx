import "./simple-text-field.scss";

import {
  ISimpleTextFieldProps,
  SimpleTextField
} from "components/simple-fields/simple-text-field";
import React, { useCallback } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _SimpleNumberField: React.FC<ISimpleNumberFieldProps> = props => {
  const { setFieldValue, onChange, name } = props;
  const handleOnChange = useCallback((value: NumberFormatValues) => {
    if (onChange) onChange(value.value);
    setFieldValue(name, value.value);
  }, []);

  return (
    <SimpleTextField
      {...props}
      onChange={handleOnChange}
      InputComponent={NumberFormat}
    />
  );
};

interface ISimpleNumberFieldProps extends ISimpleTextFieldProps {
  setFieldValue: (name: string, value?: any) => void;
}

export const SimpleNumberField = React.memo(_SimpleNumberField);
