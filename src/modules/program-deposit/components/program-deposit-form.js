import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import moment from "moment";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import {
  calculateValueOfEntryFee,
  convertToCurrency
} from "utils/currency-converter";
import { formatValue } from "utils/formatter";
import { number, object } from "yup";

const ProgramDepositForm = ({
  t,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage,
  type
}) => {
  const fee = calculateValueOfEntryFee(values.amount, info.entryFee);
  const due = parseFloat(values.amount || 0) + parseFloat(fee);

  const isAllow = values => {
    const { floatValue, formattedValue } = values;
    const { availableInWallet, availableToInvest } = info;
    const fee = calculateValueOfEntryFee(floatValue, info.entryFee);
    const validateAvailableToInvest = () =>
      type === "program" ? floatValue <= availableToInvest : true;
    return (
      formattedValue === "" ||
      (floatValue <= parseFloat(availableInWallet - fee) &&
        validateAvailableToInvest())
    );
  };

  return (
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
        isAllowed={isAllow}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatValue(convertToCurrency(values.amount, info.rate))}
          prefix="= "
          suffix={` ${currency}`}
          decimalScale={8}
          displayType="text"
        />
      </div>
      <ul className="dialog-list">
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-program.entry-fee")}
          </span>
          <span className="dialog-list__value">
            {info.entryFee} %{" "}
            <NumberFormat
              value={formatValue(fee)}
              prefix="("
              suffix={` GVT)`}
              decimalScale={8}
              displayType="text"
            />
          </span>
        </li>
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-program.amount-due")}
          </span>
          <span className="dialog-list__value">
            <NumberFormat
              value={formatValue(due)}
              suffix={` GVT`}
              decimalScale={8}
              displayType="text"
            />
          </span>
        </li>
      </ul>
      <div className="form-error">{errorMessage}</div>
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {t("deposit-program.confirm")}
        </GVButton>
      </div>
      <div className="dialog__info">
        {`${t("deposit-program.period")} ${moment(info.periodEnds).format(
          "DD.MM.YYYY, HH:mm"
        )}`}
      </div>
    </form>
  );
};

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
          .min(
            info.minInvestmentAmount,
            t("deposit-program.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .lessThan(
            info.availableInWallet,
            t("deposit-program.validation.amount-more-than-available")
          )
          .required(t("deposit-program.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(ProgramDepositForm);
