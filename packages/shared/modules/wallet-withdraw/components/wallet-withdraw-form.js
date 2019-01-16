import "./wallet-withdraw-form.scss";

import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Select from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { formatValue, validateFraction } from "shared/utils/formatter";
import { ethWalletValidator } from "shared/utils/validators/validators";
import { number, object, string } from "yup";

import InputAmountField from "../../../components/input-amount-field/input-amount-field";
import { formatCurrencyValue } from "../../../utils/formatter";

const WalletWithdrawForm = ({
  t,
  twoFactorEnabled,
  handleSubmit,
  availableToWithdrawal,
  wallets,
  values,
  disabled,
  isValid,
  dirty,
  errorMessage,
  setFieldValue
}) => {
  const { currency, amount } = values;
  const currentWallet =
    wallets.find(wallet => wallet.currency === currency) || {};

  const { commission = null, rateToGvt = null } = currentWallet;

  const willGet = Math.max(
    convertFromCurrency(amount, rateToGvt) - commission,
    0
  );

  const isAllow = values => {
    const { floatValue, formattedValue, value } = values;
    return (
      formattedValue === "" ||
      (validateFraction(value, "GVT") &&
        floatValue <= parseFloat(availableToWithdrawal))
    );
  };

  const setMaxAmount = () => {
    setFieldValue("amount", formatCurrencyValue(availableToWithdrawal, "GVT"));
  };

  return (
    <form
      id="wallet-withdraw"
      className="wallet-withdraw-popup"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("wallet-withdraw.title")}</h2>
        </div>
        <div className="dialog-field">
          <div className="gv-text-field__wrapper">
            <StatisticItem label={t("wallet-withdraw.available")} big>
              {availableToWithdrawal} GVT
            </StatisticItem>
          </div>
        </div>
        <GVFormikField
          name="currency"
          component={GVTextField}
          label={t("wallet-withdraw.select-currency")}
          InputComponent={Select}
        >
          {wallets.map(wallet => {
            return (
              <option value={wallet.currency} key={wallet.currency}>{`${
                wallet.description
              } | ${wallet.currency}`}</option>
            );
          })}
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
        <InputAmountField
          name="amount"
          label={t("wallet-withdraw.amount")}
          currency="GVT"
          isAllow={isAllow}
          setMax={setMaxAmount}
        />
        <GVFormikField
          name="address"
          label={t("wallet-withdraw.address")}
          component={GVTextField}
          autoComplete="off"
        />
        {twoFactorEnabled && (
          <GVFormikField
            type="text"
            name="twoFactorCode"
            label={t("wallet-withdraw.two-factor-code-label")}
            autoComplete="off"
            component={GVTextField}
          />
        )}
        <ul className="dialog-list">
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.will-get")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(willGet)}
                suffix={` ${currency}`}
                displayType="text"
              />
            </span>
          </li>
          <li className="dialog-list__item">
            <span className="dialog-list__title">
              {t("wallet-withdraw.fee")}
            </span>
            <span className="dialog-list__value">
              <NumberFormat
                value={formatValue(commission)}
                suffix={` ${currency}`}
                displayType="text"
              />
            </span>
          </li>
        </ul>
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={disabled || !isValid || !dirty}
          >
            {t("buttons.confirm")}
          </GVButton>
        </div>
        {currency !== "GVT" && currency !== null && (
          <div className="dialog__info">{t("wallet-withdraw.info")}</div>
        )}
      </div>
    </form>
  );
};

WalletWithdrawForm.propTypes = {
  availableToWithdrawal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      commission: PropTypes.number,
      currency: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.string,
      rateToGvt: PropTypes.number
    })
  ),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func
};

const twoFactorvalidator = (t, twoFactorEnabled) => {
  return twoFactorEnabled
    ? string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"))
        .required(t("wallet-withdraw.validation.two-factor-required"))
    : string()
        .trim()
        .matches(/^\d{6}$/, t("wallet-withdraw.validation.two-factor-6digits"));
};

export default compose(
  translate(),
  withFormik({
    displayName: "wallet-withdraw",
    mapPropsToValues: props => {
      let currency = "GVT";
      if (!props.wallets.find(wallet => wallet.currency === currency)) {
        currency = props.wallets[0] ? props.wallets[0].currency : "";
      }
      return { currency, amount: "", address: "", twoFactorCode: "" };
    },
    validationSchema: ({ t, availableToWithdrawal, twoFactorEnabled }) =>
      object().shape({
        amount: number().max(
          availableToWithdrawal,
          t("wallet-withdraw.validation.amount-more-than-available")
        ),
        address: ethWalletValidator.required(
          t("wallet-withdraw.validation.address-is-required")
        ),
        twoFactorCode: twoFactorvalidator(t, twoFactorEnabled)
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(WalletWithdrawForm);
