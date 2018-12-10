import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";

const WithdrawEnterAmountStep = props => {
  const isAllow = values => {
    const { formattedValue } = values;
    return (
      formattedValue === "" ||
      validateFraction(formattedValue, props.programCurrency)
    );
  };
  return (
    <Fragment>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={props.t("withdraw-program.amount-to-withdraw")}
        component={GVTextField}
        adornment={props.programCurrency}
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
        isAllowed={isAllow}
      />
      {props.programCurrency !== props.accountCurrency && (
        <div className="invest-popup__currency">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(props.amount, props.rate),
              props.accountCurrency
            )}
            prefix="= "
            suffix={` ${props.accountCurrency}`}
            displayType="text"
          />
        </div>
      )}
      <div className="dialog__buttons">
        <GVButton
          onClick={props.onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={props.disabled}
        >
          {props.t("withdraw-program.next")}
        </GVButton>
      </div>
    </Fragment>
  );
};

WithdrawEnterAmountStep.propTypes = {
  amount: PropTypes.string,
  rate: PropTypes.number,
  currency: PropTypes.string,
  availableToWithdraw: PropTypes.number,
  t: PropTypes.func,
  disabled: PropTypes.bool
};

export default translate()(WithdrawEnterAmountStep);
