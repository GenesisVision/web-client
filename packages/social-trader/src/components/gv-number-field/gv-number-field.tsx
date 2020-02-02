import GVTextField, { GVTextFieldProps } from "components/gv-text-field";
import { FormikActions } from "formik";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";

const _GVNumberField: React.FC<Props> = props => {
  const { value, emptyInit, autoFocus, form, name } = props;
  const [init, setInit] = useState(true);

  const handleOnChange = useCallback(
    ({ value }: NumberFormatValues) => {
      setInit(false);
      form.setFieldValue(name, value);
    },
    [name]
  );

  const [input, setInput] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (input !== null && autoFocus) {
      setImmediate(() => {
        input.focus && input.focus();
      });
    }
  }, [input, autoFocus]);

  const setEmpty = emptyInit && init;
  return (
    <GVTextField
      {...props}
      value={setEmpty ? "" : value}
      name={name}
      //@ts-ignore
      onValueChange={handleOnChange}
      InputComponent={NumberFormat}
      getInputRef={(ref: HTMLDivElement) => setInput(ref)}
    />
  );
};

interface Props extends GVTextFieldProps {
  form: FormikActions<void>;
  emptyInit: boolean;
}

const GVNumberField = React.memo(_GVNumberField);
export default GVNumberField;
