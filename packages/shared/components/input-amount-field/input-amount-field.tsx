import { GVButton, GVFormikField } from "gv-react-components";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";

import GVNumberFiled from "../gv-number-field/gv-number-field";

export interface IInputAmountFieldProps {
  name: string;
  label: string;
  currency: string;
  placeholder?: string;
  isAllow?: (values?: any) => boolean;
  setMax(): void;
  autoFocus?: boolean;
  onChange?(event: string | number): void;
}

class InputAmountField extends React.Component<
  IInputAmountFieldProps & WithTranslation
> {
  render() {
    const {
      onChange,
      t,
      name,
      label,
      currency,
      isAllow,
      setMax,
      placeholder,
      autoFocus = true
    } = this.props;
    return (
      <GVFormikField
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
  }
}

export default withTranslation()(InputAmountField);
