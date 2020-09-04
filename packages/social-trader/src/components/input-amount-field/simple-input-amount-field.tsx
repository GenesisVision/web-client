import { Button } from "components/button/button";
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
  disabled,
  hide,
  externalDirty: externalDirtyProp,
  setMin,
  wide = true,
  autoFocus = true,
  label,
  currency,
  setMax,
  ...props
}) => {
  const [externalDirty, setExternalDirty] = useIsOpen(externalDirtyProp);
  const [t] = useTranslation();
  const handleSet = useCallback(
    (callback: VoidFunction) => () => {
      callback();
      setExternalDirty();
    },
    []
  );
  return (
    <Row size={"large"} hide={hide} wide={wide}>
      <SimpleNumberField
        {...props}
        disabled={disabled}
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
              <Button
                disabled={disabled}
                noPadding
                onClick={handleSet(setMin)}
                variant="text"
                color="secondary"
              >
                {t("buttons.min")}
              </Button>
            )}
            {setMin && setMax && <>&nbsp;|&nbsp;</>}
            {setMax && (
              <Button
                disabled={disabled}
                noPadding
                onClick={handleSet(setMax)}
                variant="text"
                color="secondary"
              >
                {t("buttons.max")}
              </Button>
            )}
          </>
        }
      />
    </Row>
  );
};

export interface ISimpleInputAmountFieldProps extends ISimpleNumberFieldProps {
  hide?: boolean;
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
