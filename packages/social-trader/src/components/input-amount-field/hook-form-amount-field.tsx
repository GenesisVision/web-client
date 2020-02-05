import { GVHookFormField } from "components/gv-hook-form-field";
import SimpleInputAmountField, {
  ISimpleInputAmountFieldProps
} from "components/input-amount-field/simple-input-amount-field";
import * as React from "react";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

const _HookFormAmountField: React.FC<Props> = props => {
  return <GVHookFormField {...props} component={SimpleInputAmountField} />;
};

interface Props extends ISimpleInputAmountFieldProps {
  form: FormContextValues<any>;
}

const HookFormAmountField = React.memo(_HookFormAmountField);
export default HookFormAmountField;
