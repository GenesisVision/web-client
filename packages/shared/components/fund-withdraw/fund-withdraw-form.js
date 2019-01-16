import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { number, object } from "yup";

import { calculateValueOfEntryFee } from "../../utils/currency-converter";
import WithdrawConfirmStep from "./fund-withdraw-confirm-step";
import FundWithdrawEnterPercentStep from "./fund-withdraw-enter-percent-step";

export const CONFIRM_STEP = "CONFIRM_STEP";
export const ENTER_AMOUNT_STEP = "ENTER_AMOUNT_STEP";

class FundWithdrawForm extends Component {
  render() {
    const {
      exitFee,
      values,
      disabled,
      handleSubmit,
      errorMessage,
      rate,
      availableToWithdraw,
      periodEnds,
      fundCurrency,
      accountCurrency,
      errors,
      step,
      goToConfirmStep,
      goToEnterAmountStep,
      isValid,
      dirty,
      setFieldValue
    } = this.props;
    const valueInCurrency = calculateValueOfEntryFee(
      availableToWithdraw,
      values.percent
    );
    const feeInCurrency = calculateValueOfEntryFee(valueInCurrency, exitFee);
    const withdrawAmount =
      parseFloat(valueInCurrency || 0) - parseFloat(feeInCurrency);
    return (
      <form
        className="dialog__bottom"
        id="withdraw-form"
        onSubmit={handleSubmit}
      >
        {step === ENTER_AMOUNT_STEP && (
          <FundWithdrawEnterPercentStep
            valueInCurrency={valueInCurrency}
            feeInCurrency={feeInCurrency}
            exitFee={exitFee}
            withdrawAmount={withdrawAmount}
            percent={values.percent}
            rate={rate}
            fundCurrency={fundCurrency}
            accountCurrency={accountCurrency}
            availableToWithdraw={availableToWithdraw}
            onClick={goToConfirmStep}
            disabled={errors.percent !== undefined || !isValid || !dirty}
            setFieldValue={setFieldValue}
          />
        )}
        {step === CONFIRM_STEP && (
          <WithdrawConfirmStep
            valueInCurrency={valueInCurrency}
            feeInCurrency={feeInCurrency}
            exitFee={exitFee}
            withdrawAmount={withdrawAmount}
            periodEnds={periodEnds}
            percent={values.percent}
            onPrevClick={goToEnterAmountStep}
            error={errorMessage}
            disabled={disabled}
          />
        )}
      </form>
    );
  }
}

FundWithdrawForm.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  periodEnds: PropTypes.instanceOf(Date),
  rate: PropTypes.number.isRequired,
  fundCurrency: PropTypes.string.isRequired,
  accountCurrency: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
};

export default compose(
  translate(),
  withFormik({
    displayName: "withdraw-form",
    mapPropsToValues: () => ({
      percent: ""
    }),
    validationSchema: ({ t, availableToWithdraw }) =>
      object().shape({
        percent: number()
          .min(0.01)
          .max(100, t("withdraw-fund.validation.amount-more-than-available"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.percent);
    }
  })
)(FundWithdrawForm);
