import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import React, { useCallback, useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _SimpleNumberField: React.FC<ISimpleNumberFieldProps> = props => {
  const { setFieldValue, name, emptyInit, value } = props;
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    ({ floatValue }: NumberFormatValues) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, floatValue, true);
    },
    [name, setFieldValue]
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

export interface ISimpleNumberFieldProps extends GVTextFieldProps {
  refProp?: any;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleNumberField = React.memo(_SimpleNumberField);
