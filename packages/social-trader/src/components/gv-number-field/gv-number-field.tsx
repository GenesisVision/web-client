import { GVTextFieldProps } from "components/gv-text-field";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import { FormikActions } from "formik";
import * as React from "react";

const _GVNumberField: React.FC<Props> = props => {
  return (
    <SimpleNumberField {...props} setFieldValue={props.form.setFieldValue} />
  );
};

interface Props extends GVTextFieldProps {
  form: FormikActions<void>;
  emptyInit: boolean;
}

const GVNumberField = React.memo(_GVNumberField);
export default GVNumberField;
