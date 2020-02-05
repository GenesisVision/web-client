import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { NumberFormatValues } from "react-number-format";

const _SimpleInputAmountField: React.FC<Props> = ({
  setMin,
  setFieldValue,
  wide,
  emptyInit,
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
      <SimpleNumberField
        setFieldValue={setFieldValue}
        wide={wide}
        emptyInit={emptyInit}
        name={name}
        label={label}
        placeholder={placeholder}
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

interface Props {
  setFieldValue: (name: string, value?: any) => void;
  wide?: boolean;
  name: string;
  label: React.ReactNode;
  currency: string;
  placeholder?: string;
  isAllow?: (values: NumberFormatValues) => boolean;
  setMax?(): void;
  setMin?(): void;
  autoFocus?: boolean;
  emptyInit?: boolean;
  disabled?: boolean;
}

const SimpleInputAmountField = React.memo(_SimpleInputAmountField);
export default SimpleInputAmountField;
