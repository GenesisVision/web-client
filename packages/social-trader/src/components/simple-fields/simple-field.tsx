import GVTextField from "components/gv-text-field";
import { GVTextFieldProps } from "components/gv-text-field/gv-text-field.style";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useState } from "react";

const _SimpleField: React.FC<Props> = props => {
  const {
    externalDirty,
    number,
    error,
    showCorrect,
    triggerValidation,
    setFieldValue,
    name,
    emptyInit,
    value,
    InputComponent,
    valueCallback
  } = props;
  const [correct, setCorrect, setNotCorrect] = useIsOpen();
  const [dirty, setDirty] = useIsOpen();
  const [init, setInit] = useState(true);
  const handleOnChange = useCallback(
    (value: any) => {
      setInit(false);
      if (setFieldValue) setFieldValue(name, valueCallback(value), true);
    },
    [name, setFieldValue, valueCallback, dirty]
  );
  const handleOnBlur = useCallback(() => {
    if (!dirty) {
      setDirty();
      triggerValidation && triggerValidation(name);
    }
    if (value === undefined) {
      setFieldValue && setFieldValue(name, undefined, true);
      return;
    }
    if (showCorrect && !!value)
      if (error) setNotCorrect();
      else setCorrect();
  }, [
    name,
    triggerValidation,
    dirty,
    showCorrect,
    error,
    value,
    setFieldValue
  ]);
  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      error={dirty || externalDirty ? error : undefined}
      correct={correct}
      value={setEmpty || value === undefined ? "" : value}
      onBlur={handleOnBlur}
      onChange={number ? undefined : handleOnChange}
      onValueChange={handleOnChange}
      InputComponent={InputComponent}
    />
  );
};

interface Props extends ISimpleFieldProps, ISimpleFieldOwnProps {}

export interface ISimpleFieldProps extends GVTextFieldProps {
  externalDirty?: boolean;
  showCorrect?: boolean;
  triggerValidation?: (name: string) => void;
  validateOnInput?: boolean;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

interface ISimpleFieldOwnProps {
  number?: boolean;
  valueCallback: (value: any) => any;
}

export const SimpleField = React.memo(_SimpleField);
