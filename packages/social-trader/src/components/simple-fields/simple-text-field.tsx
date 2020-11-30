import { GVTextFieldProps } from "components/gv-text-field/gv-text-field.style";
import { SimpleField } from "components/simple-fields/simple-field";
import React from "react";

const _SimpleTextField: React.FC<ISimpleTextFieldProps> = props => {
  return (
    <SimpleField
      {...props}
      valueCallback={({ target: { value } }: React.ChangeEvent<any>) => value}
    />
  );
};

export interface ISimpleTextFieldProps extends GVTextFieldProps {
  triggerValidation: (name: string) => void;
  validateOnInput?: boolean;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleTextField = React.memo(_SimpleTextField);
