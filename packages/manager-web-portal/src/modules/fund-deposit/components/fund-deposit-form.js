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
} from "utils/currency-converter";
import { formatValue } from "utils/formatter";
import { number, object } from "yup";

const FundDepositForm = ({
  t,
  values,
  info,
  currency,
  disabled,
  handleSubmit,
  errorMessage
}) => {
  const gvFee = calculateValueOfEntryFee(values.amount, info.gvCommission);
  const investAmount = parseFloat(values.amount || 0) - parseFloat(gvFee);
  const isAllow = values => {
    const { floatValue, formattedValue } = values;
    const { availableInWallet } = info;
    const fee = calculateValueOfEntryFee(floatValue, info.entryFee);
    return (
      formattedValue === "" || floatValue <= parseFloat(availableInWallet - fee)
    );
  };

  return (
    <form className="dialog__bottom" id="invest-form" onSubmit={handleSubmit}>
      <GVFormikField
        className="invest-field"
        name="amount"
        label={t("deposit-fund.amount")}
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
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-fund.gv-commission")}
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
            {t("deposit-fund.investment-amount")}
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
          {t("deposit-fund.confirm")}
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
            t("deposit-fund.validation.amount-min-value", {
              min: info.minInvestmentAmount
            })
          )
          .max(
            info.availableInWallet,
            t("deposit-fund.validation.amount-more-than-available")
          )
          .required(t("deposit-fund.validation.amount-is-required"))
      }),
    handleSubmit: (values, { props }) => {
      props.onSubmit(values.amount);
    }
  })
)(FundDepositForm);
