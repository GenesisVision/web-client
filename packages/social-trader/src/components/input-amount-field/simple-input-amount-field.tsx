import GVButton from "components/gv-button";
import { Row } from "components/row/row";
import {
  ISimpleNumberFieldProps,
  SimpleNumberField
} from "components/simple-fields/simple-number-field";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
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
  const [externalDirty, setExternalDirty] = useIsOpen();
  const [t] = useTranslation();
  const handleSet = useCallback(
    (callback: VoidFunction) => () => {
      callback();
      setExternalDirty();
    },
    []
  );
  return (
    <Row large wide={wide}>
      <SimpleNumberField
        {...props}
        externalDirty={externalDirty}
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
                onClick={handleSet(setMin)}
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
                onClick={handleSet(setMax)}
                variant="text"
                color="secondary"
              >
                {t("buttons.max")}
              </GVButton>
            )}
          </>
        }
      />
    </Row>
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
