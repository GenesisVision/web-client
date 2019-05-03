import { GVButton, GVFormikField } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { NumberFormatValues } from "react-number-format";
import GVNumberFiled from "shared/components/gv-number-field/gv-number-field";

const _InputAmountField: React.FC<Props> = ({
  emptyInit,
  onChange,
  t,
  name,
  label,
  currency,
  isAllow,
  setMax,
  placeholder,
  autoFocus = true
}) => (
  <GVFormikField
    emptyInit={emptyInit}
    onChange={onChange}
    name={name}
    label={label}
    placeholder={placeholder}
    component={GVNumberFiled}
    adornment={
      <GVButton
        onClick={setMax}
        variant="text"
        color="secondary"
        className="gv-btn--no-padding"
      >
        {t("Max")}
      </GVButton>
    }
    autoComplete="off"
    autoFocus={autoFocus}
    suffix={` ${currency}`}
    allowNegative={false}
    isAllowed={isAllow}
  />
);

interface Props extends InjectedTranslateProps {
  name: string;
  label: string;
  currency: string;
  placeholder?: string;
  isAllow?: (values?: NumberFormatValues) => boolean;
  setMax(): void;
  autoFocus?: boolean;
  onChange?(event: string | number): void;
  emptyInit?: boolean;
}

const InputAmountField = React.memo(translate()(_InputAmountField));
export default InputAmountField;
