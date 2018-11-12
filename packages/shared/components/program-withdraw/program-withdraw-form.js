import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { number, object } from "yup";

import WithdrawConfirmStep from "./program-withdraw-confirm-step";
import WithdrawEnterAmountStep from "./program-withdraw-enter-amount-step";

const CONFIRM_STEP = "CONFIRM_STEP";
const ENTER_AMOUNT_STEP = "ENTER_AMOUNT_STEP";

class ProgramWithdrawForm extends Component {
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
      t,
      values,
      disabled,
      handleSubmit,
      errorMessage,
      rate,
      availableToWithdraw,
      periodEnds,
      programCurrency,
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
          <WithdrawEnterAmountStep
            amount={values.amount}
            rate={rate}
            programCurrency={programCurrency}
            accountCurrency={accountCurrency}
            availableToWithdraw={availableToWithdraw}
            onClick={this.goToConfirmStep}
            disabled={errors.amount !== undefined}
          />
        )}
        {this.state.step === CONFIRM_STEP && (
          <WithdrawConfirmStep
            periodEnds={periodEnds}
            amount={values.amount}
            onPrevClick={this.goToEnterAmountStep}
            error={errorMessage}
            disabled={disabled}
            programCurrency={programCurrency}
            accountCurrency={accountCurrency}
          />
        )}
        <div className="dialog__info">{t("withdraw-program.info")}</div>
      </form>
    );
  }
}

ProgramWithdrawForm.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  periodEnds: PropTypes.instanceOf(Date),
  rate: PropTypes.number.isRequired,
  currency: PropTypes.string,
  errorMessage: PropTypes.string
};

export default compose(
  translate(),
  withFormik({
    displayName: "withdraw-form",
    mapPropsToValues: () => ({
      amount: ""
    }),
    validationSchema: ({ t, availableToWithdraw }) =>
      object().shape({
        amount: number()
          .lessThan(
            availableToWithdraw,
            t("withdraw-program.validation.amount-more-than-available")
          )
          .required(t("withdraw-program.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(ProgramWithdrawForm);
