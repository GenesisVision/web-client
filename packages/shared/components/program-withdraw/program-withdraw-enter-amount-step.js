import { GVButton } from "gv-react-components";
import PropTypes from "prop-types";
import { Fragment } from "react";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue, validateFraction } from "shared/utils/formatter";

import InputAmountField from "../input-amount-field/input-amount-field";

const WithdrawEnterAmountStep = ({
  t,
  programCurrency,
  accountCurrency,
  amount,
  rate,
  onClick,
  disabled,
  availableToWithdraw,
  setFieldValue
}) => {
  const isAllow = values => {
    const { formattedValue } = values;
    return (
      formattedValue === "" || validateFraction(formattedValue, programCurrency)
    );
  };

  const setMaxAmount = () => {
    setFieldValue("amount", availableToWithdraw);
  };

  return (
    <Fragment>
      <InputAmountField
        name="amount"
        label={t("withdraw-program.amount-to-withdraw")}
        currency={programCurrency}
        isAllow={isAllow}
        setMax={setMaxAmount}
      />

      {programCurrency !== accountCurrency && (
        <div className="">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(amount, rate),
              accountCurrency
            )}
            prefix="= "
            suffix={` ${accountCurrency}`}
            displayType="text"
          />
        </div>
      )}
      <div className="dialog__buttons">
        <GVButton
          onClick={onClick}
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {t("withdraw-program.next")}
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
