import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import React, { useCallback, useState } from "react";

const _SimpleField: React.FC<ISimpleFieldProps> = props => {
  const {
    setFieldValue,
    name,
    emptyInit,
    value,
    InputComponent,
    valueCallback
  } = props;
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    (value: any) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, valueCallback(value), true);
    },
    [name, setFieldValue, valueCallback]
  );
  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      value={setEmpty ? "" : value}
      onChange={!InputComponent ? handleOnChange : undefined}
      onValueChange={handleOnChange}
      InputComponent={InputComponent}
    />
  );
};

export interface ISimpleFieldProps extends GVTextFieldProps {
  valueCallback: (value: any) => any;
  validateOnInput?: boolean;
  refProp?: any;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleField = React.memo(_SimpleField);
