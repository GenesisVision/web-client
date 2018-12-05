import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import FormError from "shared/components/form/form-error/form-error";
import {
  calculateValueOfEntryFee,
  convertFromCurrency
} from "shared/utils/currency-converter";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { number, object } from "yup";

const DepositForm = ({
  t,
  program,
  entryFee,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage
}) => {
  const fee = calculateValueOfEntryFee(values.amount, info.entryFee);
  const gvFee = calculateValueOfEntryFee(values.amount, info.gvCommission);
  const investAmount =
    parseFloat(values.amount || 0) -
    parseFloat(gvFee) -
    (entryFee ? parseFloat(fee) : 0);
  const isAllow = values => {
    const { floatValue, formattedValue } = values;
    const { availableInWallet } = info;
    const fee = calculateValueOfEntryFee(floatValue, info.entryFee);
    const gvFee = calculateValueOfEntryFee(floatValue, info.gvCommission);
    return (
      formattedValue === "" ||
      (validateFraction(formattedValue, "GVT") &&
        floatValue <=
          parseFloat(availableInWallet - gvFee - (entryFee ? fee : 0)))
    );
  };

  return (
    <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={program ? t("deposit-program.amount") : t("deposit-fund.amount")}
        component={GVTextField}
        adornment="GVT"
        autoComplete="off"
        InputComponent={NumberFormat}
        allowNegative={false}
        isAllowed={isAllow}
      />
      <div className="invest-popup__currency">
        <NumberFormat
          value={formatValue(convertFromCurrency(values.amount, info.rate))}
          prefix="= "
          suffix={` ${currency}`}
          displayType="text"
        />
      </div>
      <ul className="dialog-list">
        {entryFee && (
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {program
                ? t("deposit-program.entry-fee")
                : t("deposit-fund.entry-fee")}
            </span>
            <span className="dialog-list__value">
              {info.entryFee} %{" "}
              <NumberFormat
                value={formatValue(fee)}
                prefix=" ("
                suffix={" GVT)"}
                displayType="text"
              />
            </span>
          </li>
        )}
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {program
              ? t("deposit-program.gv-commission")
              : t("deposit-fund.gv-commission")}
          </span>
          <span className="dialog-list__value">
            {info.gvCommission} %
            <NumberFormat
              value={formatValue(gvFee)}
              prefix={" ("}
              suffix={" GVT)"}
              displayType="text"
            />
          </span>
        </li>
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {program
              ? t("deposit-program.investment-amount")
              : t("deposit-fund.investment-amount")}
          </span>
          <span className="dialog-list__value">
            <NumberFormat
              value={formatValue(investAmount)}
              suffix={" GVT"}
              displayType="text"
            />
          </span>
        </li>
      </ul>
      <div className="form-error">
        <FormError error={errorMessage} />
      </div>
      <div className="dialog__buttons">
        <GVButton
          type="submit"
          id="signUpFormSubmit"
          className="invest-form__submit-button"
          disabled={disabled}
        >
          {program ? t("deposit-program.confirm") : t("deposit-fund.confirm")}
        </GVButton>
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
          .max(
            info.availableInWallet,
            t("deposit-program.validation.amount-more-than-available")
          )
          .required(t("deposit-program.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(DepositForm);
