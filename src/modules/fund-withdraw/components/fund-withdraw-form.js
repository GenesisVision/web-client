import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { compose } from "redux";
import { number, object } from "yup";
import { translate } from "react-i18next";

import WithdrawConfirmStep from "./fund-withdraw-confirm-step";
import FundWithdrawEnterPercentStep from "./fund-withdraw-enter-percent-step";

const CONFIRM_STEP = "CONFIRM_STEP";
const ENTER_AMOUNT_STEP = "ENTER_AMOUNT_STEP";

class FundWithdrawForm extends Component {
  state = {
    step: ENTER_AMOUNT_STEP
  };
  goToConfirmStep = () => {
    this.setState({ step: CONFIRM_STEP });
  };
  goToEnterAmountStep = () => {
    this.setState({ step: ENTER_AMOUNT_STEP });
  };
  render() {
    const {
      values,
      disabled,
      handleSubmit,
      errorMessage,
      rate,
      availableToWithdraw,
      periodEnds,
      fundCurrency,
      accountCurrency,
      errors
    } = this.props;
    return (
      <form
        className="dialog__bottom"
        id="withdraw-form"
        onSubmit={handleSubmit}
      >
        {this.state.step === ENTER_AMOUNT_STEP && (
          <FundWithdrawEnterPercentStep
            percent={values.percent}
            rate={rate}
            fundCurrency={fundCurrency}
            accountCurrency={accountCurrency}
            availableToWithdraw={availableToWithdraw}
            onClick={this.goToConfirmStep}
            disabled={errors.percent !== undefined}
          />
        )}
        {this.state.step === CONFIRM_STEP && (
          <WithdrawConfirmStep
            periodEnds={periodEnds}
            percent={values.percent}
            onPrevClick={this.goToEnterAmountStep}
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
  currency: PropTypes.string.isRequired,
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
          .min(0)
          .max(100, t("withdraw-fund.validation.amount-more-than-available"))
          .required(t("withdraw-fund.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.percent);
    }
  })
)(FundWithdrawForm);
