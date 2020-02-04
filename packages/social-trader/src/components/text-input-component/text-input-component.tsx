import React from "react";
import { NumberFormatValues } from "react-number-format";

const TextInputComponent: React.FC<Props> = props => {
  const { isAllowed } = props;
  const changeHandle = (e: any) => {
    const symbol = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    const {
      target: { value }
    } = e;
    if (
      isAllowed({
        floatValue: Number(value),
        value,
        formattedValue: value,
        symbol
      })
    )
      return;
    e.preventDefault();
  };
  return <input {...props} onKeyPress={changeHandle} />;
};

export interface TextInputValues extends NumberFormatValues {
  symbol: string;
}

interface Props {
  isAllowed: (values: TextInputValues) => boolean;
}

export default TextInputComponent;
