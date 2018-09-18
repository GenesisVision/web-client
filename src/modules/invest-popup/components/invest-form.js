import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { number, object } from "yup";

import i18n from "../../../i18n";

const convertToCurrency = (value = 0, rate) => {
  return value / rate;
};

const convertEntryFeeToCurrency = (value = 0, percentage) => {
  return (value * percentage) / 100;
};

const InvestForm = ({
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
      type="text"
      name="amount"
      label={t("invest-popup.amount")}
      component={GVTextField}
      adornment="GVT"
      autoComplete="off"
    />
    <div className="invest-popup__currency">{`= ${convertToCurrency(
      values.amount,
      info.rate
    )} ${currency}`}</div>
    <div className="invest-popup__entry">
      {t("invest-popup.entry-fee")}
      <span>
        {`${info.entryFee}% (${convertEntryFeeToCurrency(
          values.amount,
          info.entryFee
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
      {t("invest-popup.confirm")}
    </GVButton>
    <div className="invest-popup__period-ends">
      {`${t("invest-popup.period")} ${moment(info.periodEnds).format(
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
    validationSchema: object().shape({
      amount: number()
        .typeError(i18n.t("invest-popup.amount-is-number-error")) //"Amount must be a number."
        .moreThan(0, "asd") //"Amount must be greater than zero"
        .required("asd") //"Amount is required."
    }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(InvestForm);
