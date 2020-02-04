import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVNumberField from "components/gv-number-field/gv-number-field";
import * as React from "react";
import { useTranslation, WithTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";

const _InputAmountField: React.FC<Props> = ({
  wide,
  emptyInit,
  onChange,
  name,
  label,
  currency,
  isAllow,
  setMax,
  placeholder,
  autoFocus = true,
  disabled
}) => {
  const [t] = useTranslation();
  return (
    <DialogField>
      <GVFormikField
        wide={wide}
        emptyInit={emptyInit}
        onChange={onChange}
        name={name}
        label={label}
        placeholder={placeholder}
        component={GVNumberField}
        adornment={
          setMax && (
            <GVButton
              onClick={setMax}
              variant="text"
              color="secondary"
              className="gv-btn--no-padding"
            >
              {t("Max")}
            </GVButton>
          )
        }
        autoComplete="off"
        autoFocus={autoFocus}
        suffix={` ${currency}`}
        allowNegative={false}
        isAllowed={isAllow}
        disabled={disabled}
      />
    </DialogField>
  );
};

interface Props extends WithTranslation {
  wide?: boolean;
  name: string;
  label: React.ReactNode;
  currency: string;
  placeholder?: string;
  isAllow?: (values: NumberFormatValues) => boolean;
  setMax?(): void;
  autoFocus?: boolean;
  onChange?(event: string | number): void;
  emptyInit?: boolean;
  disabled?: boolean;
}

const InputAmountField = React.memo(_InputAmountField);
export default InputAmountField;
