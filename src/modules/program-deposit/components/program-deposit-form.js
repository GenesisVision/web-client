import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { number, object } from "yup";

const convertToCurrency = (value = 0, rate) => {
  return Math.round((value / rate) * 100000000) / 100000000;
};

const calculateValueOfEntryFee = (value = 0, percentage) => {
  return (value * percentage) / 100;
};

const ProgramDepositForm = ({
  t,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage
}) => (
  <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
    <GVFormikField
      className="invest-field"
      type="number"
      name="amount"
      label={t("deposit-program.amount")}
      component={GVTextField}
      adornment="GVT"
      autoComplete="off"
    />
    <div className="invest-popup__currency">{`= ${convertToCurrency(
      values.amount,
      info.rate
    )} ${currency}`}</div>
    <div className="invest-popup__entry">
      {t("deposit-program.entry-fee")}
      <span>
        {`${info.entryFee}% (${convertToCurrency(
          calculateValueOfEntryFee(values.amount, info.entryFee),
          info.rate
        )} ${currency})`}
      </span>
    </div>
    <div className="form-error">{errorMessage}</div>
    <GVButton
      type="submit"
      id="signUpFormSubmit"
      className="invest-form__submit-button"
      disabled={disabled}
    >
      {t("deposit-program.confirm")}
    </GVButton>
    <div className="invest-popup__period-ends">
      {`${t("deposit-program.period")} ${moment(info.periodEnds).format(
        "DD.MM.YYYY, HH:mm"
      )}`}
    </div>
  </form>
);

export default compose(
  translate(),
  withFormik({
    displayName: "invest-form",
    mapPropsToValues: () => ({
      amount: ""
    }),
    validationSchema: props =>
      object().shape({
        amount: number()
          .typeError(props.t("deposit-program.amount-type-error"))
          .moreThan(0, props.t("deposit-program.amount-not-zero-error"))
          .required(props.t("deposit-program.amount-is-required-error"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(ProgramDepositForm);
