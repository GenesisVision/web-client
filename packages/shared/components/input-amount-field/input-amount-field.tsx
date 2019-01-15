import { GVButton, GVFormikField } from "gv-react-components";
import React, { Component } from "react";
import { TranslationFunction, translate } from "react-i18next";

import GVNumberFiled from "../gv-number-field/gv-number-field";

export interface IInputAmountFieldProps {
  t: TranslationFunction;
  name: string;
  label: string;
  currency: string;
  isAllow: boolean;
}

class InputAmountField extends Component<IInputAmountFieldProps> {
  setMaxValue = () => {};
  render() {
    const { t, name, label, currency, isAllow } = this.props;
    return (
      <GVFormikField
        name={name}
        label={label}
        component={GVNumberFiled}
        adornment={
          <GVButton
            onClick={this.setMaxValue}
            variant="text"
            color="secondary"
            className="gv-btn--no-padding"
          >
            {t("Max")}
          </GVButton>
        }
        autoComplete="off"
        autoFocus
        suffix={` ${currency}`}
        allowNegative={false}
        isAllowed={isAllow}
      />
    );
  }
}

export default translate()(InputAmountField);
