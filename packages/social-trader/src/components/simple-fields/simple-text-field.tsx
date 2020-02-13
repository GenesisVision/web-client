import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import React, { useCallback, useState } from "react";

const _SimpleTextField: React.FC<ISimpleTextFieldProps> = props => {
  const { setFieldValue, name, emptyInit, value } = props;
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, event.target.value, true);
    },
    [name, setFieldValue]
  );
  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      value={setEmpty ? "" : value}
      onChange={handleOnChange}
    />
  );
};

export interface ISimpleTextFieldProps extends GVTextFieldProps {
  triggerValidation: (name: string) => void;
  validateOnInput?: boolean;
  refProp?: any;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleTextField = React.memo(_SimpleTextField);
