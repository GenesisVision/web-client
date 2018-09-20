import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { number, object } from "yup";

import FormStep0 from "./program-withdraw-form-0";
import FormStep1 from "./program-withdraw-form-1";

class ProgramWithdrawForm extends Component {
  state = {
    step: 0
  };
  nextStep = () => {
    this.setState(({ step }) => ({ step: step + 1 }));
  };
  prevStep = () => {
    this.setState(({ step }) => ({ step: step - 1 }));
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
      currency,
      errors
    } = this.props;
    return (
      <form
        className="dialog__bottom"
        id="withdraw-form"
        onSubmit={handleSubmit}
      >
        {this.state.step === 0 && (
          <FormStep0
            amount={values.amount}
            rate={rate}
            currency={currency}
            availableToWithdraw={availableToWithdraw}
            onClick={this.nextStep}
            disabled={errors.amount}
          />
        )}
        {this.state.step === 1 && (
          <FormStep1
            periodEnds={periodEnds}
            amount={values.amount}
            onPrevClick={this.prevStep}
            error={errorMessage}
            disabled={disabled}
          />
        )}
        <div className="dialog__info">{t("withdraw-program.info")}</div>
      </form>
    );
  }
}

ProgramWithdrawForm.propTypes = {
  availableToWithdraw: PropTypes.number.isRequired,
  periodEnds: PropTypes.string,
  rate: PropTypes.number.isRequired,
  currency: PropTypes.number.isRequired,
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
