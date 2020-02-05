import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import {
  ISimpleNumberFieldProps,
  SimpleNumberField
} from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";

const _SimpleInputAmountField: React.FC<ISimpleInputAmountFieldProps> = ({
  setMin,
  wide = true,
  autoFocus = true,
  label,
  currency,
  setMax,
  ...props
}) => {
  const [t] = useTranslation();
  return (
    <DialogField>
      <SimpleNumberField
        {...props}
        wide={wide}
        autoFocus={autoFocus}
        label={label || t("input-amount-field.label")}
        autoComplete="off"
        suffix={` ${currency}`}
        allowNegative={false}
        adornment={
          <>
            {setMin && (
              <GVButton
                noPadding
                onClick={setMin}
                variant="text"
                color="secondary"
              >
                {t("buttons.min")}
              </GVButton>
            )}
            {setMin && setMax && <>&nbsp;|&nbsp;</>}
            {setMax && (
              <GVButton
                noPadding
                onClick={setMax}
                variant="text"
                color="secondary"
              >
                {t("buttons.max")}
              </GVButton>
            )}
          </>
        }
      />
    </DialogField>
  );
};

export interface ISimpleInputAmountFieldProps extends ISimpleNumberFieldProps {
  wide?: boolean;
  name: string;
  label?: React.ReactNode;
  currency: string;
  placeholder?: string;
  isAllowed?: (values: NumberFormatValues) => boolean;
  setMax?(): void;
  setMin?(): void;
  autoFocus?: boolean;
  emptyInit?: boolean;
  disabled?: boolean;
}

const SimpleInputAmountField = React.memo(_SimpleInputAmountField);
export default SimpleInputAmountField;
