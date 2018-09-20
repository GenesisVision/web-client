import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object } from "yup";

const convertToCurrency = (value = 0, rate) => {
  return value / rate;
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
      name="amount"
      label={t("deposit-program.amount")}
      component={GVTextField}
      adornment="GVT"
      autoComplete="off"
      InputComponent={NumberFormat}
      allowNegative={false}
    />
    <div className="invest-popup__currency">
      <NumberFormat
        value={convertToCurrency(values.amount, info.rate)}
        prefix="= "
        suffix={` ${currency}`}
        decimalScale={8}
        displayType="text"
      />
    </div>
    <div className="invest-popup__entry">
      {t("deposit-program.entry-fee")}
      <span>
        {info.entryFee} %{" "}
        <NumberFormat
          value={convertToCurrency(
            calculateValueOfEntryFee(values.amount, info.entryFee),
            info.rate
          )}
          prefix="("
          suffix={` ${currency})`}
          decimalScale={8}
          displayType="text"
        />
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
    validationSchema: ({ t, info }) =>
      object().shape({
        amount: number()
          .lessThan(
            info.availableInWallet,
            t("deposit-program.validation.amount-more-than-available")
          )
          .required(t("deposit-program.validation.amount-is-required-error"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(ProgramDepositForm);
