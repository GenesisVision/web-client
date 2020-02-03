import "./simple-text-field.scss";

import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import React, { useCallback } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _SimpleNumberField: React.FC<ISimpleNumberFieldProps> = props => {
  const {
    setFieldValue,
    name,
    triggerValidation,
    emptyInit,
    init,
    value
  } = props;
  const handleOnChange = useCallback(
    ({ value }: NumberFormatValues) => {
      setFieldValue(name, value);
      if (triggerValidation) triggerValidation(value);
    },
    [name]
  );

  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      value={setEmpty ? "" : value}
      //@ts-ignore
      onValueChange={handleOnChange}
      InputComponent={NumberFormat}
    />
  );
};

interface ISimpleNumberFieldProps extends GVTextFieldProps {
  refProp?: any;
  triggerValidation: (name: string) => any;
  setFieldValue: (name: string, value?: any) => void;
  [key: string]: any;
}

export const SimpleNumberField = React.memo(_SimpleNumberField);
